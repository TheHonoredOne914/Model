/* ============ ART: hero, monsters, islands ============ */
/* Dhruva — the hero. Layered SVG with gradients for a richer, non-flat look. */
function heroBust(size=46){
  const u = 'hb' + Math.floor(Math.random()*1e6);
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="${u}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B4638"/><stop offset=".55" stop-color="#3E2E24"/><stop offset="1" stop-color="#2B1E17"/></linearGradient>
    <radialGradient id="${u}s" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#F5C9A0"/><stop offset=".6" stop-color="#E0A878"/><stop offset="1" stop-color="#B97F52"/></radialGradient>
    <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3FCFC0"/><stop offset="1" stop-color="#1E8C82"/></linearGradient>
  </defs>
  <path d="M50 96 C30 96 18 88 16 76 L84 76 C82 88 70 96 50 96Z" fill="url(#${u}b)"/>
  <path d="M50 74 l7 6 -7 22 -7-22z" fill="#F2B441"/>
  <rect x="40" y="68" width="20" height="12" rx="5" fill="url(#${u}s)"/>
  <circle cx="50" cy="44" r="24" fill="url(#${u}s)"/>
  <path d="M26 42 C26 24 36 16 50 16 C64 16 74 24 74 42 C74 34 68 30 62 31 C56 32 52 28 50 24 C48 28 42 32 37 31 C31 30 26 34 26 42Z" fill="url(#${u}h)"/>
  <path d="M30 30 C38 20 62 20 70 30" stroke="#6B5647" stroke-width="2.5" fill="none" opacity=".7" stroke-linecap="round"/>
  <path d="M27 40 C27 33 30 28 35 26 L66 26 C71 28 74 33 74 40 L74 36 C74 31 70 29 64 30 L36 30 C30 29 27 31 27 36 Z" fill="#2E8578"/>
  <rect x="27" y="36" width="47" height="6" rx="3" fill="#35A091"/>
  <rect x="26" y="36" width="49" height="6" rx="3" fill="none" stroke="#1C6B60" stroke-width="1"/>
  <circle cx="50" cy="39" r="2.6" fill="#F2B441"/>
  <circle cx="41" cy="52" r="2.6" fill="#2B1E17"/>
  <circle cx="59" cy="52" r="2.6" fill="#2B1E17"/>
  <circle cx="41.8" cy="51.2" r=".9" fill="#fff" opacity=".9"/>
  <circle cx="59.8" cy="51.2" r=".9" fill="#fff" opacity=".9"/>
  <path d="M36 47 q5 -3 9 0" stroke="#8A6A50" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M55 47 q5 -3 9 0" stroke="#8A6A50" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M45 62 q5 4 10 0" stroke="#B97F52" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </svg>`;
}
/* full-body hero for splash/victory */
function heroFull(size=120){
  const u = 'hf' + Math.floor(Math.random()*1e6);
  return `<svg width="${size}" height="${size*1.35}" viewBox="0 0 120 162">
  <defs>
    <radialGradient id="${u}s" cx=".35" cy=".3" r="1"><stop offset="0" stop-color="#F5C9A0"/><stop offset=".6" stop-color="#E0A878"/><stop offset="1" stop-color="#B97F52"/></radialGradient>
    <linearGradient id="${u}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B4638"/><stop offset=".6" stop-color="#3A2B22"/><stop offset="1" stop-color="#281C15"/></linearGradient>
    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46DED0"/><stop offset="1" stop-color="#1E8C82"/></linearGradient>
    <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2C3E6E"/><stop offset="1" stop-color="#1A2547"/></linearGradient>
    <linearGradient id="${u}bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F8FF"/><stop offset=".5" stop-color="#C6D2E6"/><stop offset="1" stop-color="#8FA0BC"/></linearGradient>
    <linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD27A"/><stop offset="1" stop-color="#D89A2B"/></linearGradient>
  </defs>
  <ellipse cx="60" cy="156" rx="34" ry="5" fill="#000" opacity=".35"/>
  <path d="M40 46 C20 60 16 96 22 132 L44 124 Z" fill="url(#${u}c)"/>
  <path d="M80 46 C100 60 104 96 98 132 L76 124 Z" fill="url(#${u}c)" opacity=".85"/>
  <rect x="52" y="118" width="7" height="34" rx="3" fill="#31415F"/>
  <rect x="62" y="118" width="7" height="34" rx="3" fill="#31415F"/>
  <rect x="49" y="148" width="14" height="8" rx="3.5" fill="#22304C"/>
  <rect x="59" y="148" width="14" height="8" rx="3.5" fill="#22304C"/>
  <path d="M42 62 L60 54 L78 62 L80 106 C72 116 48 116 40 106 Z" fill="url(#${u}a)"/>
  <path d="M42 62 L60 54 L78 62 L78 74 C66 82 54 82 42 74 Z" fill="#2E8578" opacity=".55"/>
  <path d="M60 56 l6 5 -6 30 -6-30z" fill="url(#${u}g)"/>
  <circle cx="60" cy="70" r="4" fill="#F8F4EA"/><path d="M60 66 v8 M56 70 h8" stroke="#D89A2B" stroke-width="1.4"/>
  <rect x="38" y="60" width="12" height="34" rx="6" fill="url(#${u}s)" transform="rotate(6 44 77)"/>
  <rect x="70" y="60" width="12" height="34" rx="6" fill="url(#${u}s)" transform="rotate(-6 76 77)"/>
  <circle cx="60" cy="34" r="17" fill="url(#${u}s)"/>
  <path d="M43 33 C43 19 51 12 60 12 C69 12 77 19 77 33 C77 27 72 24 67 25 C62 26 60 23 60 20 C58 23 55 26 50 25 C46 24 43 27 43 33Z" fill="url(#${u}h)"/>
  <path d="M42 30 C42 24 46 21 50 20 L70 20 C74 21 78 24 78 30 L78 27 C78 23 74 21.5 69 22.2 L51 22.2 C46 21.5 42 23 42 27 Z" fill="#2E8578"/>
  <rect x="42" y="29" width="36" height="5" rx="2.5" fill="#35A091"/>
  <circle cx="60" cy="31.5" r="2.2" fill="#F2B441"/>
  <circle cx="54" cy="40" r="2" fill="#2B1E17"/><circle cx="66" cy="40" r="2" fill="#2B1E17"/>
  <circle cx="54.6" cy="39.4" r=".7" fill="#fff"/><circle cx="66.6" cy="39.4" r=".7" fill="#fff"/>
  <path d="M55 48 q5 3.4 10 0" stroke="#B97F52" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g transform="rotate(38 96 66)">
    <rect x="93.5" y="14" width="5" height="52" rx="2.4" fill="url(#${u}bl)"/>
    <path d="M96 14 L99 4 L93 4 Z" fill="url(#${u}bl)"/>
    <rect x="90" y="62" width="12" height="5" rx="2" fill="url(#${u}g)"/>
    <rect x="93.8" y="66" width="4.4" height="12" rx="2" fill="#8A5A22"/>
  </g>
  </svg>`;
}
/* splash emblem: shield + crossed blades */
function splashArt(size=120){
  const u = 'sp' + Math.floor(Math.random()*1e6);
  return `<svg class="swordx" width="${size}" height="${size}" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="${u}sh" cx=".38" cy=".28" r="1"><stop offset="0" stop-color="#3FCFC0"/><stop offset=".65" stop-color="#1E8C82"/><stop offset="1" stop-color="#0F5B54"/></radialGradient>
    <linearGradient id="${u}bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F8FF"/><stop offset=".55" stop-color="#BECBDF"/><stop offset="1" stop-color="#7E90AE"/></linearGradient>
    <linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD27A"/><stop offset="1" stop-color="#C98D22"/></linearGradient>
  </defs>
  <g transform="rotate(45 60 60)"><rect x="57.4" y="8" width="5.2" height="66" rx="2.5" fill="url(#${u}bl)"/><path d="M60 8 L63.4 -3 H56.6Z" fill="url(#${u}bl)" transform="translate(0 4)"/><rect x="52" y="72" width="16" height="5" rx="2.4" fill="url(#${u}g)"/><rect x="57.6" y="77" width="4.8" height="12" rx="2.2" fill="#8A5A22"/></g>
  <g transform="rotate(-45 60 60)"><rect x="57.4" y="8" width="5.2" height="66" rx="2.5" fill="url(#${u}bl)" opacity=".92"/><path d="M60 8 L63.4 -3 H56.6Z" fill="url(#${u}bl)" transform="translate(0 4)"/><rect x="52" y="72" width="16" height="5" rx="2.4" fill="url(#${u}g)"/><rect x="57.6" y="77" width="4.8" height="12" rx="2.2" fill="#8A5A22"/></g>
  <path d="M60 42 C74 48 84 48 92 46 C92 74 80 92 60 102 C40 92 28 74 28 46 C36 48 46 48 60 42Z" fill="url(#${u}sh)" stroke="#0C3F3A" stroke-width="2"/>
  <path d="M60 46 C71 51 79 51.5 87 50 C86.5 72 77 86 60 96 C43 86 33.5 72 33 50 C41 51.5 49 51 60 46Z" fill="none" stroke="#7FE8DC" stroke-width="1.4" opacity=".5"/>
  <text x="60" y="82" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="800" font-size="34" fill="#F8F4EA">π</text>
  </svg>`;
}

/* ============ MONSTERS — parametric, layered, "realistic-ish" ============ */
/* cfg: body blob|tall|chunk|serpent|winged, eyes n, mouth fangs|grin|ooze,
   horns curved|spike|crown|null, extras: hat wings tentacles crystals rings, pattern spots|runes|crack */
function monsterSVG(cfg, uid, W=240, H=240){
  cfg = Object.assign({ body:'blob', eyes:2, mouth:'fangs', horns:'curved', pattern:'spots', pal:{dk:'#232', mid:'#555', lt:'#999', glow:'#F2B441'} }, cfg);
  const P = cfg.pal, u = 'm' + uid;
  const cx = 120;
  let body = '', parts = '';
  const eyes = [];
  const eyePos = { blob:[[100,116],[140,116]], tall:[[104,96],[136,96]], chunk:[[100,110],[140,110]], serpent:[[104,84],[136,84]], winged:[[102,112],[138,112]] };
  if (cfg.eyes === 1) eyes.push([120, (eyePos[cfg.body]||eyePos.blob)[0][1]]);
  else if (cfg.eyes === 3) eyes.push([96, 112],[120, 102],[144, 112]);
  else eyes.push(...(eyePos[cfg.body] || eyePos.blob));
  /* bodies */
  if (cfg.body === 'blob') body = `<path d="M120 38 C168 38 196 74 196 122 C196 166 168 196 120 196 C72 196 44 166 44 122 C44 74 72 38 120 38Z" fill="url(#${u}b)"/>`;
  else if (cfg.body === 'tall') body = `<path d="M120 30 C158 30 178 62 178 108 L178 178 C170 172 164 176 158 184 C152 176 146 172 140 182 C134 174 128 172 120 184 C112 172 106 174 100 182 C94 172 88 176 82 184 C76 176 70 172 62 178 L62 108 C62 62 82 30 120 30Z" fill="url(#${u}b)"/>`;
  else if (cfg.body === 'chunk') body = `<path d="M56 196 L50 108 C50 70 76 44 120 44 C164 44 190 70 190 108 L184 196 Z" fill="url(#${u}b)"/><path d="M56 196 L50 108 C50 70 76 44 120 44 L120 196 Z" fill="#000" opacity=".14"/><rect x="76" y="150" width="88" height="16" rx="6" fill="#000" opacity=".18"/>`;
  else if (cfg.body === 'serpent') body = `<path d="M120 30 C158 30 180 60 180 104 L180 150 C180 178 158 194 120 194 C82 194 60 178 60 150 L60 104 C60 60 82 30 120 30Z" fill="url(#${u}b)"/><path d="M62 160 C40 168 30 186 34 200 C56 196 70 188 78 178Z" fill="url(#${u}b)"/><path d="M178 160 C200 168 210 186 206 200 C184 196 170 188 162 178Z" fill="url(#${u}b)"/>`;
  else if (cfg.body === 'winged') body = `<path d="M44 92 C18 66 12 40 22 30 C44 40 58 44 70 62 C82 50 100 42 120 42 C140 42 158 50 170 62 C182 44 196 40 218 30 C228 40 222 66 196 92 C204 108 202 150 178 172 C154 194 86 194 62 172 C38 150 36 108 44 92Z" fill="url(#${u}w)" opacity=".9"/><path d="M120 40 C160 40 186 72 186 118 C186 160 158 192 120 192 C82 192 54 160 54 118 C54 72 80 40 120 40Z" fill="url(#${u}b)"/>`;
  /* shading + rim light */
  const shade = `<path d="M44 140 C60 176 90 196 120 196 C150 196 180 176 196 140 C186 186 156 206 120 206 C84 206 54 186 44 140Z" fill="#000" opacity=".28" style="mix-blend-mode:multiply"/>
    <ellipse cx="96" cy="72" rx="34" ry="20" fill="#fff" opacity=".13" transform="rotate(-18 96 72)"/>
    <path d="M52 128 C58 92 84 56 120 50" stroke="#fff" stroke-width="3" opacity=".14" fill="none" stroke-linecap="round"/>`;
  /* pattern */
  let pat = '';
  if (cfg.pattern === 'spots') pat = `<circle cx="78" cy="150" r="7" fill="#000" opacity=".16"/><circle cx="150" cy="158" r="9" fill="#000" opacity=".14"/><circle cx="120" cy="170" r="6" fill="#000" opacity=".16"/><circle cx="166" cy="120" r="6" fill="#fff" opacity=".1"/><circle cx="70" cy="108" r="8" fill="#000" opacity=".12"/>`;
  else if (cfg.pattern === 'runes') pat = `<path d="M92 158 l10 -14 10 14 M126 164 v-16 l9 8 9 -8 v16" stroke="#000" stroke-width="3" opacity=".2" fill="none" stroke-linecap="round"/><circle cx="120" cy="64" r="5" fill="#fff" opacity=".16"/>`;
  else if (cfg.pattern === 'crack') pat = `<path d="M84 60 l14 22 -8 16 M158 66 l-12 20 10 14 M120 150 l-8 22" stroke="#000" stroke-width="3" opacity=".28" fill="none" stroke-linecap="round"/>`;
  /* horns */
  let horns = '';
  if (cfg.horns === 'curved') horns = `<path d="M74 52 C58 40 50 24 54 12 C66 18 80 30 84 46Z" fill="url(#${u}g)" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/><path d="M166 52 C182 40 190 24 186 12 C174 18 160 30 156 46Z" fill="url(#${u}g)" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`;
  else if (cfg.horns === 'spike') horns = `<path d="M80 50 L68 8 L92 40Z" fill="url(#${u}g)"/><path d="M160 50 L172 8 L148 40Z" fill="url(#${u}g)"/><path d="M104 42 L104 16 L116 40Z" fill="url(#${u}g)" opacity=".85"/><path d="M136 42 L136 16 L124 40Z" fill="url(#${u}g)" opacity=".85"/>`;
  else if (cfg.horns === 'crown') horns = `<path d="M76 40 L84 12 L98 32 L110 8 L120 30 L130 8 L142 32 L156 12 L164 40 Z" fill="url(#${u}g)" stroke="#8A5A22" stroke-width="1.6"/>`;
  if (cfg.hat) horns = `<g transform="rotate(8 120 30)"><ellipse cx="120" cy="42" rx="58" ry="10" fill="#1A1626"/><path d="M88 44 C86 16 98 4 112 6 C134 8 148 20 150 44 Z" fill="#1A1626"/><path d="M88 40 C110 34 132 34 150 40" stroke="${P.glow}" stroke-width="5" fill="none" opacity=".8"/><rect x="86" y="38" width="66" height="7" rx="3.5" fill="${P.glow}"/></g>`;
  /* eyes */
  const eyeSvg = eyes.map(([x,y],i) => `<g class="meye" style="transform-box:fill-box;transform-origin:center;animation:mblink ${3.2 + i*0.4}s infinite">
    <circle cx="${x}" cy="${y}" r="15" fill="#0B0E18" opacity=".55"/>
    <circle cx="${x}" cy="${y}" r="11" fill="url(#${u}e)"/>
    <circle cx="${x}" cy="${y}" r="11" fill="none" stroke="#000" stroke-width="2" opacity=".4"/>
    <circle cx="${x}" cy="${y+1.5}" r="5" fill="#0B0E18"/>
    <circle cx="${x-2}" cy="${y-2.5}" r="1.8" fill="#fff"/>
  </g>`).join('');
  /* mouth */
  let mouth = '';
  if (cfg.mouth === 'fangs') mouth = `<path d="M96 148 C104 162 136 162 144 148 C140 158 132 162 120 162 C108 162 100 158 96 148Z" fill="#12060E"/><path d="M100 150 l5 9 4-8 M116 152 l4 9 5-9 M132 150 l4 8 4-7" fill="#F8F4EA"/><path d="M97 148 C106 156 134 156 143 148" stroke="#000" stroke-width="2" fill="none" opacity=".5"/>`;
  else if (cfg.mouth === 'grin') mouth = `<path d="M94 144 C102 166 138 166 146 144 C138 154 102 154 94 144Z" fill="#12060E" stroke="#000" stroke-width="2" opacity=".9"/><path d="M100 148 h10 M116 149 h10 M132 148 h8" stroke="#F8F4EA" stroke-width="3" stroke-linecap="round"/>`;
  else mouth = `<path d="M98 146 C106 152 134 152 142 146 C138 164 102 164 98 146Z" fill="#12060E"/><path d="M104 150 q4 8 0 12 M116 152 q4 9 0 14 M128 150 q4 8 0 12" stroke="${P.glow}" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>`;
  if (cfg.tentacles) parts += `<g fill="url(#${u}t)" stroke="rgba(0,0,0,.25)" stroke-width="1.4">
    <path class="mtent" style="animation:msway 3.4s ease-in-out infinite" d="M84 178 C64 196 40 198 26 186 C40 190 60 184 74 170Z" transform-origin="84px 178px"/>
    <path class="mtent" style="animation:msway 3.6s .3s ease-in-out infinite" d="M156 178 C176 196 200 198 214 186 C200 190 180 184 166 170Z" transform-origin="156px 178px"/>
    <path class="mtent" style="animation:msway 3.2s .6s ease-in-out infinite" d="M108 186 C102 204 88 214 72 214 C84 208 94 198 98 184Z" transform-origin="108px 186px"/>
    <path class="mtent" style="animation:msway 3.4s .15s ease-in-out infinite" d="M132 186 C138 204 152 214 168 214 C156 208 146 198 142 184Z" transform-origin="132px 186px"/>
  </g>`;
  if (cfg.wings && cfg.body !== 'winged') parts += `<path d="M60 92 C30 70 18 44 26 32 C46 44 62 52 76 74Z" fill="url(#${u}w)" opacity=".95"/><path d="M180 92 C210 70 222 44 214 32 C194 44 178 52 164 74Z" fill="url(#${u}w)" opacity=".95"/>`;
  if (cfg.crystals) parts += `<path d="M52 130 l-16 6 16 8Z" fill="${P.lt}" opacity=".9"/><path d="M188 130 l16 6 -16 8Z" fill="${P.lt}" opacity=".9"/><path d="M120 34 l-8 -16 8 -8 8 8Z" fill="${P.lt}" opacity=".9"/>`;
  if (cfg.rings) parts += `<ellipse cx="120" cy="120" rx="92" ry="26" fill="none" stroke="${P.glow}" stroke-width="4" opacity=".75" transform="rotate(-16 120 120)"/><ellipse cx="120" cy="120" rx="92" ry="26" fill="none" stroke="#fff" stroke-width="1.6" opacity=".4" transform="rotate(-16 120 120)"/>`;
  const svg = `<svg class="mon monart" width="${W}" height="${H}" viewBox="0 0 240 240">
  <defs>
    <radialGradient id="${u}b" cx=".38" cy=".3" r="1.05"><stop offset="0" stop-color="${P.lt}"/><stop offset=".55" stop-color="${P.mid}"/><stop offset="1" stop-color="${P.dk}"/></radialGradient>
    <radialGradient id="${u}e" cx=".4" cy=".35" r="1"><stop offset="0" stop-color="#FFF9E8"/><stop offset=".7" stop-color="${P.glow}"/><stop offset="1" stop-color="${P.mid}"/></radialGradient>
    <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD98F"/><stop offset=".6" stop-color="#C98D22"/><stop offset="1" stop-color="#7A5212"/></linearGradient>
    <linearGradient id="${u}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.mid}"/><stop offset="1" stop-color="${P.dk}"/></linearGradient>
    <linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.mid}"/><stop offset="1" stop-color="${P.dk}"/></linearGradient>
    <radialGradient id="${u}au" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${P.glow}" stop-opacity=".5"/><stop offset=".7" stop-color="${P.glow}" stop-opacity=".14"/><stop offset="1" stop-color="${P.glow}" stop-opacity="0"/></radialGradient>
    <filter id="${u}tx"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/><feColorMatrix in="n" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .1 0"/><feComposite operator="in" in2="SourceGraphic"/></filter>
  </defs>
  <ellipse cx="120" cy="216" rx="86" ry="14" fill="#000" opacity=".4"/>
  <circle cx="120" cy="118" r="104" fill="url(#${u}au)"/>
  ${parts}${body}${shade}${pat}${horns}${eyeSvg}${mouth}
  <rect x="30" y="20" width="180" height="190" filter="url(#${u}tx)" opacity=".5" style="pointer-events:none"/>
  </svg>
  <style>@keyframes mblink{0%,94%,100%{transform:scaleY(1)}96%,98%{transform:scaleY(.06)}}@keyframes msway{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}</style>`;
  return svg;
}
/* boss visual configs per world */
const BOSS_ART = {
  num:  { body:'tall',   eyes:3, mouth:'ooze',  horns:'spike',   pattern:'runes',  pal:{dk:'#0E4A46', mid:'#1E8C82', lt:'#3FCFC0', glow:'#7CF2E4'} },
  poly: { body:'winged', eyes:2, mouth:'grin',  horns:'crown',   pattern:'runes',  pal:{dk:'#5E3E07', mid:'#C98D22', lt:'#F2B441', glow:'#FFE09A'} },
  coord:{ body:'serpent',eyes:2, mouth:'fangs', horns:null,      pattern:'spots',  pal:{dk:'#123B70', mid:'#2E6FBF', lt:'#5CA8FF', glow:'#A8D4FF'} },
  lin:  { body:'chunk',  eyes:1, mouth:'ooze',  horns:'spike',   pattern:'crack',  pal:{dk:'#372A6E', mid:'#6450C4', lt:'#9B8CFF', glow:'#CFC5FF'} },
  geo:  { body:'tall',   eyes:2, mouth:'grin',  horns:'crown',   pattern:'crack',  pal:{dk:'#3E5510', mid:'#7DA82A', lt:'#A8D93F', glow:'#D9F59A'} },
  tri:  { body:'winged', eyes:3, mouth:'fangs', horns:'spike',   pattern:'spots',  pal:{dk:'#6E2420', mid:'#C24840', lt:'#FF7A6E', glow:'#FFB3A8'} },
  quad: { body:'chunk',  eyes:2, mouth:'grin',  horns:null,      pattern:'crack',  pal:{dk:'#6E4310', mid:'#C47722', lt:'#FFA04D', glow:'#FFCF9A'} },
  circ: { body:'blob',   eyes:1, mouth:'ooze',  horns:null,      pattern:'runes',  rings:true, pal:{dk:'#6E2150', mid:'#C24288', lt:'#F473B9', glow:'#FFB3D9'} },
  solid:{ body:'chunk',  eyes:2, mouth:'fangs', horns:null,      pattern:'crack',  crystals:true, pal:{dk:'#0F4E5E', mid:'#2291A8', lt:'#5FD9E8', glow:'#A8F0F8'} },
  data: { body:'blob',   eyes:2, mouth:'grin',  horns:'crown',   hat:true,         pattern:'spots',  pal:{dk:'#14522F', mid:'#2E9E5B', lt:'#4ED88E', glow:'#A0F2C4'} }
};

/* ============ ISLAND THUMBS ============ */
function islandArt(w, seed){
  const u = 'is' + w.id + seed;
  const C = w.color;
  const props = {
    num: `<path d="M96 74 C92 62 100 50 112 52 C124 54 128 66 122 74 C118 80 110 82 104 78" fill="none" stroke="${C}" stroke-width="5" stroke-linecap="round"/><circle cx="98" cy="88" r="4" fill="${C}"/>`,
    poly: `<rect x="96" y="60" width="12" height="12" rx="2" fill="${C}"/><rect x="108" y="48" width="12" height="12" rx="2" fill="${C}" opacity=".85"/><rect x="92" y="72" width="12" height="12" rx="2" fill="${C}" opacity=".7"/><rect x="104" y="72" width="12" height="12" rx="2" fill="${C}" opacity=".55"/>`,
    coord: `<path d="M86 84 L86 44 M74 58 L104 58" stroke="${C}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/><path d="M104 58 L104 44 L118 50 L104 56" fill="${C}"/>`,
    lin: `<path d="M78 84 L126 44" stroke="${C}" stroke-width="5" stroke-linecap="round"/><path d="M78 60 L126 60" stroke="${C}" stroke-width="3" stroke-linecap="round" opacity=".5"/><circle cx="106" cy="60" r="5" fill="#fff" opacity=".9"/>`,
    geo: `<path d="M88 84 L88 48 L122 84 Z" fill="none" stroke="${C}" stroke-width="4" stroke-linejoin="round"/><circle cx="88" cy="84" r="4" fill="${C}"/>`,
    tri: `<path d="M82 84 L106 42 L130 84 Z" fill="${C}"/><path d="M106 42 L130 84 L106 84 Z" fill="#000" opacity=".18"/>`,
    quad: `<rect x="86" y="50" width="34" height="34" rx="4" fill="none" stroke="${C}" stroke-width="4.5"/><path d="M86 50 L120 84 M120 50 L86 84" stroke="${C}" stroke-width="2.4" opacity=".55"/>`,
    circ: `<circle cx="105" cy="62" r="22" fill="none" stroke="${C}" stroke-width="5"/><circle cx="105" cy="62" r="4" fill="${C}"/><path d="M105 62 L121 50" stroke="${C}" stroke-width="3" stroke-linecap="round"/>`,
    solid: `<g><rect x="88" y="66" width="17" height="17" rx="2.5" fill="${C}"/><rect x="105" y="66" width="17" height="17" rx="2.5" fill="${C}" opacity=".8"/><rect x="96" y="49" width="17" height="17" rx="2.5" fill="${C}" opacity=".9"/></g>`,
    data: `<g fill="${C}"><rect x="86" y="70" width="8" height="14" rx="2" opacity=".7"/><rect x="96" y="58" width="8" height="26" rx="2"/><rect x="106" y="64" width="8" height="20" rx="2" opacity=".85"/><rect x="116" y="50" width="8" height="34" rx="2"/></g>`
  };
  return `<svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMax slice">
  <defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C}" stop-opacity=".34"/><stop offset="1" stop-color="${C}" stop-opacity="0"/></linearGradient>
  <radialGradient id="${u}sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C}" stop-opacity=".5"/><stop offset="1" stop-color="${C}" stop-opacity="0"/></radialGradient></defs>
  <circle cx="150" cy="26" r="30" fill="url(#${u}sun)"/>
  <circle cx="150" cy="26" r="9" fill="${C}" opacity=".85"/>
  <rect y="0" width="200" height="100" fill="url(#${u}s)"/>
  <path d="M0 78 Q25 72 50 78 T100 78 T150 78 T200 78 V100 H0 Z" fill="${C}" opacity=".16"/>
  <path d="M0 86 Q25 80 50 86 T100 86 T150 86 T200 86 V100 H0 Z" fill="${C}" opacity=".24"/>
  <path d="M56 84 C60 70 74 62 100 62 C126 62 142 70 146 84 Z" fill="#0B0F1A"/>
  <path d="M56 84 C60 70 74 62 100 62 C114 62 126 66 134 74 C120 70 84 70 64 80 Z" fill="${C}" opacity=".3"/>
  <g transform="translate(-2,0)">${props[w.id] || ''}</g>
  <path d="M60 88 q6 -4 12 0 M84 90 q6 -4 12 0 M116 90 q6 -4 12 0" stroke="#fff" stroke-width="2" opacity=".3" fill="none" stroke-linecap="round"/>
  </svg>`;
}
