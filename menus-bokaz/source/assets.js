/* Bo'kaz – bibliothèque d'illustrations vectorielles (SVG) pour les affiches/menus.
   Usage dans le HTML : <div class="svg" data-svg="hibiscus" data-o='{"color":"red"}'></div>
   puis BK.hydrate() remplit chaque bloc. */
(function () {
  const R = (seed) => { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
  let U = 0; const uid = (p) => p + '_' + (++U);
  const f = (n) => Math.round(n * 10) / 10;
  const svg = (vb, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${extra}>${body}</svg>`;
  const A = {};

  /* ---------- Hibiscus ---------- */
  const HPAL = {
    red: ['#5e000a', '#b80d1b', '#ec2b2b', '#ff6f52', '#ffc3a3'],
    yellow: ['#c43c00', '#f08c00', '#ffc21a', '#ffe066', '#fff6c7'],
    pink: ['#6e0838', '#c81e6a', '#f0468e', '#ff8fbd', '#ffd6e8'],
    orange: ['#7a1d00', '#d9480f', '#ff7a1a', '#ffb04d', '#ffe0b0'],
  };
  A.hibiscus = ({ color = 'red', rot = 0, seed = 1 } = {}) => {
    const p = HPAL[color] || HPAL.red, g = uid('hg'), r = R(seed);
    let petals = '';
    for (let i = 0; i < 5; i++) {
      const a = rot + i * 72 + (r() - 0.5) * 10, s = 0.9 + r() * 0.16;
      petals += `<g transform="rotate(${f(a)}) scale(${f(s)})">
        <path d="M0,0 C-26,-6 -52,-36 -47,-64 C-42,-90 -18,-101 -3,-88 C10,-101 38,-95 47,-70 C56,-42 25,-8 0,0Z" fill="url(#${g})" stroke="${p[0]}" stroke-width="1.4" stroke-opacity=".45"/>
        <path d="M0,-6 Q-10,-40 -26,-72 M0,-6 Q0,-50 -2,-86 M0,-6 Q10,-40 26,-74 M0,-6 Q-20,-30 -40,-54 M0,-6 Q20,-30 40,-56" fill="none" stroke="${p[0]}" stroke-opacity=".25" stroke-width="1.5"/>
      </g>`;
    }
    let st = `<path d="M0,0 C4,-30 10,-56 15,-80" stroke="${p[3]}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
    for (let k = 0; k < 14; k++) {
      const t = 0.55 + r() * 0.35, x = 4 + t * 12 + (r() - 0.5) * 16, y = -t * 82 + (r() - 0.5) * 8;
      st += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2.4 + r() * 1.6)}" fill="#ffd23f" stroke="#d97800" stroke-width=".8"/>`;
    }
    for (let k = 0; k < 5; k++) { const a = k * 72 * Math.PI / 180; st += `<circle cx="${f(15 + Math.cos(a) * 5)}" cy="${f(-84 + Math.sin(a) * 5)}" r="3.4" fill="${p[1]}" stroke="${p[0]}" stroke-width=".8"/>`; }
    return svg('-104 -104 208 208', `<defs><radialGradient id="${g}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="100">
      <stop offset="0" stop-color="${p[0]}"/><stop offset=".2" stop-color="${p[1]}"/><stop offset=".58" stop-color="${p[2]}"/><stop offset=".9" stop-color="${p[3]}"/><stop offset="1" stop-color="${p[4]}"/></radialGradient></defs>
      ${petals}<circle r="13" fill="${p[0]}" opacity=".75"/><g transform="rotate(${rot + 26})">${st}</g>`);
  };

  /* ---------- Petite fleur jaune (puce) ---------- */
  A.flower = ({ c1 = '#ffe14d', c2 = '#ffad0a', c3 = '#e2530a', stroke = '#c96a00' } = {}) => {
    const g = uid('fg'); let p = '';
    for (let i = 0; i < 5; i++) p += `<ellipse cx="0" cy="-33" rx="23" ry="33" transform="rotate(${i * 72})" fill="url(#${g})" stroke="${stroke}" stroke-width="2.5"/>`;
    return svg('-72 -72 144 144', `<defs><radialGradient id="${g}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="66"><stop offset=".15" stop-color="${c2}"/><stop offset=".7" stop-color="${c1}"/><stop offset="1" stop-color="#fff3a8"/></radialGradient></defs>${p}<circle r="15" fill="${c3}" stroke="#9a2f00" stroke-width="2"/><circle cx="-4" cy="-4" r="4" fill="#ffd28a" opacity=".8"/>`);
  };

  /* ---------- Palme de cocotier ---------- */
  A.palm = ({ len = 500, bend = 0.28, n = 30, seed = 3, droop = 0.3, width = 1, dark = '#145a24', mid = '#23863a', light = '#4db34f', tip = 0.05 } = {}) => {
    const r = R(seed), P0 = [0, 0], P1 = [len * 0.5, -len * bend], P2 = [len, len * tip];
    const B = (t) => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]];
    const D = (t) => { const x = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]), y = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]), m = Math.hypot(x, y); return [x / m, y / m]; };
    let mnx = 0, mny = 0, mxx = len, mxy = 0; const up = (x, y) => { mnx = Math.min(mnx, x); mny = Math.min(mny, y); mxx = Math.max(mxx, x); mxy = Math.max(mxy, y); };
    const back = [], front = [];
    for (let i = 0; i < n; i++) {
      const t = 0.06 + 0.92 * i / (n - 1), [x, y] = B(t), [dx, dy] = D(t);
      for (const side of [-1, 1]) {
        const L = len * 0.36 * Math.sin(Math.PI * (0.12 + 0.86 * t)) * (0.85 + r() * 0.3) * width + 10;
        const ang = side * (38 + r() * 18) * Math.PI / 180;
        const vx = dx * Math.cos(ang) - dy * Math.sin(ang), vy = dx * Math.sin(ang) + dy * Math.cos(ang);
        const gy = droop * L * (side > 0 ? 0.9 : 0.5);
        const ex = x + vx * L, ey = y + vy * L + gy, cx = x + vx * L * 0.55, cy = y + vy * L * 0.55 + gy * 0.15;
        const nx = -vy, ny = vx, w = L * 0.055 + 2.5;
        up(ex, ey); up(cx + nx * w, cy + ny * w);
        const col = side > 0 ? (r() < 0.5 ? mid : light) : (r() < 0.6 ? dark : mid);
        const d = `M${f(x)},${f(y)} Q${f(cx + nx * w)},${f(cy + ny * w)} ${f(ex)},${f(ey)} Q${f(cx - nx * w)},${f(cy - ny * w)} ${f(x)},${f(y)}Z`;
        const vein = `M${f(x)},${f(y)} Q${f(cx)},${f(cy)} ${f(ex)},${f(ey)}`;
        (side > 0 ? front : back).push(`<path d="${d}" fill="${col}" stroke="${dark}" stroke-width="1"/><path d="${vein}" stroke="#bfe8a0" stroke-opacity=".35" stroke-width="1.2" fill="none"/>`);
      }
    }
    const rib = `<path d="M0,0 Q${P1[0]},${P1[1]} ${P2[0]},${P2[1]}" stroke="#55701c" stroke-width="${f(len * 0.016)}" fill="none" stroke-linecap="round"/><path d="M0,0 Q${P1[0]},${P1[1]} ${P2[0]},${P2[1]}" stroke="#a5c24a" stroke-width="${f(len * 0.005)}" fill="none" stroke-linecap="round"/>`;
    const pad = 12;
    return svg(`${f(mnx - pad)} ${f(mny - pad)} ${f(mxx - mnx + 2 * pad)} ${f(mxy - mny + 2 * pad)}`, back.join('') + rib + front.join(''));
  };

  /* ---------- Branche de sapin ---------- */
  A.pine = ({ len = 400, bend = 0.12, seed = 5, density = 1, needle = 34 } = {}) => {
    const r = R(seed), P0 = [0, 0], P1 = [len * 0.5, -len * bend], P2 = [len, 0];
    const B = (t) => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]];
    const D = (t) => { const x = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]), y = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]), m = Math.hypot(x, y); return [x / m, y / m]; };
    const cols = ['#0b3d20', '#10502a', '#176636', '#1f7d42', '#2f9653'];
    const layers = cols.map(() => []);
    const N = Math.round(len / 2.2 * density);
    for (let i = 0; i < N; i++) {
      const t = r(), [x, y] = B(t), [dx, dy] = D(t), side = r() < 0.5 ? -1 : 1;
      const ang = side * (30 + r() * 45) * Math.PI / 180, L = needle * (0.55 + r() * 0.55) * (1 - 0.45 * t);
      const vx = dx * Math.cos(ang) - dy * Math.sin(ang), vy = dx * Math.sin(ang) + dy * Math.cos(ang);
      const li = Math.min(cols.length - 1, Math.floor(r() * cols.length));
      layers[li].push(`M${f(x)},${f(y)}L${f(x + vx * L)},${f(y + vy * L)}`);
    }
    const body = layers.map((l, i) => `<path d="${l.join('')}" stroke="${cols[i]}" stroke-width="3.3" stroke-linecap="round" fill="none"/>`).join('');
    return svg(`${-needle} ${-len * bend - needle * 1.2} ${len + needle * 2} ${len * bend + needle * 2.4}`, `<path d="M0,0 Q${P1[0]},${P1[1]} ${P2[0]},${P2[1]}" stroke="#4a2e14" stroke-width="5" fill="none"/>` + body);
  };

  /* ---------- Boule de Noël ---------- */
  const BPAL = { red: ['#ff8a8a', '#e11d2a', '#7a0010'], gold: ['#fff2b3', '#f2b81d', '#9a6200'], green: ['#9be7a6', '#1f9d4a', '#0b4a22'], white: ['#ffffff', '#eef1f5', '#a9b3c2'] };
  A.bauble = ({ color = 'red', band = true } = {}) => {
    const p = BPAL[color], g = uid('bg'), cg = uid('cg');
    return svg('-52 -70 104 124', `<defs><radialGradient id="${g}" cx=".35" cy=".32" r=".75"><stop offset="0" stop-color="${p[0]}"/><stop offset=".45" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>
      <linearGradient id="${cg}" x1="0" x2="1"><stop offset="0" stop-color="#8a5a00"/><stop offset=".5" stop-color="#ffe08a"/><stop offset="1" stop-color="#8a5a00"/></linearGradient></defs>
      <circle cx="0" cy="-62" r="5" fill="none" stroke="#b8860b" stroke-width="2"/>
      <circle cx="0" cy="4" r="46" fill="url(#${g})"/>
      ${band ? `<path d="M-44,-8 Q0,8 44,-8" stroke="${color === 'gold' ? '#c0392b' : '#ffd54a'}" stroke-width="3" fill="none" opacity=".8"/><path d="M-45,14 Q0,30 45,14" stroke="${color === 'gold' ? '#c0392b' : '#ffd54a'}" stroke-width="3" fill="none" opacity=".8"/>` : ''}
      <ellipse cx="-16" cy="-14" rx="12" ry="18" fill="#fff" opacity=".45" transform="rotate(30 -16 -14)"/>
      <rect x="-10" y="-56" width="20" height="14" rx="3" fill="url(#${cg})"/>`);
  };

  /* ---------- Étoile dorée ---------- */
  A.star = ({ glow = true } = {}) => {
    const g = uid('sg'), fl = uid('sf'); let pts = [];
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 21 : 52; pts.push(f(Math.cos(a) * rr) + ',' + f(Math.sin(a) * rr)); }
    return svg('-70 -70 140 140', `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6c2"/><stop offset=".45" stop-color="#ffcf33"/><stop offset="1" stop-color="#c98a00"/></linearGradient>
      <filter id="${fl}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter></defs>
      ${glow ? `<polygon points="${pts.join(' ')}" fill="#ffd54a" filter="url(#${fl})" opacity=".8"/>` : ''}
      <polygon points="${pts.join(' ')}" fill="url(#${g})" stroke="#a86f00" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="0,-52 0,0 ${pts[2]}" fill="#fff" opacity=".25"/>`);
  };

  /* ---------- Éclat / scintillement ---------- */
  A.sparkle = ({ color = '#fff7c9' } = {}) => svg('-50 -50 100 100', `<path d="M0,-48 C4,-10 10,-4 48,0 C10,4 4,10 0,48 C-4,10 -10,4 -48,0 C-10,-4 -4,-10 0,-48Z" fill="${color}"/>`);

  /* ---------- Paquet cadeau ---------- */
  const GPAL = { red: ['#f0453a', '#b3121c', '#ffd54a', '#c08a00'], gold: ['#ffd95a', '#d49a00', '#d7262e', '#8c0c14'], green: ['#2fa35a', '#11602e', '#e8262e', '#8c0c14'] };
  A.gift = ({ color = 'red' } = {}) => {
    const p = GPAL[color], g = uid('gg'), l = uid('gl');
    return svg('0 0 160 170', `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>
      <linearGradient id="${l}" x1="0" x2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset=".5" stop-color="#fff3b0"/><stop offset="1" stop-color="${p[2]}"/></linearGradient></defs>
      <ellipse cx="80" cy="163" rx="70" ry="6" fill="#000" opacity=".18"/>
      <rect x="16" y="70" width="128" height="92" rx="4" fill="url(#${g})"/>
      <rect x="8" y="50" width="144" height="28" rx="4" fill="url(#${g})" stroke="${p[1]}" stroke-width="2"/>
      <rect x="68" y="50" width="24" height="112" fill="url(#${l})"/>
      <rect x="8" y="58" width="144" height="12" fill="url(#${l})" opacity=".95"/>
      <path d="M80,52 C55,10 22,22 34,44 C42,58 70,54 80,52Z" fill="${p[2]}" stroke="${p[3]}" stroke-width="2.5"/>
      <path d="M80,52 C105,10 138,22 126,44 C118,58 90,54 80,52Z" fill="${p[2]}" stroke="${p[3]}" stroke-width="2.5"/>
      <path d="M80,52 L62,80 L70,82 Z M80,52 L98,80 L90,82Z" fill="${p[2]}" stroke="${p[3]}" stroke-width="1.5"/>
      <circle cx="80" cy="50" r="9" fill="${p[2]}" stroke="${p[3]}" stroke-width="2.5"/>
      <rect x="16" y="78" width="128" height="6" fill="#000" opacity=".12"/>`);
  };

  /* ---------- Bonnet de Noël ---------- */
  A.santa = () => {
    const g = uid('sh');
    return svg('0 0 200 160', `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4a3d"/><stop offset=".6" stop-color="#d6121f"/><stop offset="1" stop-color="#8e0612"/></linearGradient></defs>
      <path d="M22,118 C26,64 62,22 112,16 C150,12 178,34 184,70 L170,76 C162,52 146,44 130,50 C112,58 128,96 156,118 Z" fill="url(#${g})" stroke="#7a0010" stroke-width="2"/>
      <path d="M60,40 C80,30 100,26 120,28" stroke="#fff" stroke-opacity=".25" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="10" y="108" width="160" height="38" rx="19" fill="#fbfbfb" stroke="#d9d9d9" stroke-width="2"/>
      <path d="M22,116 q10,-6 20,0 q10,-6 20,0 q10,-6 20,0 q10,-6 20,0 q10,-6 20,0 q10,-6 20,0 q10,-6 20,0" stroke="#e3e3e3" stroke-width="3" fill="none"/>
      <circle cx="178" cy="80" r="20" fill="#fbfbfb" stroke="#d9d9d9" stroke-width="2"/><circle cx="172" cy="74" r="7" fill="#fff"/>`);
  };

  /* ---------- Toque de chef ---------- */
  A.chef = ({ fill = '#fffaf0', stroke = '#3b1607' } = {}) => svg('0 0 170 150', `
      <path d="M38,96 C10,96 6,52 34,46 C34,18 70,8 86,26 C100,6 140,14 138,46 C166,48 164,96 134,96 Z" fill="${fill}" stroke="${stroke}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M60,56 C62,68 60,82 58,94 M86,40 C88,60 86,80 85,94 M112,56 C112,70 112,82 112,94" stroke="${stroke}" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="36" y="94" width="100" height="40" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="6"/>
      <path d="M44,114 H128" stroke="#e2b23a" stroke-width="6"/>`);

  /* ---------- Bokit (sandwich) ---------- */
  A.bokit = ({ filling = 'poulet', seed = 9 } = {}) => {
    const r = R(seed), tg = uid('bt'), bg = uid('bb'), mg = uid('bm'), cg = uid('bc'), sh = uid('bs');
    let spots = '';
    for (let i = 0; i < 34; i++) { const x = 50 + r() * 300, y = 84 + r() * 60; if (((x - 200) / 165) ** 2 + ((y - 120) / 40) ** 2 > 0.8) continue; spots += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3 + r() * 6)}" ry="${f(2 + r() * 3)}" fill="${r() < 0.5 ? '#fff1c4' : '#b4621c'}" opacity="${f(0.25 + r() * 0.35)}"/>`; }
    let lettuce = 'M26,150';
    for (let x = 26; x <= 362; x += 21) lettuce += ` Q${x + 10},${176 + (r() * 10)} ${x + 21},${156 + r() * 6}`;
    lettuce += ' L374,150 L26,150 Z';
    const meat = filling === 'poulet'
      ? `<path d="M28,180 C60,160 340,160 372,180 C378,200 350,210 200,212 C50,210 22,200 28,180Z" fill="url(#${mg})"/>
         <path d="M70,186 L110,196 M140,184 L186,196 M222,184 L266,196 M296,186 L336,194" stroke="#4a1e06" stroke-width="6" stroke-linecap="round" opacity=".7"/>`
      : `<path d="M24,184 Q40,166 60,178 Q80,162 104,176 Q130,160 156,174 Q182,160 208,174 Q234,160 260,174 Q286,160 312,176 Q338,162 356,178 Q372,170 378,186 C378,204 350,212 200,214 C50,212 20,204 24,184Z" fill="#ee9a98" stroke="#b9545a" stroke-width="3"/>
         <path d="M40,194 Q120,180 200,192 Q280,180 360,194" stroke="#ffd3d0" stroke-width="5" fill="none" opacity=".8"/>
         <path d="M70,204 Q140,196 210,204 Q280,196 340,204" stroke="#c96a6e" stroke-width="3" fill="none" opacity=".5"/>`;
    return svg('0 0 400 300', `<defs>
        <radialGradient id="${tg}" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#ffd98a"/><stop offset=".45" stop-color="#eea54a"/><stop offset="1" stop-color="#a8591a"/></radialGradient>
        <linearGradient id="${bg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0b260"/><stop offset="1" stop-color="#9a4f16"/></linearGradient>
        <linearGradient id="${mg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9652a"/><stop offset="1" stop-color="#6b2d0c"/></linearGradient>
        <linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#f4a300"/></linearGradient>
        <radialGradient id="${sh}"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="200" cy="262" rx="190" ry="24" fill="url(#${sh})"/>
      <path d="M36,222 C30,266 370,266 364,222 C360,204 40,204 36,222Z" fill="url(#${bg})"/>
      <path d="M44,200 L356,200 L352,214 C334,228 318,208 302,226 C292,236 282,214 270,216 L82,214 C68,230 58,214 46,212Z" fill="url(#${cg})"/>
      ${meat}
      <path d="M64,168 a28,20 0 0,1 56,0 Z M168,166 a28,20 0 0,1 56,0Z M272,168 a28,20 0 0,1 56,0Z" fill="#e0302a" stroke="#9e1210" stroke-width="2"/>
      <path d="${lettuce}" fill="#5fbf3a" stroke="#2e7d1e" stroke-width="2.5"/>
      <path d="M22,140 C16,54 384,54 378,140 C380,160 20,160 22,140Z" fill="url(#${tg})"/>
      ${spots}
      <path d="M96,94 C140,76 230,72 292,90" stroke="#fff6da" stroke-width="10" stroke-linecap="round" fill="none" opacity=".45"/>`);
  };

  /* ---------- Frites de patate douce ---------- */
  A.fries = ({ seed = 4 } = {}) => {
    const r = R(seed), bx = uid('fx'); let fr = '';
    for (let i = 0; i < 13; i++) { const x = 52 + i * 8 + (r() - 0.5) * 8, a = (r() - 0.5) * 30, h = 70 + r() * 50; fr += `<rect x="${f(x)}" y="${f(120 - h)}" width="15" height="${f(h + 40)}" rx="4" fill="${r() < 0.5 ? '#ff9a2e' : '#f07c12'}" stroke="#b44f00" stroke-width="2" transform="rotate(${f(a)} ${f(x + 7)} 140)"/>`; }
    return svg('0 0 200 240', `<defs><linearGradient id="${bx}" x1="0" x2="1"><stop offset="0" stop-color="#d0121f"/><stop offset=".5" stop-color="#f03a32"/><stop offset="1" stop-color="#b00d18"/></linearGradient></defs>
      ${fr}<path d="M30,110 L170,110 L152,232 L48,232 Z" fill="url(#${bx})" stroke="#7a0010" stroke-width="3"/>
      <path d="M30,110 Q100,140 170,110" fill="#a50e18" opacity=".6"/>
      <g transform="translate(100,176) scale(.42)">${A.flower().replace(/<\/?svg[^>]*>/g, "")}</g>`);
  };

  /* ---------- Verre de jus ---------- */
  A.juice = ({ c1 = '#ffd23f', c2 = '#ff8a00', fruit = 'orange' } = {}) => {
    const j = uid('jj'), gl = uid('jg');
    const slice = fruit === 'orange'
      ? `<g transform="translate(150,64) rotate(20)"><circle r="34" fill="#ff9f1a" stroke="#e07000" stroke-width="3"/><circle r="27" fill="#ffd15c"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M0,0 L${f(Math.cos(i * Math.PI / 4) * 25)},${f(Math.sin(i * Math.PI / 4) * 25)}" stroke="#ff9f1a" stroke-width="2.5"/>`).join('')}</g>`
      : `<g transform="translate(150,64) rotate(20)"><circle r="32" fill="#7a2fa0" stroke="#4a1466" stroke-width="3"/><circle r="25" fill="#ffc21a"/>${[...Array(12)].map((_, i) => `<circle cx="${f(Math.cos(i * 0.52) * (8 + (i % 3) * 5))}" cy="${f(Math.sin(i * 0.52) * (8 + (i % 3) * 5))}" r="2.8" fill="#2b1500"/>`).join('')}</g>`;
    return svg('0 0 220 320', `<defs><linearGradient id="${j}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${gl}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".2" stop-color="#fff" stop-opacity=".1"/><stop offset=".8" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient></defs>
      <ellipse cx="110" cy="306" rx="74" ry="9" fill="#000" opacity=".2"/>
      <g transform="rotate(14 140 120)"><rect x="128" y="0" width="13" height="200" rx="6" fill="#fff"/><path d="M128,10 h13 M128,40 h13 M128,70 h13 M128,100 h13" stroke="#e0262e" stroke-width="12"/></g>
      <path d="M44,92 L176,92 L162,296 L58,296 Z" fill="url(#${j})"/>
      <ellipse cx="110" cy="92" rx="66" ry="8" fill="${c1}" opacity=".9"/>
      <path d="M36,62 L184,62 L166,302 L54,302 Z" fill="url(#${gl})" stroke="#e9eef2" stroke-width="4" stroke-linejoin="round"/>
      <rect x="62" y="104" width="12" height="170" rx="6" fill="#fff" opacity=".35"/>
      ${slice}`);
  };

  /* ---------- Mangue ---------- */
  A.mango = () => {
    const g = uid('mg');
    return svg('0 0 220 180', `<defs><radialGradient id="${g}" cx=".3" cy=".3" r=".9"><stop offset="0" stop-color="#ffe680"/><stop offset=".45" stop-color="#ffb21a"/><stop offset=".75" stop-color="#f26b1d"/><stop offset="1" stop-color="#b8321a"/></radialGradient></defs>
      <ellipse cx="112" cy="168" rx="90" ry="9" fill="#000" opacity=".18"/>
      <path d="M30,96 C24,40 90,14 142,26 C196,38 214,92 190,130 C164,170 90,176 52,150 C38,140 32,120 30,96Z" fill="url(#${g})"/>
      <path d="M150,28 C162,12 176,6 190,8 C186,22 172,32 150,28Z" fill="#3a9a3a" stroke="#1d5c1d" stroke-width="2"/>
      <path d="M144,28 L150,16" stroke="#5a3a10" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="84" cy="64" rx="22" ry="12" fill="#fff" opacity=".35" transform="rotate(-25 84 64)"/>`);
  };

  /* ---------- Fruit de la passion (moitié) ---------- */
  A.passion = ({ seed = 8 } = {}) => {
    const r = R(seed), g = uid('pg'), p = uid('pp'); let seeds = '';
    for (let i = 0; i < 26; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * 44; seeds += `<ellipse cx="${f(100 + Math.cos(a) * d)}" cy="${f(100 + Math.sin(a) * d * 0.9)}" rx="4.5" ry="3.5" fill="#1d0f05"/><circle cx="${f(100 + Math.cos(a) * d - 1.5)}" cy="${f(98 + Math.sin(a) * d * 0.9)}" r="1.2" fill="#fff" opacity=".6"/>`; }
    return svg('0 0 200 200', `<defs><radialGradient id="${g}" cx=".4" cy=".35"><stop offset="0" stop-color="#b65bd6"/><stop offset=".7" stop-color="#6a1b86"/><stop offset="1" stop-color="#3a0b4d"/></radialGradient>
      <radialGradient id="${p}"><stop offset="0" stop-color="#ffd84d"/><stop offset="1" stop-color="#f29a00"/></radialGradient></defs>
      <ellipse cx="100" cy="186" rx="80" ry="8" fill="#000" opacity=".18"/>
      <ellipse cx="100" cy="100" rx="84" ry="78" fill="url(#${g})"/><ellipse cx="100" cy="100" rx="66" ry="60" fill="#fff4d6"/><ellipse cx="100" cy="100" rx="58" ry="52" fill="url(#${p})"/>${seeds}`);
  };

  /* ---------- Guirlande lumineuse ---------- */
  A.lights = ({ w = 1240, sag = 60, n = 18, h = 120, seed = 2, colors = ['#ffd54a', '#ff5a4a', '#ffd54a', '#7bd88f', '#ffb347'] } = {}) => {
    const r = R(seed), gl = uid('lg'); let b = '';
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, x = t * w, y = 10 + 4 * sag * t * (1 - t);
      const c = colors[i % colors.length];
      b += `<circle cx="${f(x)}" cy="${f(y + 20)}" r="26" fill="url(#${gl})" opacity=".9"/><rect x="${f(x - 4)}" y="${f(y)}" width="8" height="8" fill="#3a3a2a"/><ellipse cx="${f(x)}" cy="${f(y + 18)}" rx="7" ry="11" fill="${c}"/><ellipse cx="${f(x - 2)}" cy="${f(y + 14)}" rx="2.5" ry="4" fill="#fff" opacity=".7"/>`;
    }
    return svg(`0 0 ${w} ${h}`, `<defs><radialGradient id="${gl}"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd54a" stop-opacity="0"/></radialGradient></defs>
      <path d="M0,10 Q${w / 2},${10 + sag * 2} ${w},10" stroke="#2d2a1a" stroke-width="3" fill="none"/>${b}`);
  };

  /* ---------- Chalet du marché ---------- */
  A.chalet = () => {
    const w = uid('cw'), lt = uid('cl'), md = uid('cm'), rf = uid('cr');
    let planks = ''; for (let x = 30; x < 330; x += 22) planks += `<rect x="${x}" y="110" width="22" height="182" fill="${(x / 22) % 2 ? '#a35f2a' : '#8f4f20'}"/><path d="M${x},110 v182" stroke="#5c2f10" stroke-width="2"/>`;
    let bulbs = ''; for (let i = 0; i <= 12; i++) { const t = i / 12, x = 10 + t * 340, y = 112 - (t < 0.5 ? t * 2 : (1 - t) * 2) * 96 + 8; bulbs += `<circle cx="${f(x)}" cy="${f(y)}" r="11" fill="#ffe27a" opacity=".35"/><circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="${['#ffe066', '#ff5a4a', '#7bd88f'][i % 3]}"/>`; }
    return svg('0 0 360 300', `<defs>
       <linearGradient id="${lt}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#f29b30"/></linearGradient>
       <linearGradient id="${rf}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b3410"/><stop offset="1" stop-color="#3e1c07"/></linearGradient>
       <pattern id="${md}" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="28" height="28" fill="#ffb703"/><rect width="10" height="28" fill="#d62828" opacity=".8"/><rect height="10" width="28" fill="#d62828" opacity=".55"/><rect x="18" width="3" height="28" fill="#1b7a3a" opacity=".7"/><rect y="18" height="3" width="28" fill="#1b7a3a" opacity=".7"/></pattern></defs>
      <ellipse cx="180" cy="294" rx="176" ry="8" fill="#000" opacity=".2"/>
      ${planks}
      <rect x="58" y="150" width="244" height="92" fill="url(#${lt})" stroke="#5c2f10" stroke-width="5"/>
      <rect x="80" y="176" width="40" height="30" rx="4" fill="#d9480f" opacity=".6"/><rect x="130" y="170" width="30" height="36" rx="4" fill="#2f9e44" opacity=".5"/><rect x="230" y="178" width="46" height="28" rx="4" fill="#c92a2a" opacity=".55"/>
      <path d="M58,206 H302" stroke="#b86b22" stroke-width="4"/>
      <path d="M48,124 H312 V146 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 q-11,14 -22,0 Z" fill="url(#${md})" stroke="#7a2a08" stroke-width="2"/>
      <rect x="44" y="238" width="272" height="16" rx="3" fill="#6b3410"/>
      <path d="M-4,118 L180,8 L364,118 L350,124 L180,26 L10,124Z" fill="url(#${rf})"/>
      <path d="M-4,118 L180,8 L364,118" stroke="#fffdf7" stroke-width="9" fill="none" stroke-linejoin="round"/>
      <path d="M150,54 h60 v36 h-60z" fill="#1f2b22" stroke="#8a5a2a" stroke-width="4"/>
      <text x="180" y="79" text-anchor="middle" font-family="Lobster" font-size="20" fill="#fff">Bo'kaz</text>
      ${bulbs}`);
  };

  /* ---------- Feuille de bananier (support) ---------- */
  const bananaLeaf = (cx, cy, rx, ry) => {
    let ribs = '';
    for (let i = -8; i <= 8; i++) { if (!i) continue; const x = cx + i * rx / 9; ribs += `<path d="M${f(x)},${f(cy)} Q${f(x + i * 3)},${f(cy - ry * 0.5)} ${f(x + i * 6)},${f(cy - ry * 0.86 * Math.sqrt(1 - (i / 9) ** 2))}" stroke="#2f7d2a" stroke-opacity=".45" stroke-width="2" fill="none"/><path d="M${f(x)},${f(cy)} Q${f(x + i * 3)},${f(cy + ry * 0.5)} ${f(x + i * 6)},${f(cy + ry * 0.86 * Math.sqrt(1 - (i / 9) ** 2))}" stroke="#2f7d2a" stroke-opacity=".45" stroke-width="2" fill="none"/>`; }
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#5cb84a" stroke="#2a6e22" stroke-width="3"/>${ribs}<path d="M${cx - rx},${cy} L${cx + rx},${cy}" stroke="#a8d86a" stroke-width="5"/>`;
  };
  const blob = (r, cx, cy, rad, k = 14, j = 0.12) => { let d = ''; for (let i = 0; i < k; i++) { const a = i / k * 6.283, rr = rad * (1 - j + r() * j * 2); d += (i ? 'L' : 'M') + f(cx + Math.cos(a) * rr) + ',' + f(cy + Math.sin(a) * rr * 0.9); } return d + 'Z'; };

  /* ---------- Planche apéro : accras, samoussas, wings ---------- */
  A.apero = ({ seed = 12 } = {}) => {
    const r = R(seed), ag = uid('ac'), sg = uid('sm'), wg = uid('wg'), sh = uid('as');
    let food = '';
    [[150, 108, 1.0], [222, 92, 0.95], [292, 108, 1.0], [118, 152, 0.95], [196, 140, 1.05], [264, 150, 0.95]].forEach(([x, y, s], i) => {
      const t = i % 3, ang = -20 + r() * 40;
      if (i < 3) { // samoussas
        food += `<g transform="translate(${x},${y - 18}) rotate(${f(ang)}) scale(${s})"><path d="M-34,22 Q0,-48 34,22 Q0,32 -34,22Z" fill="url(#${sg})" stroke="#9a5512" stroke-width="2.5" stroke-linejoin="round"/><path d="M-20,16 Q0,-20 20,16" stroke="#fff3c4" stroke-opacity=".5" stroke-width="3" fill="none"/></g>`;
      }
    });
    for (let i = 0; i < 6; i++) { const x = 104 + (i % 3) * 64 + r() * 14, y = 172 + Math.floor(i / 3) * 30 + r() * 8; food += `<path d="${blob(r, x, y, 25)}" fill="url(#${ag})" stroke="#8a4a10" stroke-width="2"/>`; for (let k = 0; k < 4; k++) food += `<circle cx="${f(x - 12 + r() * 24)}" cy="${f(y - 10 + r() * 20)}" r="${f(1.5 + r() * 2)}" fill="#7a3a08" opacity=".5"/>`; }
    for (let i = 0; i < 4; i++) { const x = 310 + (i % 2) * 34, y = 120 + Math.floor(i / 2) * 48 + i * 4, a = -30 + i * 18; food += `<g transform="translate(${x},${y}) rotate(${a})"><ellipse rx="34" ry="17" fill="url(#${wg})" stroke="#3e1204" stroke-width="2"/><path d="M-18,-8 L-6,8 M0,-10 L12,8" stroke="#2a0a00" stroke-width="3" opacity=".55"/><ellipse cx="-8" cy="-7" rx="12" ry="4" fill="#fff" opacity=".25"/></g>`; }
    return svg('0 0 420 270', `<defs><radialGradient id="${ag}" cx=".4" cy=".35"><stop offset="0" stop-color="#ffd27a"/><stop offset=".6" stop-color="#d98a2b"/><stop offset="1" stop-color="#9a5212"/></radialGradient>
      <linearGradient id="${sg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#d0852c"/></linearGradient>
      <radialGradient id="${wg}" cx=".4" cy=".35"><stop offset="0" stop-color="#d0743a"/><stop offset=".6" stop-color="#8e3510"/><stop offset="1" stop-color="#4e1604"/></radialGradient>
      <radialGradient id="${sh}"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="210" cy="244" rx="200" ry="22" fill="url(#${sh})"/>
      ${bananaLeaf(210, 150, 196, 92)}${food}
      <g transform="translate(70,90) rotate(-20)"><path d="M0,0 A26,26 0 0,1 52,0Z" fill="#8bc34a" stroke="#3d7a12" stroke-width="3"/><path d="M6,-2 A20,20 0 0,1 46,-2Z" fill="#d7f08a"/></g>`);
  };

  /* ---------- Assiette créole : poulet boucané, riz, aloco, pikliz ---------- */
  A.plate = ({ seed = 21 } = {}) => {
    const r = R(seed), cg = uid('pc'), ag = uid('pa'), pg = uid('pp'), sh = uid('ps');
    let rice = ''; for (let i = 0; i < 60; i++) { const a = r() * 6.283, d = Math.sqrt(r()); rice += `<ellipse cx="${f(130 + Math.cos(a) * d * 58)}" cy="${f(122 + Math.sin(a) * d * 34)}" rx="4" ry="2" fill="${r() < 0.5 ? '#fff' : '#efe6cf'}" transform="rotate(${f(r() * 180)} ${f(130 + Math.cos(a) * d * 58)} ${f(122 + Math.sin(a) * d * 34)})"/>`; }
    let aloco = ''; [[110, 175], [146, 186], [182, 190], [218, 186]].forEach(([x, y]) => { aloco += `<ellipse cx="${x}" cy="${y}" rx="24" ry="14" fill="url(#${ag})" stroke="#8a3a08" stroke-width="2"/><ellipse cx="${x - 4}" cy="${y - 3}" rx="10" ry="4" fill="#ffd98a" opacity=".6"/>`; });
    let pik = ''; const pc = ['#ff7a1a', '#ffffff', '#e0262e', '#7cc242', '#ffb000'];
    for (let i = 0; i < 40; i++) { const x = 296 + (r() - 0.5) * 60, y = 178 + (r() - 0.5) * 26, a = r() * 180; pik += `<rect x="${f(x)}" y="${f(y)}" width="18" height="3" rx="1.5" fill="${pc[i % pc.length]}" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/>`; }
    let fries = ''; for (let i = 0; i < 7; i++) fries += `<rect x="${250 + i * 12}" y="${96 + (i % 3) * 6}" width="12" height="58" rx="3" fill="${i % 2 ? '#ff9a2e' : '#f07c12'}" stroke="#b44f00" stroke-width="1.6" transform="rotate(${-55 + i * 4} ${256 + i * 12} 125)"/>`;
    return svg('0 0 420 270', `<defs><radialGradient id="${cg}" cx=".4" cy=".3"><stop offset="0" stop-color="#e08a3c"/><stop offset=".55" stop-color="#a5441a"/><stop offset="1" stop-color="#5a1c06"/></radialGradient>
      <radialGradient id="${ag}" cx=".4" cy=".4"><stop offset="0" stop-color="#ffc76a"/><stop offset="1" stop-color="#d86a12"/></radialGradient>
      <radialGradient id="${pg}" cx=".5" cy=".4"><stop offset=".7" stop-color="#ffffff"/><stop offset="1" stop-color="#d9dde3"/></radialGradient>
      <radialGradient id="${sh}"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="210" cy="246" rx="200" ry="20" fill="url(#${sh})"/>
      <ellipse cx="210" cy="148" rx="200" ry="96" fill="url(#${pg})" stroke="#c8ced6" stroke-width="3"/>
      <ellipse cx="210" cy="148" rx="160" ry="72" fill="none" stroke="#e3e7ec" stroke-width="3"/>
      <path d="${blob(r, 130, 120, 62, 18, 0.06)}" fill="#fbf7ea" stroke="#e6dcc0" stroke-width="2"/>${rice}
      ${fries}
      <g transform="translate(214,128) rotate(-12)"><path d="M-62,4 C-70,-34 -20,-46 6,-26 C20,-16 30,-6 44,-4 L70,-10 C80,-16 92,-8 86,2 C94,8 86,20 76,14 L46,12 C30,20 10,34 -16,36 C-44,38 -58,26 -62,4Z" fill="url(#${cg})" stroke="#3e1204" stroke-width="2.5"/>
        <path d="M-40,-14 L-24,10 M-16,-24 L0,4 M8,-14 L20,4" stroke="#2a0a00" stroke-width="4" opacity=".5" stroke-linecap="round"/>
        <ellipse cx="-30" cy="-18" rx="18" ry="6" fill="#fff" opacity=".25"/></g>
      ${aloco}${pik}`);
  };

  /* ---------- Part de gâteau coco ---------- */
  A.cake = ({ seed = 31 } = {}) => {
    const r = R(seed), sg = uid('ck'); let flakes = '';
    for (let i = 0; i < 26; i++) { const x = 30 + r() * 150, y = 40 + r() * 34 - (x - 30) * 0.15; flakes += `<rect x="${f(x)}" y="${f(y)}" width="9" height="3" rx="1.5" fill="#fff" stroke="#e7dcc6" stroke-width=".6" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`; }
    return svg('0 0 220 170', `<defs><linearGradient id="${sg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3d6"/><stop offset="1" stop-color="#f0d29a"/></linearGradient></defs>
      <ellipse cx="110" cy="156" rx="100" ry="10" fill="#000" opacity=".18"/>
      <path d="M20,70 L190,40 L200,58 L200,140 L20,150 Z" fill="url(#${sg})" stroke="#c9a46a" stroke-width="2"/>
      <path d="M20,100 L200,92" stroke="#c0392b" stroke-width="9"/><path d="M20,122 L200,116" stroke="#f6e3b8" stroke-width="5"/>
      <path d="M20,70 L190,40 L200,58 L20,90 Z" fill="#fffdf7" stroke="#e7dcc6" stroke-width="2"/>
      <path d="M200,58 L200,140 L218,128 L218,50 Z" fill="#e8c98c" stroke="#c9a46a" stroke-width="2"/>
      ${flakes}<circle cx="150" cy="38" r="12" fill="#d6141f"/><path d="M150,26 Q156,12 166,10" stroke="#2e7d1e" stroke-width="3" fill="none"/>`);
  };

  /* ---------- Plateau rond (vue de dessus) ---------- */
  A.platter = ({ kind = 'accras', seed = 5 } = {}) => {
    const r = R(seed), ag = uid('pa'), sg = uid('ps'), wg = uid('pw'), rim = uid('pr'), sh = uid('psh');
    const accra = (x, y, s = 1) => { let o = `<path d="${blob(r, x, y, 21 * s)}" fill="url(#${ag})" stroke="#8a4a10" stroke-width="2"/>`; for (let k = 0; k < 3; k++) o += `<circle cx="${f(x - 9 + r() * 18)}" cy="${f(y - 8 + r() * 16)}" r="${f(1.5 + r() * 2)}" fill="#7a3a08" opacity=".5"/>`; return o; };
    const samo = (x, y, a, s = 1) => `<g transform="translate(${f(x)},${f(y)}) rotate(${f(a)}) scale(${s})"><path d="M-30,18 L0,-30 L30,18Z" fill="url(#${sg})" stroke="#9a5512" stroke-width="2.5" stroke-linejoin="round"/><path d="M-16,10 L0,-14 L16,10" stroke="#fff3c4" stroke-opacity=".5" stroke-width="3" fill="none"/></g>`;
    const wing = (x, y, a, s = 1) => `<g transform="translate(${f(x)},${f(y)}) rotate(${f(a)}) scale(${s})"><ellipse rx="30" ry="15" fill="url(#${wg})" stroke="#3e1204" stroke-width="2"/><path d="M-14,-7 L-4,7 M4,-8 L14,6" stroke="#2a0a00" stroke-width="3" opacity=".55"/><ellipse cx="-8" cy="-6" rx="10" ry="3.5" fill="#fff" opacity=".25"/></g>`;
    const beignet = (x, y) => { let o = `<path d="${blob(r, x, y, 19, 12, 0.18)}" fill="#e9a23b" stroke="#a5590f" stroke-width="2"/>`; for (let k = 0; k < 8; k++) o += `<circle cx="${f(x - 12 + r() * 24)}" cy="${f(y - 10 + r() * 20)}" r="1.6" fill="#fff"/>`; return o; };
    const montblanc = (x, y) => `<ellipse cx="${x}" cy="${y + 6}" rx="22" ry="10" fill="#c98a3c"/><path d="M${x - 22},${y + 6} Q${x - 20},${y - 22} ${x},${y - 24} Q${x + 20},${y - 22} ${x + 22},${y + 6}Z" fill="#fffdf6" stroke="#e5dcc8" stroke-width="2"/>` + [...Array(6)].map(() => `<rect x="${f(x - 14 + r() * 26)}" y="${f(y - 18 + r() * 20)}" width="7" height="2.4" fill="#f1e7d2" transform="rotate(${f(r() * 180)} ${x} ${y})"/>`).join('');
    const ananas = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="24" ry="18" fill="#e0a030" stroke="#9a5a10" stroke-width="2"/><ellipse cx="${x}" cy="${y - 2}" rx="15" ry="11" fill="#ffd95a" stroke="#d79a10" stroke-width="3"/><circle cx="${x}" cy="${y - 2}" r="5" fill="#d6141f"/>`;
    let items = '';
    if (kind === 'accras') { [[160, 128]].forEach(([x, y]) => items += accra(x, y, 1.05)); for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283; items += accra(160 + Math.cos(a) * 70, 128 + Math.sin(a) * 50); } }
    if (kind === 'samoussas') { items += samo(160, 128, 10); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; items += samo(160 + Math.cos(a) * 74, 128 + Math.sin(a) * 52, a * 57 + 30, 0.95); } }
    if (kind === 'wings') { for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283; items += wing(160 + Math.cos(a) * 66, 128 + Math.sin(a) * 48, a * 57, 0.95); } items += wing(160, 128, -20); }
    if (kind === 'mix') { items += samo(110, 100, -15, 0.85) + samo(160, 80, 10, 0.85) + samo(210, 98, 30, 0.85); items += accra(100, 160, 0.9) + accra(140, 172, 0.9) + accra(122, 132, 0.85); items += wing(200, 160, -30, 0.85) + wing(225, 135, 20, 0.85) + wing(178, 128, 60, 0.8); }
    if (kind === 'desserts') { items += montblanc(110, 100) + montblanc(210, 104) + ananas(160, 82) + beignet(120, 160) + beignet(200, 162) + ananas(160, 150); }
    return svg('0 0 320 260', `<defs><radialGradient id="${ag}" cx=".4" cy=".35"><stop offset="0" stop-color="#ffd27a"/><stop offset=".6" stop-color="#d98a2b"/><stop offset="1" stop-color="#9a5212"/></radialGradient>
      <linearGradient id="${sg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#d0852c"/></linearGradient>
      <radialGradient id="${wg}" cx=".4" cy=".35"><stop offset="0" stop-color="#d0743a"/><stop offset=".6" stop-color="#8e3510"/><stop offset="1" stop-color="#4e1604"/></radialGradient>
      <linearGradient id="${rim}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#d4a017"/><stop offset="1" stop-color="#8a5a00"/></linearGradient>
      <radialGradient id="${sh}"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="160" cy="236" rx="150" ry="18" fill="url(#${sh})"/>
      <ellipse cx="160" cy="130" rx="152" ry="112" fill="url(#${rim})"/>
      <ellipse cx="160" cy="130" rx="138" ry="100" fill="#fdf8ea"/>
      ${bananaLeaf(160, 130, 120, 82)}${items}`);
  };

  /* ---------- Étoile de prix (burst) ---------- */
  A.burst = ({ c1 = '#fff27a', c2 = '#ffc21a', stroke = '#c0392b', n = 22 } = {}) => {
    const g = uid('bu'); let pts = [];
    for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, rr = i % 2 ? 84 : 100; pts.push(f(Math.cos(a) * rr) + ',' + f(Math.sin(a) * rr)); }
    return svg('-104 -104 208 208', `<defs><radialGradient id="${g}" cx=".4" cy=".35"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs><polygon points="${pts.join(' ')}" fill="url(#${g})" stroke="${stroke}" stroke-width="5" stroke-linejoin="round"/>`);
  };

  /* ---------- Cœur dessiné ---------- */
  A.heart = ({ color = '#3b1607', fill = 'none', sw = 6 } = {}) => svg('0 0 100 90', `<path d="M50,82 C20,60 4,44 6,26 C8,10 26,2 40,10 C46,14 49,20 50,24 C52,18 58,10 66,8 C82,4 96,16 94,32 C92,50 72,64 50,82Z" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`);

  /* ---------- Bannière coup de pinceau ---------- */
  A.brush = ({ w = 600, h = 110, c1 = '#e8262e', c2 = '#a80f18', seed = 7, tails = 1 } = {}) => {
    const r = R(seed), g = uid('br'), pad = h * 0.45 * tails;
    const top = [], bot = [];
    for (let x = pad; x <= w - pad; x += 36) { top.push([x, h * 0.13 + (r() - 0.5) * h * 0.08]); }
    for (let x = w - pad; x >= pad; x -= 36) { bot.push([x, h * 0.87 + (r() - 0.5) * h * 0.08]); }
    const right = [], left = []; const k = 7;
    for (let i = 1; i < k; i++) { const y = h * 0.13 + (h * 0.74) * i / k; right.push([w - pad + r() * pad * 0.95, y - h * 0.035], [w - pad - r() * 12, y + h * 0.03]); }
    for (let i = k - 1; i > 0; i--) { const y = h * 0.13 + (h * 0.74) * i / k; left.push([pad - r() * pad * 0.95, y + h * 0.035], [pad + r() * 12, y - h * 0.03]); }
    const pts = [...top, ...right, ...bot, ...left];
    const d = 'M' + pts.map(p => f(p[0]) + ',' + f(p[1])).join(' L') + 'Z';
    let streaks = '';
    for (let i = 0; i < 9; i++) { const y = h * (0.2 + r() * 0.6), x0 = pad * 0.6 + r() * w * 0.3, x1 = w - pad * 0.6 - r() * w * 0.3; streaks += `<path d="M${f(x0)},${f(y)} L${f(x1)},${f(y + (r() - 0.5) * 4)}" stroke="${r() < 0.5 ? '#fff' : '#000'}" stroke-opacity="${f(0.06 + r() * 0.08)}" stroke-width="${f(1 + r() * 3)}"/>`; }
    return svg(`0 0 ${w} ${h}`, `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="${d}" fill="url(#${g})"/>${streaks}`, 'preserveAspectRatio="none"');
  };

  /* ---------- Bokeh doré ---------- */
  A.bokeh = (el, { n = 40, seed = 11, color = '255,214,90', minR = 6, maxR = 40, zones = null } = {}) => {
    const r = R(seed); let html = '';
    for (let i = 0; i < n; i++) {
      let x = r() * 100, y = r() * 100;
      if (zones) { const z = zones[Math.floor(r() * zones.length)]; x = z[0] + r() * (z[2] - z[0]); y = z[1] + r() * (z[3] - z[1]); }
      const s = minR + r() * (maxR - minR), o = 0.25 + r() * 0.6;
      html += `<span style="position:absolute;left:${f(x)}%;top:${f(y)}%;width:${f(s * 2)}px;height:${f(s * 2)}px;border-radius:50%;background:radial-gradient(circle, rgba(${color},${f(o)}) 0%, rgba(${color},${f(o * 0.5)}) 45%, rgba(${color},0) 70%);transform:translate(-50%,-50%)"></span>`;
    }
    el.innerHTML = html;
  };

  A.hydrate = () => {
    document.querySelectorAll('[data-svg]').forEach((el) => {
      const o = el.dataset.o ? JSON.parse(el.dataset.o) : {};
      el.innerHTML = A[el.dataset.svg](o);
      const s = el.querySelector('svg'); if (s) { s.style.width = '100%'; s.style.height = 'auto'; s.style.display = 'block'; s.style.overflow = 'visible'; }
    });
    document.querySelectorAll('[data-bokeh]').forEach((el) => A.bokeh(el, el.dataset.o ? JSON.parse(el.dataset.o) : {}));
    document.querySelectorAll('[data-brush]').forEach((el) => {
      const o = el.dataset.o ? JSON.parse(el.dataset.o) : {};
      const b = document.createElement('div'); b.className = 'brush-bg';
      b.innerHTML = A.brush({ w: el.offsetWidth || 600, h: el.offsetHeight || 100, ...o });
      const s = b.querySelector('svg'); s.style.width = '100%'; s.style.height = '100%'; s.style.display = 'block';
      el.prepend(b);
    });
  };
  window.BK = A;
})();
