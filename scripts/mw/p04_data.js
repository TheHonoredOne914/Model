/* ================================================================
   WORLDS DATA + HERO (Dhruva) + BOSSES
   ================================================================ */
const WORLDS=[
{id:0,name:'Isla Numbra',real:'Number Systems',color:'#2FB8A0',soft:'#DFF5F0',dark:'#1E8C79',icon:'🏝️',emoji:'🔢',
 tagline:'Bridges built from numbers',
 story:'The bridges of Isla Numbra are built from numbers. The serpent <b>Irrationalis</b> snapped every "rational" bridge and hid the ones that go on forever. Cross the island by walking the number line — meet fractions, decimals, and the wild √2.',
 concepts:['Rational ↔ Irrational','√2 lives between 1.41 and 1.42','Simplifying surds','Rationalising the denominator','Recurring decimals = fractions'],
 boss:'Irrationalis',bossTag:'The Endless Serpent',
 taunt:'Ssssso… you think every number ends? My tail goes on FOREVER.'},
{id:1,name:'The PolyForge',real:'Polynomials',color:'#FFAF3C',soft:'#FFF1DA',dark:'#D98A1B',icon:'🌋',emoji:'🧱',
 tagline:'A volcano forge of a\u2019s and b\u2019s',
 story:'Inside this volcano, machines forge squares out of metal bars of length <b>a</b> and <b>b</b>. Baron Binomial jammed the great Identity Gear — the one that proves <b>(a+b)² = a² + 2ab + b²</b> without any formula. Crank it back to life.',
 concepts:['(a+b)² is a PICTURE, not a formula','a² + 2ab + b² — 4 pieces of the square','Degree of a polynomial','Zeroes of p(x) = where the graph hits ground','Remainder theorem'],
 boss:'Baron Binomial',bossTag:'Golem of the Forge',
 taunt:'FORMULAS are for the weak. I CRUSH memorisers. Show me you SEE the square.'},
{id:2,name:'Cartesia Isles',real:'Coordinate Geometry',color:'#5EB8FF',soft:'#E3F1FF',dark:'#2F7CC0',icon:'🧭',emoji:'🗺️',
 tagline:'Every island has an address (x, y)',
 story:'A maze of 1000 islands — but every single one has an exact address: <b>(x, y)</b>. Admiral Axis stole the map\u2019s legend. Learn to read the grid like a captain and treasure is yours.',
 concepts:['x-axis, y-axis & the Origin (0,0)','4 quadrants — the signs (+,+), (−,+), (−,−), (+,−)','Plotting points like a captain','Distance on the grid','Midpoint = the average spot'],
 boss:'Admiral Axis',bossTag:'Squid of the Grid',
 taunt:'Eight arms, eight directions, zero mercy. Can you even FIND yourself on my grid?'},
{id:3,name:'Twin River Lines',real:'Linear Equations',color:'#3E8FD6',soft:'#E3F1FF',dark:'#2B6CA8',icon:'🛶',emoji:'📈',
 tagline:'Rivers that are secretly straight lines',
 story:'Two rivers flow forever and never meet — or do they? Every rickshaw fare, every recharge plan, every river here hides an equation <b>ax + by = c</b>. Ride the line, find where rivers cross.',
 concepts:['ax + by = c — every point on it is a solution','Infinity of solutions','y = mx + c → m is the STEEPNESS','Rickshaw fare = base + rate × km','Where two lines meet = the answer'],
 boss:'Flood Fiend',bossTag:'The Rising Equation',
 taunt:'I am y = mx + c and I RISE without stopping. Solve me or drown in variables.'},
{id:4,name:'Angle Arena',real:"Euclid's Geometry · Lines & Angles",color:'#FF7B6B',soft:'#FFE6E2',dark:'#E05544',icon:'⚔️',emoji:'📐',
 tagline:'Gladiator rays clash at a point',
 story:"Euclid built this colosseum 2300 years ago from just <b>5 simple truths</b>. Inside, gladiator rays fight at a point — and the Obtuse Ogre bends every angle. Learn the arena laws: linear pair, vertically opposite, parallel rules.",
 concepts:["Euclid's axioms = tiny truths, huge results",'Linear pair: angles on a line add to 180°','Vertically opposite angles are ALWAYS equal','Transversal rules on parallel lines','Triangle: angles always sum to 180°'],
 boss:'Obtuse Ogre',bossTag:'Stone Bender of Angles',
 taunt:'I bend angles for breakfast. 179°, 181°… I make math UGLY. Fix it, if you can.'},
{id:5,name:'Triangulum Ridge',real:'Triangles · Heron\u2019s Formula',color:'#7BC86C',soft:'#E9F7E5',dark:'#4E9642',icon:'🏔️',emoji:'🔺',
 tagline:'Only congruent heroes reach the peak',
 story:'Crystal peaks, all shaped like triangles. Sir Scalene challenges every climber: <b>prove you\u2019re congruent to a hero</b>. SSS, SAS, ASA, RHS — pick your proof. And Heron\u2019s formula measures any peak, no height needed.',
 concepts:['Congruence = exact same shape & size','SSS · SAS · ASA · RHS rules','Isosceles → base angles equal','Heron\u2019s formula: area from 3 sides','CPCT: Corresponding Parts of Congruent Triangles'],
 boss:'Sir Scalene',bossTag:'Triple-Bladed Knight',
 taunt:'No two of my sides match, no two of my blades match. Which rule will "save" you — SSS or SAS?'},
{id:6,name:'Circora & Quadra',real:'Circles · Quadrilaterals',color:'#9B7BDE',soft:'#EFE9FB',dark:'#7452B8',icon:'🎡',emoji:'⭕',
 tagline:'Ring temples & kite bazaars',
 story:'Floating ring temples spin above a bazaar of kites and tiles. The <b>Pi-Rate King</b> locked every circle\u2019s secret inside a dial: turn it, watch π appear from circumference ÷ diameter. Kite-sellers guard the quadrilateral gates.',
 concepts:['Circumference = π × diameter','Area = πr² — SEE it fill with squares','Diameter = 2 × radius','Angle in a semicircle = 90°','Parallelogram: opposite sides & angles equal'],
 boss:'Pi-Rate King',bossTag:'Thief of the Sacred Ratio',
 taunt:'Yo-ho! I stole π itself — 3.14159… pieces of eight! Sail the circle if you dare.'},
{id:7,name:'Datastorm Vault',real:'Statistics · Probability',color:'#E8A23C',soft:'#FFF1DA',dark:'#B87716',icon:'🎲',emoji:'📊',
 tagline:'A casino where dice rain from clouds',
 story:'A storm of dice, cards and cricket scores howls around the Data Vault. <b>Lady Chance</b> bets you can\u2019t read the storm: mean, median, mode… and why "favourable outcomes ÷ total" decides everything.',
 concepts:['Mean = add ÷ count','Median = the middle (line them up!)','Mode = the most frequent','Probability = favourable ÷ total','Probability of sure thing = 1, impossible = 0'],
 boss:'Lady Chance',bossTag:'Witch of the Dice Storm',
 taunt:'Fifty-fifty, sweetheart. Either you know your data… or the storm eats your streak.'}
];

/* ---------------- DHRUVA HERO SVG ---------------- */
function heroSVG(w){return `
<svg viewBox="0 0 200 240" width="${w||'100%'}" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <linearGradient id="hg-cape" x1="0" y1="0" x2="1" y2="1">
   <stop offset="0" stop-color="#FF9A3C"/><stop offset="1" stop-color="#F0742E"/></linearGradient>
  <linearGradient id="hg-skin" x1="0" y1="0" x2="0" y2="1">
   <stop offset="0" stop-color="#D99B6C"/><stop offset="1" stop-color="#C07E4E"/></linearGradient>
  <linearGradient id="hg-kurta" x1="0" y1="0" x2="0" y2="1">
   <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E8E4DC"/></linearGradient>
 </defs>
 <g class="f-idle">
  <ellipse cx="100" cy="228" rx="46" ry="8" fill="rgba(43,36,56,.12)"/>
  <path class="floaty" d="M56 96 Q30 150 44 200 Q72 188 82 168 L84 120 Z" fill="url(#hg-cape)"/>
  <path class="floaty" d="M144 96 Q170 150 156 200 Q128 188 118 168 L116 120 Z" fill="url(#hg-cape)"/>
  <rect x="72" y="176" width="22" height="40" rx="10" fill="#3E5AA8"/>
  <rect x="106" y="176" width="22" height="40" rx="10" fill="#3E5AA8"/>
  <ellipse cx="80" cy="219" rx="16" ry="7" fill="#2B2438"/>
  <ellipse cx="120" cy="219" rx="16" ry="7" fill="#2B2438"/>
  <path d="M64 108 Q100 92 136 108 L140 180 Q100 192 60 180 Z" fill="url(#hg-kurta)" stroke="#D8D2C6" stroke-width="1.5"/>
  <path d="M100 104 L100 186" stroke="#2FB8A0" stroke-width="2.4"/>
  <path d="M64 108 Q100 122 136 108" fill="none" stroke="#2FB8A0" stroke-width="3" stroke-linecap="round"/>
  <circle cx="118" cy="150" r="11" fill="#FFAF3C" opacity=".95"/>
  <text x="118" y="155" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="15" fill="#7A4A00">π</text>
  <rect x="130" y="150" width="8" height="42" rx="3.5" fill="#FFD34D" transform="rotate(24 134 171)"/>
  <path d="M136 192 L140 200 L131 196 Z" fill="#3C3C46" transform="rotate(24 134 171)"/>
  <rect x="127" y="146" width="9" height="8" rx="2.5" fill="#FF8FA3" transform="rotate(24 134 171)"/>
  <circle cx="100" cy="66" r="34" fill="url(#hg-skin)"/>
  <path d="M66 60 Q68 26 100 24 Q132 26 134 60 Q126 42 100 40 Q74 42 66 60 Z" fill="#241D2E"/>
  <path d="M70 46 Q84 28 106 32" stroke="#241D2E" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="87" cy="66" r="7.5" fill="#fff"/><circle cx="113" cy="66" r="7.5" fill="#fff"/>
  <circle cx="88.5" cy="67" r="3.6" fill="#241D2E"/><circle cx="114.5" cy="67" r="3.6" fill="#241D2E"/>
  <circle cx="90" cy="65.6" r="1.2" fill="#fff"/><circle cx="116" cy="65.6" r="1.2" fill="#fff"/>
  <path d="M80 56 Q87 52 93 56" stroke="#241D2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M107 56 Q114 52 120 56" stroke="#241D2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M90 84 Q100 92 110 84" stroke="#8A4B22" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="78" cy="78" r="4" fill="#E88A5A" opacity=".55"/><circle cx="122" cy="78" r="4" fill="#E88A5A" opacity=".55"/>
 </g>
</svg>`}

/* ---------------- BOSS SVG BUILDERS ---------------- */
function bossSVG(id){
 const defs=(p,stops)=>`<defs><linearGradient id="${p}g" x1="0" y1="0" x2="0" y2="1">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('')}</linearGradient></defs>`;
 const eyes=(x1,x2,y,r,c='#FFD34D',c2='#FF7B6B')=>`
   <circle cx="${x1}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#fff"/>
   <circle cx="${x1}" cy="${y+1}" r="${r*.5}" fill="${c}"/><circle cx="${x2}" cy="${y+1}" r="${r*.5}" fill="${c}"/>
   <circle cx="${x1-1}" cy="${y-1}" r="${r*.16}" fill="#fff"/><circle cx="${x2-1}" cy="${y-1}" r="${r*.16}" fill="#fff"/>
   <circle cx="${x1}" cy="${y}" r="${r+4}" fill="none" stroke="${c2}" stroke-width="1.6" opacity=".45"/>`;
 switch(id){
 case 0: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b0',[[0,'#6C5CE7'],[1,'#3D2E8C']])}
  <ellipse cx="100" cy="184" rx="52" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M40 170 Q20 140 42 118 Q66 96 52 66" stroke="url(#b0g)" stroke-width="17" fill="none" stroke-linecap="round" opacity=".9"/>
   <circle cx="52" cy="62" r="4" fill="#9B8CFF" opacity=".7"/><circle cx="34" cy="130" r="3" fill="#9B8CFF" opacity=".6"/><circle cx="44" cy="152" r="2.6" fill="#9B8CFF" opacity=".5"/>
   <path d="M148 170 Q176 142 154 116 Q128 88 150 54 Q130 76 138 96 Q150 122 128 138 Q112 152 126 170 Z" fill="url(#b0g)" opacity=".85"/>
   <ellipse cx="100" cy="120" rx="58" ry="52" fill="url(#b0g)"/>
   <path d="M52 108 Q100 74 148 108 Q136 88 100 86 Q64 88 52 108 Z" fill="#8A7BF0" opacity=".55"/>
   <path d="M70 148 Q100 168 130 148" stroke="#241D40" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M84 142 L88 152 M100 146 L100 156 M116 142 L112 152" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
   ${eyes(80,120,104,10,'#CFFFE0','#7BFFB0')}
   <path d="M66 88 L80 82 M134 88 L120 82" stroke="#241D40" stroke-width="5" stroke-linecap="round"/>
   <text x="30" y="60" font-family="Baloo 2" font-weight="800" font-size="15" fill="#9B8CFF" opacity=".85">√2</text>
   <text x="160" y="88" font-family="Baloo 2" font-weight="800" font-size="13" fill="#9B8CFF" opacity=".8">0.10110…</text>
   <text x="150" y="40" font-family="Baloo 2" font-weight="800" font-size="15" fill="#B3A6FF" opacity=".9">π</text>
  </g></svg>`;
 case 1: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b1',[[0,'#8B8FA3'],[1,'#4E5468']])}
  <ellipse cx="100" cy="186" rx="56" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <rect x="86" y="150" width="12" height="30" fill="#3C4152"/><rect x="102" y="150" width="12" height="30" fill="#3C4152"/>
   <rect x="80" y="176" width="22" height="9" rx="4" fill="#2E3342"/><rect x="98" y="176" width="22" height="9" rx="4" fill="#2E3342"/>
   <rect x="52" y="66" width="96" height="88" rx="14" fill="url(#b1g)" stroke="#39405A" stroke-width="2.5"/>
   <rect x="64" y="80" width="72" height="34" rx="7" fill="#39405A"/>
   <text x="100" y="103" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="19" fill="#FFD34D">(a+b)²</text>
   <circle cx="62" cy="78" r="2.4" fill="#7B839C"/><circle cx="138" cy="78" r="2.4" fill="#7B839C"/><circle cx="62" cy="142" r="2.4" fill="#7B839C"/><circle cx="138" cy="142" r="2.4" fill="#7B839C"/>
   <rect x="24" y="70" width="26" height="46" rx="12" fill="#5B6178"/><rect x="150" y="70" width="26" height="46" rx="12" fill="#5B6178"/>
   <circle cx="37" cy="124" r="14" fill="#6B7290"/><circle cx="163" cy="124" r="14" fill="#6B7290"/>
   <rect x="66" y="34" width="68" height="44" rx="12" fill="#6B7290" stroke="#39405A" stroke-width="2.5"/>
   ${eyes(84,116,54,7.5,'#FFD34D','#FF7B6B')}
   <path d="M86 68 Q100 74 114 68" stroke="#242A3E" stroke-width="3.4" fill="none" stroke-linecap="round"/>
   <path d="M70 40 L74 34 M100 36 L100 29 M130 40 L126 34" stroke="#FFD34D" stroke-width="3" stroke-linecap="round"/>
  </g></svg>`;
 case 2: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b2',[[0,'#4EA9E0'],[1,'#22518F']])}
  <ellipse cx="100" cy="186" rx="54" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M62 140 Q46 168 30 160 Q44 150 40 138 Q52 146 58 136 Z" fill="#2C6DB8"/>
   <path d="M100 142 Q100 176 82 182 Q94 164 88 148 Z" fill="#2C6DB8"/>
   <path d="M138 140 Q154 168 170 160 Q156 150 160 138 Q148 146 142 136 Z" fill="#2C6DB8"/>
   <ellipse cx="100" cy="100" rx="54" ry="50" fill="url(#b2g)"/>
   <path d="M50 88 Q100 56 150 88 Q132 70 100 70 Q68 70 50 88 Z" fill="#7CC4F0" opacity=".6"/>
   <circle cx="100" cy="102" r="17" fill="#fff"/><circle cx="100" cy="103" r="9" fill="#1E3A66"/><circle cx="96" cy="98" r="3.2" fill="#fff"/>
   <path d="M46 66 L154 66 L138 46 L62 46 Z" fill="#39405A"/>
   <rect x="88" y="28" width="24" height="20" rx="4" fill="#39405A"/>
   <circle cx="100" cy="38" r="8" fill="#FFD34D"/>
   <path d="M100 32 L100 44 M94 38 L106 38" stroke="#39405A" stroke-width="2"/>
   <text x="58" y="86" font-family="Baloo 2" font-weight="800" font-size="13" fill="#BDE3FF">x</text>
   <text x="136" y="86" font-family="Baloo 2" font-weight="800" font-size="13" fill="#BDE3FF">y</text>
  </g></svg>`;
 case 3: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b3',[[0,'#37B6C9'],[1,'#16628F']])}
  <ellipse cx="100" cy="186" rx="56" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M42 170 Q54 150 46 128 Q68 140 66 158 Q76 150 74 134 Q92 148 88 170 Z" fill="#1F7FA8" opacity=".85"/>
   <path d="M158 170 Q146 150 154 128 Q132 140 134 158 Q124 150 126 134 Q108 148 112 170 Z" fill="#1F7FA8" opacity=".85"/>
   <path d="M44 168 Q36 110 74 84 Q100 68 126 84 Q164 110 156 168 Q100 182 44 168 Z" fill="url(#b3g)"/>
   <path d="M56 150 Q74 136 70 116 Q90 128 86 148" stroke="#8FE3F0" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>
   <path d="M144 150 Q126 136 130 116 Q110 128 114 148" stroke="#8FE3F0" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>
   <text x="70" y="126" font-family="Baloo 2" font-weight="800" font-size="15" fill="#D6F6FF">y=mx+c</text>
   ${eyes(82,118,92,9,'#CFFFE0','#7BFFB0')}
   <path d="M84 112 Q100 124 116 112" stroke="#0D4A66" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M92 58 L100 44 L108 58 L100 66 Z" fill="#8FE3F0"/>
   <circle cx="78" cy="66" r="4" fill="#8FE3F0"/><circle cx="122" cy="66" r="4" fill="#8FE3F0"/>
  </g></svg>`;
 case 4: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b4',[[0,'#A08B72'],[1,'#5C4A38']])}
  <ellipse cx="100" cy="186" rx="58" ry="10" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M30 84 L54 54 L64 88 Z" fill="#6B563F"/><path d="M170 84 L146 54 L136 88 Z" fill="#6B563F"/>
   <path d="M40 170 Q30 100 66 76 Q100 58 134 76 Q170 100 160 170 Q100 184 40 170 Z" fill="url(#b4g)"/>
   <path d="M70 120 L84 112 M116 120 L130 128 M78 150 L94 144" stroke="#3E3122" stroke-width="2.4" opacity=".6"/>
   <rect x="70" y="138" width="60" height="22" rx="8" fill="#4A3A2A"/>
   <text x="100" y="154" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="13" fill="#FFD34D">180°</text>
   <path d="M58 96 Q74 86 92 94" stroke="#2E2418" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M142 96 Q126 86 108 94" stroke="#2E2418" stroke-width="5" fill="none" stroke-linecap="round"/>
   ${eyes(76,124,108,9,'#FFB84C','#FF7B6B')}
   <path d="M78 130 L86 136 M100 132 L100 140 M122 130 L114 136" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g></svg>`;
 case 5: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b5',[[0,'#79C46A'],[1,'#2E7A3C']])}
  <ellipse cx="100" cy="186" rx="54" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M100 52 L64 74 L70 108 L84 102 L78 132 L100 122 Z" fill="#3E8F4C"/>
   <path d="M100 52 L136 74 L130 108 L116 102 L122 132 L100 122 Z" fill="#356F40"/>
   <circle cx="100" cy="94" r="40" fill="url(#b5g)" stroke="#245631" stroke-width="2.5"/>
   <path d="M68 78 L100 94 L68 110 Z" fill="#FFD34D" opacity=".9"/>
   <text x="76" y="99" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="11" fill="#5B3A00">60°</text>
   ${eyes(88,112,90,7,'#CFFFE0','#7BFFB0')}
   <path d="M88 112 Q100 120 112 112" stroke="#173F22" stroke-width="3.4" fill="none" stroke-linecap="round"/>
   <rect x="118" y="60" width="34" height="7" rx="3.5" fill="#39405A" transform="rotate(38 135 64)"/>
   <rect x="122" y="36" width="26" height="26" rx="5" fill="#5B6178" transform="rotate(38 135 49)"/>
   <circle cx="60" cy="140" r="12" fill="#6B4A2E"/><circle cx="140" cy="140" r="12" fill="#6B4A2E"/>
  </g></svg>`;
 case 6: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b6',[[0,'#B295EC'],[1,'#5F3FA8']])}
  <ellipse cx="100" cy="186" rx="54" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M56 44 Q100 24 144 44 L150 62 Q100 44 50 62 Z" fill="#2E2440"/>
   <circle cx="100" cy="52" r="9" fill="#FFD34D"/>
   <circle cx="100" cy="106" r="50" fill="url(#b6g)" stroke="#3E2A6E" stroke-width="2.5"/>
   <circle cx="100" cy="106" r="40" fill="none" stroke="#8F75D6" stroke-width="1.6" stroke-dasharray="5 6" opacity=".7"/>
   <circle cx="84" cy="98" r="9" fill="#fff"/><circle cx="84" cy="99" r="4.4" fill="#2E2440"/>
   <path d="M108 92 L124 92 L124 110 L116 110" stroke="#2E2440" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M84 124 Q100 134 116 124" stroke="#2E2440" stroke-width="3.6" fill="none" stroke-linecap="round"/>
   <rect x="142" y="118" width="34" height="9" rx="4.5" fill="#39405A" transform="rotate(-30 159 122)"/>
   <circle cx="150" cy="132" r="9" fill="none" stroke="#FFD34D" stroke-width="3" transform="rotate(-30 159 122)"/>
   <text x="100" y="86" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="16" fill="#FFD34D">π</text>
   <circle cx="52" cy="150" r="13" fill="#E8A23C"/><text x="52" y="155" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="13" fill="#5B3A00">22/7</text>
  </g></svg>`;
 case 7: return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs('b7',[[0,'#F0A94C'],[1,'#8F5A14']])}
  <ellipse cx="100" cy="186" rx="54" ry="9" fill="rgba(0,0,0,.3)"/>
  <g class="f-idle">
   <path d="M46 168 Q30 90 72 62 Q100 46 128 62 Q170 90 154 168 Q100 182 46 168 Z" fill="url(#b7g)"/>
   <path d="M66 92 Q100 74 134 92" stroke="#5B3A00" stroke-width="4" fill="none" opacity=".4"/>
   <circle cx="100" cy="58" r="26" fill="#4A2E10"/>
   <ellipse cx="100" cy="72" rx="20" ry="14" fill="#C68E4E"/>
   ${eyes(92,108,72,5.5,'#FFE08A','#FF7B6B')}
   <path d="M92 84 Q100 89 108 84" stroke="#3E2408" stroke-width="2.6" fill="none" stroke-linecap="round"/>
   <g class="wiggle"><rect x="128" y="96" width="34" height="34" rx="6" fill="#fff" stroke="#5B3A00" stroke-width="2.5" transform="rotate(12 145 113)"/>
   <circle cx="137" cy="107" r="2.6" fill="#5B3A00" transform="rotate(12 145 113)"/><circle cx="153" cy="123" r="2.6" fill="#5B3A00" transform="rotate(12 145 113)"/><circle cx="153" cy="107" r="2.6" fill="#5B3A00" transform="rotate(12 145 113)"/><circle cx="137" cy="123" r="2.6" fill="#5B3A00" transform="rotate(12 145 113)"/><circle cx="145" cy="115" r="2.6" fill="#FF7B6B" transform="rotate(12 145 113)"/></g>
   <text x="66" y="130" font-family="Baloo 2" font-weight="800" font-size="17" fill="#FFD34D">½</text>
   <circle cx="70" cy="146" r="4" fill="#FFD34D" opacity=".8"/><circle cx="132" cy="146" r="4" fill="#FFD34D" opacity=".8"/>
  </g></svg>`;}
 return ''}
