// Restyling, Network section of the home page: a dotted globe that turns eastwards, like the Earth,
// with arcs from Verona to the cities of the partners.
// Land: Natural Earth 1:110m (public domain), as a mask of 1-degree cells, 360 x 180 bits, from north-west by rows.
const GLOBE_LAND = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf//8AAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////D//////n/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gf/x////////wAAAAAbgAAB4AAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAf//8A///////+AAAAB/ngAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAcH3Hv/5////////8AAAAA/gAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAcIAAQP/AH///////+AAAAAPCAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAADwDAc+f+AP///////4AAAAAAAAAAAAAB4AAAAB/8AAAAAAAAAAAAAAAAAAAAAH9wc374AAAf/////8AAAAAAAAAAAAH4AAAA////AAAB/gAAAAAAAAAAAAAAAAwAAA/QAAAH/////8AAAAAAAAAAAAOAAAAP///wAAAAAAAAAAAAAAAAAAAAP8AYe+c3AAAD/////4AAAAAAAAAAAA4AAAH////++HgAOAAAAAAAAAAAAAAAfv+4+w/4gAAB/////wAAAAAAAAAAADwAHgH///////4AfgAAAAAgAAAAAAAAPf/4O4//9AAB/////wAAAAAAAAAAADwAPb////////4m//gAAAAAAAf+AAAAAA/+A8f//4AB////8gAAAAAAA/gAAAAAfv/////////////8AAAAAB///+H//H/+PeDwf+AA3////AAAAAAA//4AAAA8fv///////////////P8gAf////////A4CPz4H8AAP///wAAAAAAD///wADH/n3/////////////////8AD////////////34Z/wA///4AAAAAAAP///+M////n/////////////////+4E/////////////gD/8Af//gAAAAAAAf//5+P////f/////////////////fw/////////////6AD8YAf/wAAf8AAAA/8f+D///////////////////////AgEf///////////zw7/AAP/gAAP4AAAB/4/+f//////////////////////8AMAf//////////+DIA/gAH/gAAAAAAAH/z/////////////////////////+AAH///////////8AwgOAAD+AAAAAAAA//H/////////////////////////6AAP///////////wAA/AAAB+AAAAAAAB/+H//////////////////////nP+AAAH//z////////wAA/wAAAOAAAAAAAB//D/////////////////////+A/4AAAA/zAD///////gAA/4wAAAAAAAAAAB//Ab///////////////////+eDgAAAAABwAA///////4AA/94AAAAAAAAAYA5+A///////////////////4AAHAAAAAADcAAD//////4AAf/8AAAAAAAAA8AC+C///////////////////wAAfgAAAAAMAAAA///////wAf/8AAAAAAAAA4AO8H///////////////////AAA/gAAAABgAAAA///////8A///AAAAAAAAA8ANwH//////////////////8AAB/AAAAAEAAAAAf///////z///4AAAAAAAHOAEDv//////////////////+AAA+AAAAAAAAAABH///////x///8AAAAAAAHHAf/////////////////////6AA8AAAAAAAAAAAD///////x///8AAAAAAAGPz//////////////////////6AAwAAAAAAAAAAAD///////9///6AAAAAAAAPj//////////////////////6AAQAAAAAAAAAAAC///////////MAAAAAAAAYf//////////////////////7AAAAAAAAAAAAAABv////////+MNAAAAAAAAD///////////////////////zAAAAAAAAAAAAAAAH////////7gfgAAAAAAAf///////////////////////yAAAAAAAAAAAAAAAL/////////gCgAAAAAAAH///////////////////////iAAAAAAAAAAAAAAAP/////////pAAAAAAAAAD/////uP/x//////////////DAAAAAAAAAAAAAAAP/////////+AAAAAAAAAB//v//Gf/B/////////////+AAAAAAAAAAAAAAAAP////////8wAAAAAAAAAB//H/+AP+P/////////////8CAAAAAAAAAAAAAAAP////////wAAAAAAAAADj/jz/8AD/H/////////////4HgAAAAAAAAAAAAAAP////////gAAAAAAAAAH/4Bw/8AA/B////////////+APAAAAAAAAAAAAAAAP////////gAAAAAAAAAH/wA8f8Ph/g////////////8AAAAAAAAAAAAAAAAAP///////8AAAAAAAAAAH/gMHfJ///x///////////v4AMAAAAAAAAAAAAAAAP///////8AAAAAAAAAAH/AMCOP///h//////////+JwAMAAAAAAAAAAAAAAAH///////4AAAAAAAAAAH/AAAHH///g//////////8BwAIAAAAAAAAAAAAAAAH///////wAAAAAAAAAAH+AAYGH///w//////////+w4A4AAAAAAAAAAAAAAAD///////wAAAAAAAAAAAgf+ACBs//////////////g4D4AAAAAAAAAAAAAAAB///////wAAAAAAAAAAAj/+AAAA//////////////AYf4AAAAAAAAAAAAAAAA///////gAAAAAAAAAAB//8AAAA//////////////Ah2AAAAAAAAAAAAAAAAAP/////+AAAAAAAAAAAD//+AAAB//////////////gDwAAAAAAAAAAAAAAAAAH/////8AAAAAAAAAAAH///4GAB//////////////gDAAAAAAAAAAAAAAAAAAG/////4AAAAAAAAAAAP///8P4h//////////////wCAAAAAAAAAAAAAAAAAACf////4AAAAAAAAAAAP////v////////////////gAAAAAAAAAAAAAAAAAAABP//hgYAAAAAAAAAAAP//////3//P///////////wAAAAAAAAAAAAAAAAAAAAv//AAYAAAAAAAAAAAf//////9//H///////////wAAAAAAAAAAAAAAAAAAAB3/+AAcAAAAAAAAAAB///////4//h///////////gAAAAAAAAAAAAAAAAAAAAR/+AANAAAAAAAAAAD///////8//wH//////////AAAAAAAAAAAAAAAAAAAAAJ/+AAEAAAAAAAAAAH///////+f/0B/////////+AAAAAAAAAAAAAAAAAAAAAI/8AAAAAAAAAAAAAH///////+f/44Af///////+QAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAP////////H//+AP///////4gAAAAAAAAAAAAAAAAAAAAAP8AAuAAAAAAAAAAP////////H///AD///v///ggAAAAAAAAAAAAAAAAAAAAAH+AABgAAAAAAAAAf////////n//+AD//4P//YAAAAAAAAAAAAAAAAAAAAAAAP+A4AYAAAAAAAAAP////////j//+AAf/4H/+AAAAAAAAAAAAAAAAgAAAAAAAH/B4ABwAAAAAAAAP////////h//8AAf/gD/8YAAAAAAAAAAAAAAAAAAAAAAAD/nwAD9AAAAAAAAP////////x//4AAf/AD/8QAAAAAAAAAAAAAAAAAAAAAAAAf/wAAAAAAAAAAAP////////4//gAAf+AD/+AAwAAAAAAAAAAAAAAAAAAAAAAH/wAAAAAAAAAAAf////////4f+AAAf8AD//AAwAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAf////////8f8AAAPwAAP/gAwAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAf////////+fgAAAPwAAP/gAwAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAf/////////eAAAAHwAAP/gAMAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAf/////////gAAAAHwAAM/gACAAAAAAAAAAAAAAAAAAAAAAAADABAAAAAAAAAP/////////gYAAADwAAEfgAJAAAAAAAAAAAAAAAAAAAAAAAADgPfKAAAAAAAH/////////34AAADwAAIOABAAAAAAAAAAAAAAAAAAAAAAAAAAyPf+AAAAAAAD//////////4AAADoAAIEACBAAAAAAAAAAAAAAAAAAAAAAAAA8///AAAAAAAB//////////wAAABIAAMAAAFAAAAAAAAAAAAAAAAAAAAAAAAAE///gAAAAAAB//////////wAAAAMAAEAAALgAAAAAAAAAAAAAAAAAAAAAAAAAf//wAAAAAAAf/////////gAAAAMAADAAMCAAAAAAAAAAAAAAAAAAAAAAAAAA////gAAAAAAP/B///////gAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAf///wAAAAAACAA///////AAAAAAAAxgA+AAAAAAAAAAAAAAAAAAAAAAAAAAAf///4AAAAAAAAAD/////+AAAAAAAAZgB4AAAAAAAAAAAAAAAAAAAAAAAAAAB////4AAAAAAAAAD/////8AAAAAAAAMwH8AAAAAAAAAAAAAAAAAAAAAAAAAAB////8AAAAAAAAAH/////4AAAAAAAAHQf8AIAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAH/////gAAAAAAAAHgf88IAAAAAAAAAAAAAAAAAAAAAAAAD////+AAAAAAAAAH/////AAAAAAAAADwf8AAgAAAAAAAAAAAAAAAAAAAAAAAH/////4AAAAAAAAH/////AAAAAAAAABwP5wBwAAAAAAAAAAAAAAAAAAAAAAAH/////6AAAAAAAAD////+AAAAAAAAAB8P5wATwAAAAAAAAAAAAAAAAAAAAAAD//////4AAAAAAAB////8AAAAAAAAAA8AxQif+AAAAAAAAAAAAAAAAAAAAAAH//////8AAAAAAAB////4AAAAAAAAAAcAAIAD/gAAAAAAAAAAAAAAAAAAAAAH///////gAAAAAAA////4AAAAAAAAAAMAAIAI/ywAAAAAAAAAAAAAAAAAAAAH///////gAAAAAAA////4AAAAAAAAAADgAAAI/8BAAAAAAAAAAAAAAAAAAAAD///////gAAAAAAAf///4AAAAAAAAAAB+AAAA/4AIAAAAAAAAAAAAAAAAAAAB///////gAAAAAAAf///4AAAAAAAAAAAAmogAOMAAAAAAAAAAAAAAAAAAAAAB///////AAAAAAAAf///8AAAAAAAAAAAABCAAAGADAAAAAAAAAAAAAAAAAAAA///////AAAAAAAAf///8AAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAf/////+AAAAAAAAP///8AAAAAAAAAAAAAAAgCAAAAAAAAAAAAAAAAAAAAAAAf/////8AAAAAAAAf///+AQAAAAAAAAAAAAB+CAAAAAAAAAAAAAAAAAAAAAAAP/////4AAAAAAAAf///+AQAAAAAAAAAAAAD8DAAAAAAAAAAAAAAAAAAAAAAAP/////4AAAAAAAA////+AwAAAAAAAAAAAA38DgAAAAAAAAAAAAAAAAAAAAAAH/////4AAAAAAAA////8BwAAAAAAAAAAAD/8DgAAAAAAAAAAAAAAAAAAAAAAB/////4AAAAAAAA////8PwAAAAAAAAAAAD//HwAABABAAAAAAAAAAAAAAAAAAf////4AAAAAAAA////wPgAAAAAAAAAAAP//3wAAAACAAAAAAAAAAAAAAAAAAP////wAAAAAAAA////APgAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAP////wAAAAAAAAf//+APgAAAAAAAAAAAf///4AAAAAAAAAAAAAAAAAAAAAAAP////wAAAAAAAAf//+APgAAAAAAAAAAD////+AAIAAAAAAAAAAAAAAAAAAAAP////gAAAAAAAAP//+AfAAAAAAAAAAAf////+AAEAAAAAAAAAAAAAAAAAAAAP////AAAAAAAAAP///AfAAAAAAAAAAA//////AAAAAAAAAAAAAAAAAAAAAAAP///4AAAAAAAAAP//+APAAAAAAAAAAA//////gAAAAAAAAAAAAAAAAAAAAAAf///gAAAAAAAAAH//+AOAAAAAAAAAAB//////wAAAAAAAAAAAAAAAAAAAAAAf///AAAAAAAAAAH//4AEAAAAAAAAAAA//////4AAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAH//4AAAAAAAAAAAAB//////4AAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAH//4AAAAAAAAAAAAA//////4AAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAD//wAAAAAAAAAAAAAf/////8AAAAAAAAAAAAAAAAAAAAAAf//8AAAAAAAAAAB//gAAAAAAAAAAAAAf/////4AAAAAAAAAAAAAAAAAAAAAA///8AAAAAAAAAAB//gAAAAAAAAAAAAAf/////4AAAAAAAAAAAAAAAAAAAAAA///4AAAAAAAAAAA//AAAAAAAAAAAAAAP/////4AAAAAAAAAAAAAAAAAAAAAAf//wAAAAAAAAAAA/+AAAAAAAAAAAAAAP/AP//wAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAA/4AAAAAAAAAAAAAAf8AG//gAAAAAAAAAAAAAAAAAAAAAA//3AAAAAAAAAAAAYAAAAAAAAAAAAAAAOAAF//gAAAAAAAAAAAAAAAAAAAAAB//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAABAAAAAAAAAAAAAAAAAAB//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAgAAAAAAAAAAAAAAAAAD//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAQAAAAAAAAAAAAAAAAAB//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAAcAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAADQAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAHAAAAAAAAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAOAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAH4AAAAAAB4HgAD8AAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAA//AAAD//////////wAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAf///4Af///////////AAAAAAAAAAAAAAAAAAAAAAAz4AAAAAAAAAAAAAAAPz////8B/////////////wAAAAAAAAAAAAAAAAAAAAA78AAAAAAAAAAA8/8///////wf/////////////+AAAAAAAAAAAAAAAAAAAAH9+AAAAAAAAZ////////////w////////////////4AAAAAAAAAAAAAAAAAAAB+AAAAAAAB//////////////////////////////4AAAAAAAAABmAAB8f+HB/+AAAAAAAP//////////////////////////////gAAAAAAAAP/c/oAf/////4AAAAAAAP/////////////////////////////8AAAAAAAD/////////////gAAAAAAB//////////////////////////////wAAAAAAAD////////////wAAAAAAP///////////////////////////////wAAAAAD/////////////4AAAAAAD////////////////////////////////wAAAADh/////////////AAAAB8A/////////////////////////////////+AAAAA4Af///////////gAAAH+AA///////////////////////////////+AAAAAAAAH///////////+A/A/wAA///////////////////////////////8AAAAAAAf//////////////gAAAf////////////////////////////////+AAAAAAAH///////////////h////////////////////////////////////wAAAAAAP/////////////////////////////////////////////////////gA+/gAAH/////////////////////////////////////////////////////8/////v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////';

// Verona and the cities of the partners, as [latitude, longitude]
const GLOBE_HUB = [45.44, 10.99];
const GLOBE_PLACES = [
    [45.07, 7.69],      // Turin: CENTAI Institute, University of Turin
    [45.46, 9.19],      // Milan: University of Milan
    [45.41, 11.88],     // Padua: University of Padua
    [45.65, 13.78],     // Trieste: University of Trieste
    [42.34, -71.11],    // Boston: Boston Children's Hospital, FNNDSC, Harvard Medical School
    [33.75, -84.39],    // Atlanta: TReNDS Center
    [43.62, 7.05],      // Sophia Antipolis: Inria
    [44.84, -0.58],     // Bordeaux: University of Bordeaux
    [46.58, 0.34],      // Poitiers: University of Poitiers
    [48.52, 9.06],      // Tübingen: University of Tübingen
    [41.39, 2.17],      // Barcelona: Universitat de Barcelona
    [46.52, 6.57],      // Lausanne: EPFL
    [51.52, -0.13],     // London: University College London
    [51.75, -1.26],     // Oxford: University of Oxford
];

const globeCanvas = document.querySelector('.network-globe');
const ctx = globeCanvas && globeCanvas.getContext('2d');
if (ctx) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DEGREES_PER_SECOND = 5;           // one turn in 72 seconds
    const TILT = 0.38;                      // the north leans towards the visitor, where most partners are
    const START = -25;                      // longitude in the middle at first: the Atlantic, with America and Europe
    const NAVY = '#0f2b6b';
    const rad = Math.PI / 180;

    const toVector = (lat, lon) => [Math.cos(lat * rad) * Math.cos(lon * rad), Math.sin(lat * rad), Math.cos(lat * rad) * Math.sin(lon * rad)];

    // Dots of the land, evenly spaced on the sphere
    const bits = Uint8Array.from(atob(GLOBE_LAND), (c) => c.charCodeAt(0));
    const isLand = (lat, lon) => {
        const cell = Math.min(179, Math.floor(90 - lat)) * 360 + Math.min(359, Math.floor(lon + 180));
        return (bits[cell >> 3] >> (7 - (cell & 7))) & 1;
    };
    const dots = [];
    for (let lat = -58; lat <= 82; lat += 1.8) {
        const count = Math.round(360 * Math.cos(lat * rad) / 1.8);
        for (let k = 0; k < count; k++) {
            const lon = -180 + (k + 0.5) * 360 / count;
            if (isLand(lat, lon)) dots.push(toVector(lat, lon));
        }
    }

    // Arcs: great circles from Verona, lifted more the longer they are
    const hub = toVector(...GLOBE_HUB);
    const arcs = GLOBE_PLACES.map((place) => {
        const end = toVector(...place);
        const angle = Math.acos(Math.min(1, hub[0] * end[0] + hub[1] * end[1] + hub[2] * end[2]));
        const lift = 0.1 + 0.3 * angle / Math.PI;     // even the short European arcs stand out from the surface
        const steps = Math.max(8, Math.round(angle * 40));
        const points = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const a = Math.sin((1 - t) * angle) / Math.sin(angle);
            const b = Math.sin(t * angle) / Math.sin(angle);
            const h = 1 + lift * Math.sin(Math.PI * t);
            points.push([(a * hub[0] + b * end[0]) * h, (a * hub[1] + b * end[1]) * h, (a * hub[2] + b * end[2]) * h]);
        }
        return { end, points };
    });

    let width = 0;
    let height = 0;
    let ratio = 1;
    let centre = START;
    let last = 0;
    let frame = 0;
    let onScreen = false;

    // Orthographic view: the longitude "centre" faces the visitor, east to the right, then the tilt; z > 0 is in front
    const project = ([x, y, z], cosC, sinC, out) => {
        const x1 = z * cosC - x * sinC;
        const z1 = x * cosC + z * sinC;
        out[0] = x1;
        out[1] = y * Math.cos(TILT) - z1 * Math.sin(TILT);
        out[2] = y * Math.sin(TILT) + z1 * Math.cos(TILT);
        return out;
    };

    const draw = (time) => {
        const r = Math.min(width, height) * 0.39;      // room around the sphere for the arcs
        const cx = width / 2;
        const cy = height / 2;
        const cosC = Math.cos(centre * rad);
        const sinC = Math.sin(centre * rad);
        const p = [0, 0, 0];
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, width, height);

        // The sphere, barely there
        const shade = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
        shade.addColorStop(0, 'rgba(15, 43, 107, 0.02)');
        shade.addColorStop(1, 'rgba(15, 43, 107, 0.09)');
        ctx.fillStyle = shade;
        ctx.strokeStyle = 'rgba(15, 43, 107, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Land: round dots that fade towards the edge, drawn in a few batches of the same opacity
        ctx.fillStyle = NAVY;
        const batches = [[], [], [], [], []];
        for (const dot of dots) {
            project(dot, cosC, sinC, p);
            if (p[2] > 0) batches[Math.min(4, Math.floor(p[2] * 5))].push(cx + p[0] * r, cy - p[1] * r);
        }
        batches.forEach((batch, level) => {
            const z = (level + 0.5) / 5;
            const size = 0.6 + 0.45 * z;
            ctx.globalAlpha = 0.15 + 0.6 * z;
            ctx.beginPath();
            for (let i = 0; i < batch.length; i += 2) {
                ctx.moveTo(batch[i] + size, batch[i + 1]);
                ctx.arc(batch[i], batch[i + 1], size, 0, Math.PI * 2);
            }
            ctx.fill();
        });

        // Arcs: drawn where they are in front of the sphere or outside its outline
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        arcs.forEach((arc, index) => {
            const screen = arc.points.map((point) => {
                project(point, cosC, sinC, p);
                return [cx + p[0] * r, cy - p[1] * r, p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1];
            });
            const start = screen[0];
            const finish = screen[screen.length - 1];
            const colour = ctx.createLinearGradient(start[0], start[1], finish[0], finish[1]);
            colour.addColorStop(0, '#0888f8');
            colour.addColorStop(1, '#b028c8');
            ctx.strokeStyle = colour;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            screen.forEach(([x, y, visible], i) => {
                if (visible && i > 0 && screen[i - 1][2]) ctx.lineTo(x, y);
                else ctx.moveTo(x, y);
            });
            ctx.stroke();

            // A light travels along each arc, from Verona to the partner
            if (!reducedMotion) {
                const t = ((time / 2600) + index * 0.37) % 1;
                const at = screen[Math.round(t * (screen.length - 1))];
                if (at[2]) {
                    ctx.globalAlpha = Math.sin(Math.PI * t);
                    ctx.fillStyle = '#b028c8';
                    ctx.beginPath();
                    ctx.arc(at[0], at[1], 2.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // The partner city
            project(arc.end, cosC, sinC, p);
            if (p[2] > 0) {
                ctx.globalAlpha = 0.5 + 0.5 * p[2];
                ctx.fillStyle = NAVY;
                ctx.beginPath();
                ctx.arc(cx + p[0] * r, cy - p[1] * r, 2.6, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Verona, with a ring that grows and fades
        project(hub, cosC, sinC, p);
        if (p[2] > 0) {
            const hx = cx + p[0] * r;
            const hy = cy - p[1] * r;
            ctx.globalAlpha = 1;
            ctx.fillStyle = NAVY;
            ctx.beginPath();
            ctx.arc(hx, hy, 4, 0, Math.PI * 2);
            ctx.fill();
            if (!reducedMotion) {
                const t = (time / 2000) % 1;
                ctx.globalAlpha = 0.6 * (1 - t);
                ctx.strokeStyle = NAVY;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(hx, hy, 4 + 12 * t, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
    };

    const tick = (time) => {
        frame = 0;
        if (!onScreen) return;
        centre -= DEGREES_PER_SECOND * Math.min(0.1, (time - (last || time)) / 1000);   // the surface moves eastwards
        last = time;
        draw(time);
        frame = requestAnimationFrame(tick);
    };

    const resize = () => {
        const box = globeCanvas.getBoundingClientRect();
        ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = box.width;
        height = box.height;
        globeCanvas.width = Math.round(width * ratio);
        globeCanvas.height = Math.round(height * ratio);
        draw(performance.now());
    };
    new ResizeObserver(resize).observe(globeCanvas);

    // It turns only while it is on the screen, and stays still for those who prefer reduced motion.
    if (!reducedMotion) {
        new IntersectionObserver((entries) => {
            onScreen = entries[0].isIntersecting;
            last = 0;
            if (onScreen && !frame) frame = requestAnimationFrame(tick);
        }).observe(globeCanvas);
    }
}
