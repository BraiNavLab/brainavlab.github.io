// Trial: 3D cerebral cortex under the Mission title of the home page, turning with the scroll of the page.
// To remove it: "brain_mesh: false" in _config.yml, see there. Plain WebGL, no libraries.
// Surface: ICBM152 template of BrainNet Viewer, provided by Prof. Alan C. Evans (MNI), reduced with
// img/_sources/brain/build_brain_mesh.py. The colours are those of the BraiNavLab logo.

const brainCanvas = document.querySelector('.brain-mesh');
const brainGl = brainCanvas && brainCanvas.getContext('webgl', { antialias: true });
if (brainCanvas && !brainGl) brainCanvas.hidden = true;     // without WebGL there is simply no brain

if (brainGl) {
    const gl = brainGl;
    const LEFT_SIDE_VIEW = Math.PI / 2;     // the left hemisphere faces the visitor when the brain is mid-screen
    const TILT = 0.2;                       // seen slightly from above
    const TURN_PER_SCREEN = 2.4;            // radians for a scroll of one screen height
    const REACH = [1.04, 0.9];              // largest half-size of the brain on screen over all angles, in model units

    const vertexShader = `
        attribute vec3 position;
        attribute vec4 normalAndDepth;
        uniform mat3 rotation;
        uniform vec2 fit;
        varying vec3 normal;
        varying float depth;
        varying float along;
        void main() {
            vec3 p = rotation * position;
            normal = rotation * normalAndDepth.xyz;
            depth = normalAndDepth.w;
            along = position.y * 0.5 + 0.5;
            float w = 4.0 - p.z;            // perspective: the camera is 4 units from the centre
            gl_Position = vec4(p.xy * fit * 4.0, -p.z * 0.4 * w, w);
        }`;

    // Light as on real tissue: dark deep in the sulci, a soft wet shine on the crowns of the gyri.
    // The colour runs from front to back along the colours of the logo.
    const fragmentShader = `
        precision mediump float;
        varying vec3 normal;
        varying float depth;
        varying float along;
        void main() {
            vec3 n = normalize(normal);
            vec3 lightDirection = normalize(vec3(-0.45, 0.6, 0.66));
            float light = max(dot(n, lightDirection), 0.0);
            float fill = max(dot(n, normalize(vec3(0.7, -0.2, 0.5))), 0.0);
            float open = smoothstep(-0.95, 0.35, depth);
            vec3 hue = along < 0.5 ? mix(vec3(0.69, 0.16, 0.78), vec3(0.35, 0.35, 0.88), along * 2.0)
                                   : mix(vec3(0.35, 0.35, 0.88), vec3(0.03, 0.53, 0.97), along * 2.0 - 1.0);
            vec3 tissue = mix(hue, vec3(0.92), 0.36);
            vec3 color = tissue * (0.12 + 0.42 * open + 0.56 * light * (0.35 + 0.65 * open) + 0.12 * fill);
            color = mix(vec3(0.05, 0.08, 0.2), color, 0.25 + 0.75 * open);
            float shine = pow(max(dot(n, normalize(lightDirection + vec3(0.0, 0.0, 1.0))), 0.0), 28.0);
            color += shine * open * 0.16;
            gl_FragColor = vec4(min(color, vec3(1.0)), 1.0);
        }`;

    const program = gl.createProgram();
    [[gl.VERTEX_SHADER, vertexShader], [gl.FRAGMENT_SHADER, fragmentShader]].forEach(([type, source]) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let faceCount = 0;
    let angle = null;
    let frame = 0;
    let onScreen = false;

    // Rotation about the vertical axis of the brain, then the tilt of the camera (columns of a 3 x 3 matrix).
    const draw = () => {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const cp = Math.cos(TILT);
        const sp = Math.sin(TILT);
        gl.uniformMatrix3fv(gl.getUniformLocation(program, 'rotation'), false, [c, sp * s, -cp * s, -s, sp * c, -cp * c, 0, cp, sp]);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, faceCount * 3, gl.UNSIGNED_SHORT, 0);
    };

    // The angle follows the position of the brain on the screen, with a little inertia.
    const targetAngle = () => {
        if (reducedMotion) return LEFT_SIDE_VIEW;
        const box = brainCanvas.getBoundingClientRect();
        return LEFT_SIDE_VIEW + TURN_PER_SCREEN * (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
    };
    const animate = () => {
        frame = 0;
        if (!faceCount) return;
        const target = targetAngle();
        angle = angle === null ? target : angle + (target - angle) * 0.14;
        if (Math.abs(target - angle) < 0.001) angle = target;
        draw();
        if (angle !== target) frame = requestAnimationFrame(animate);
    };
    const requestDraw = () => {
        if (onScreen && !frame) frame = requestAnimationFrame(animate);
    };

    const resize = () => {
        const box = brainCanvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        brainCanvas.width = Math.round(box.width * ratio);
        brainCanvas.height = Math.round(box.height * ratio);
        gl.viewport(0, 0, brainCanvas.width, brainCanvas.height);
        // The brain keeps its proportions and stays inside the canvas at every angle: REACH is its largest extent on screen
        const unit = Math.min(box.width / REACH[0], box.height / REACH[1]);
        gl.uniform2f(gl.getUniformLocation(program, 'fit'), unit / box.width, unit / box.height);
        if (faceCount) draw();
    };

    const load = () => fetch(brainCanvas.dataset.mesh)
        .then((response) => response.arrayBuffer())
        .then((file) => {
            const [vertexCount, faces] = new Uint32Array(file, 0, 2);
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(file, 8, vertexCount * 10), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(file, 8 + vertexCount * 10, faces * 3), gl.STATIC_DRAW);
            const position = gl.getAttribLocation(program, 'position');
            const normal = gl.getAttribLocation(program, 'normalAndDepth');
            gl.enableVertexAttribArray(position);
            gl.enableVertexAttribArray(normal);
            gl.vertexAttribPointer(position, 3, gl.SHORT, true, 10, 0);
            gl.vertexAttribPointer(normal, 4, gl.BYTE, true, 10, 6);
            faceCount = faces;
            angle = targetAngle();
            resize();
            brainCanvas.classList.add('is-ready');
        })
        .catch(() => { brainCanvas.hidden = true; });

    new ResizeObserver(resize).observe(brainCanvas);

    // Loaded when it is about to enter the screen, and drawn only while it is there.
    let loading = false;
    new IntersectionObserver((entries) => {
        onScreen = entries[0].isIntersecting;
        if (!onScreen) return;
        if (!loading) {
            loading = true;
            load();
        }
        requestDraw();
    }, { rootMargin: '400px 0px' }).observe(brainCanvas);
    if (!reducedMotion) window.addEventListener('scroll', requestDraw, { passive: true });
}
