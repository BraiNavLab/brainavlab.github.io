#!/usr/bin/env python3
"""Prepares the land and the borders of the globe of the home page and writes them into js/globe.js
(GLOBE_LAND and GLOBE_BORDERS).

Usage: build_globe_data.py ne_110m_land.geojson ne_110m_admin_0_boundary_lines_land.geojson

Source: Natural Earth 1:110m (public domain), https://github.com/nvkelso/natural-earth-vector/tree/master/geojson

The land keeps every point of Natural Earth, with the outlines clockwise and the holes anticlockwise, as d3-geo
expects. The pieces that Natural Earth cuts along the 180th meridian (the tip of Siberia, Wrangel Island, Vanua Levu)
are joined again, so that the cut is not drawn as a coast. Antarctica, hidden by the tilt of the globe, and islets too
small to see are left out. The borders are simplified a little.

Format: base64 of int16: for each line its number of points (negative for a hole of the land just before it, such as
a lake), then longitude and latitude of each point in hundredths of a degree.
"""
import base64, json, re, sys
from pathlib import Path
import numpy as np

GLOBE_JS = Path(__file__).resolve().parents[3] / 'js' / 'globe.js'


def parts(geometry):
    """The lines or the polygons of a geometry, single or multiple."""
    return geometry['coordinates'] if geometry['type'].startswith('Multi') else [geometry['coordinates']]


def rdp(points, eps):
    """Ramer-Douglas-Peucker: the fewest points that keep the line within eps degrees."""
    if len(points) < 3:
        return points
    a, b = points[0], points[-1]
    d = b - a
    n = np.hypot(*d) or 1e-9
    dist = np.abs(d[1] * (points[:, 0] - a[0]) - d[0] * (points[:, 1] - a[1])) / n
    i = int(np.argmax(dist))
    if dist[i] > eps:
        return np.vstack([rdp(points[:i + 1], eps)[:-1], rdp(points[i:], eps)])
    return np.vstack([a, b])


def clockwise(ring):
    """Whether a closed ring turns clockwise on a map with the north up."""
    return np.sum(ring[:-1, 0] * ring[1:, 1] - ring[1:, 0] * ring[:-1, 1]) < 0


def cut(ring, side):
    """Index of the segment of a ring that runs along the meridian at longitude side (180 or -180), or None."""
    on = ring[:, 0] == side
    found = np.flatnonzero(on[:-1] & on[1:])
    return found[0] if len(found) else None


def stitch(polygons):
    """Joins each piece that Natural Earth cuts off at -180 to its other half at +180: the piece moves east by 360
    degrees (d3-geo takes longitudes past 180) and replaces the segment of the cut in the outline of the other half."""
    kept = []
    for polygon in polygons:
        j = cut(polygon[0], -180)
        if j is None:
            kept.append(polygon)
            continue
        piece = np.roll(polygon[0][:-1] + [360, 0], -(j + 1), axis=0)     # open, from one end of the cut to the other
        for other in polygons:
            i = cut(other[0], 180)
            if i is not None and np.allclose(other[0][[i, i + 1], 1], piece[[0, -1], 1], atol=1e-3):
                other[0] = np.vstack([other[0][:i + 1], piece[1:-1], other[0][i + 1:]])
                break
        else:
            raise ValueError(f'no other half at +180 for the piece cut at -180 near latitude {piece[0, 1]:.1f}')
    return kept


def encode(lines):
    """The format above, from (points, is a hole) pairs."""
    numbers = []
    for points, hole in lines:
        scaled = np.round(np.asarray(points) * 100)
        assert np.abs(scaled).max() < 2 ** 15
        numbers += [np.array([-len(scaled) if hole else len(scaled)]), scaled.ravel()]
    return base64.b64encode(np.concatenate(numbers).astype('<i2').tobytes()).decode()


land_file, borders_file = sys.argv[1:]

polygons = [[np.asarray(ring, float) for ring in polygon]
            for feature in json.load(open(land_file))['features'] for polygon in parts(feature['geometry'])]
polygons = stitch([p for p in polygons if p[0][:, 1].max() > -60])
polygons = [p for p in polygons if np.ptp(p[0][:, 0]) + np.ptp(p[0][:, 1]) >= 2.5]
land = [(ring if clockwise(ring) == (k == 0) else ring[::-1], k > 0) for p in polygons for k, ring in enumerate(p)]

borders = [(rdp(np.asarray(line, float), 0.25), False)
           for feature in json.load(open(borders_file))['features'] for line in parts(feature['geometry'])]

source = GLOBE_JS.read_text()
for name, lines in (('GLOBE_LAND', land), ('GLOBE_BORDERS', borders)):
    constant = f"const {name} = '{encode(lines)}';"
    source, found = re.subn(f"^const {name} = '[^']*';$", lambda _: constant, source, flags=re.M)
    assert found == 1, f'{name} not found in {GLOBE_JS}'
GLOBE_JS.write_text(source)
print(f'{len(land)} lines of land and {len(borders)} borders written into {GLOBE_JS}', file=sys.stderr)
