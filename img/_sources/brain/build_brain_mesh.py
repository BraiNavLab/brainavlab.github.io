#!/usr/bin/env python3
"""Prepares the cortical surface of the home page (img/home_img/brain_mesh.bin).

Usage: build_brain_mesh.py BrainMesh_ICBM152.nv OUTPUT.bin [LEVEL]

Source: BrainMesh_ICBM152 of BrainNet Viewer, the ICBM152 surface provided by Prof. Alan C. Evans (MNI). It is two
hemispheres, each an icosphere subdivided six times with the subdivision nested in the vertex order, so undoing it
keeps exact points of the surface and leaves no holes: LEVEL 5 has 10242 vertices per hemisphere, LEVEL 4 has 2562.

The positions are not smoothed. Normals and sulcal depth come from the full surface.
Sulcal depth is how far a point lies under the surface with its folds smoothed away: positive on the crowns of the
gyri, negative deep in the sulci, the same idea as the "sulc" map of cortical reconstructions.

File: uint32 vertex count, uint32 face count; then per vertex 3 int16 (position, -1..1) and 4 int8 (normal, sulcal
depth), 10 bytes in all; then the faces as 3 uint16.
"""
import sys
import numpy as np


def load_nv(path):
    with open(path) as f:
        lines = [l for l in f.read().split('\n') if l and not l.startswith('#')]
    nv = int(lines[0])
    V = np.loadtxt(lines[1:nv + 1])
    nf = int(lines[nv + 1])
    F = np.loadtxt(lines[nv + 2:nv + 2 + nf], dtype=np.int64) - 1
    return V, F


def coarsen(F, n_coarse):
    """Undo one 1-to-4 subdivision: the first n_coarse vertices are the coarse ones."""
    corners = F[(F < n_coarse).sum(1) == 1]
    central = F[(F < n_coarse).sum(1) == 0]
    ends = {}
    for tri in corners:
        c = tri[tri < n_coarse][0]
        for m in tri[tri >= n_coarse]:
            ends.setdefault(int(m), set()).add(int(c))
    out = []
    for m1, m2, m3 in central.tolist():
        a = (ends[m3] & ends[m1]).pop()
        b = (ends[m1] & ends[m2]).pop()
        c = (ends[m2] & ends[m3]).pop()
        out.append((a, b, c))
    return np.array(out, dtype=np.int64)


def vertex_normals(V, F):
    n = np.cross(V[F[:, 1]] - V[F[:, 0]], V[F[:, 2]] - V[F[:, 0]])
    N = np.zeros_like(V)
    for k in range(3):
        np.add.at(N, F[:, k], n)
    return N / (np.linalg.norm(N, axis=1, keepdims=True) + 1e-12)


def edges(F):
    e = np.vstack([F[:, [0, 1]], F[:, [1, 2]], F[:, [2, 0]]])
    return np.unique(np.vstack([e, e[:, ::-1]]), axis=0)


def smooth(field, E, n, passes):
    """Each value moves halfway towards the mean of its neighbours."""
    degree = np.bincount(E[:, 0], minlength=n).astype(float)
    shape = (n,) + (1,) * (field.ndim - 1)
    for _ in range(passes):
        total = np.zeros_like(field)
        np.add.at(total, E[:, 0], field[E[:, 1]])
        field = 0.5 * (field + total / degree.reshape(shape))
    return field


def main():
    src, dst = sys.argv[1], sys.argv[2]
    level = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    V, F = load_nv(src)
    half_v, half_f = len(V) // 2, len(F) // 2
    centre = (V.min(0) + V.max(0)) / 2
    scale = np.abs(V - centre).max()

    verts, faces, offset = [], [], 0
    for Vh, Fh in ((V[:half_v], F[:half_f]), (V[half_v:], F[half_f:] - half_v)):
        # Outward winding: one hemisphere is the mirror of the other
        if np.sum(np.cross(Vh[Fh[:, 1]] - Vh[Fh[:, 0]], Vh[Fh[:, 2]] - Vh[Fh[:, 0]]) * (Vh[Fh[:, 0]] - Vh.mean(0))) < 0:
            Fh = Fh[:, ::-1]
        E = edges(Fh)
        N = vertex_normals(Vh, Fh)
        # Sulcal depth, against the surface with the folds smoothed away
        envelope = smooth(Vh, E, len(Vh), 160)
        depth = np.sum((Vh - envelope) * vertex_normals(envelope, Fh), axis=1)
        # One light pass only, or the finest folds would flicker when sampled on the coarser mesh
        N = smooth(N, E, len(Vh), {6: 0, 5: 1, 4: 4}[level])
        N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-12
        Fc = Fh
        for lv in range(6, level, -1):
            Fc = coarsen(Fc, 10 * 4 ** (lv - 1) + 2)
        n = 10 * 4 ** level + 2
        verts.append(np.column_stack([(Vh[:n] - centre) / scale, N[:n], depth[:n]]))
        faces.append(Fc + offset)
        offset += n

    data = np.vstack(verts)
    faces = np.vstack(faces)
    c = data[:, 6]
    low, high = np.percentile(c, 1), np.percentile(c, 99)
    data[:, 6] = np.clip(2 * (c - low) / (high - low) - 1, -1, 1)

    with open(dst, 'wb') as f:
        np.array([len(data), len(faces)], dtype='<u4').tofile(f)
        record = np.zeros(len(data), dtype=[('p', '<i2', 3), ('n', 'i1', 4)])
        record['p'] = np.round(data[:, :3] * 32767)
        record['n'] = np.round(data[:, 3:7] * 127)
        record.tofile(f)
        faces.astype('<u2').tofile(f)
    print(f'{dst}: {len(data)} vertices, {len(faces)} faces, {8 + len(data) * 10 + len(faces) * 6} bytes, depth range {low:.1f}..{high:.1f} mm')


if __name__ == '__main__':
    main()
