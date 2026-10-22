<script>
'use strict';
/* ================= BOSS ART FACTORY · 12 refined monsters ================= */
let _bid=0;
function eye(cx,cy,rx,ry,col,pupil,glint){
 const id='eg'+(++_bid);
 return '<defs><radialGradient id="'+id+'"><stop offset="0%" stop-color="#fff"/><stop offset="55%" stop-color="'+col+'"/><stop offset="100%" stop-color="'+col+'"/></radialGradient></defs>'
 +'<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="url(#'+id+')" stroke="rgba(0,0,0,.35)" stroke-width="1.5" style="animation:blink 4.6s '+(Math.random()*2).toFixed(1)+'s infinite;transform-box:fill-box;transform-origin:center"/>'
 +'<circle cx="'+cx+'" cy="'+cy+'" r="'+Math.min(rx,ry)*0.42+'" fill="'+pupil+'"/>'
 +'<circle cx="'+(cx+rx*0.22)+'" cy="'+(cy-ry*0.28)+'" r="'+Math.min(rx,ry)*0.16+'" fill="#fff" opacity=".92"/>';
}
function bodyGrad(id,c){
 return '<defs><radialGradient id="'+id+'" cx="38%" cy="30%" r="80%">'
 +'<stop offset="0%" stop-color="'+c[2]+'"/><stop offset="55%" stop-color="'+c[1]+'"/><stop offset="100%" stop-color="'+c[0]+'"/></radialGradient></defs>';
}
function bossSVG(art,sz){
 sz=sz||120;const id='bg'+(++_bid);let inner='';
 switch(art){
  case 'orb':
   inner=bodyGrad(id,['#2e1065','#7c3aed','#c4b5fd'])
   +'<ellipse cx="100" cy="186" rx="46" ry="9" fill="rgba(0,0,0,.35)"/>'
   +'<circle cx="100" cy="95" r="62" fill="url(#'+id+')"/>'
   +'<ellipse cx="82" cy="70" rx="20" ry="12" fill="rgba(255,255,255,.35)"/>'
   +'<circle cx="100" cy="95" r="62" fill="none" stroke="rgba(196,181,253,.5)" stroke-width="2"/>'
   +'<path d="M 70 115 Q 100 145 130 115 Q 100 158 70 115 Z" fill="#1e1b4b"/>'
   +'<path d="M 78 118 L 84 126 L 90 118 L 96 126 L 102 118 L 108 126 L 114 118 L 120 125" stroke="#fff" stroke-width="2.5" fill="none"/>'
   +eye(84,88,11,13,'#fbbf24','#7c2d12')+eye(118,88,11,13,'#fbbf24','#7c2d12')
   +'<path d="M 52 60 Q 30 40 44 22 Q 52 44 62 52 Z" fill="#4c1d95"/><path d="M 148 60 Q 170 40 156 22 Q 148 44 138 52 Z" fill="#4c1d95"/>';
   break;
  case 'crystal':
   inner=bodyGrad(id,['#4c0519','#be123c','#fda4af'])
   +'<ellipse cx="100" cy="186" rx="42" ry="8" fill="rgba(0,0,0,.35)"/>'
   +'<path d="M 100 18 L 138 62 L 128 128 L 100 168 L 72 128 L 62 62 Z" fill="url(#'+id+')" stroke="rgba(254,205,211,.6)" stroke-width="2"/>'
   +'<path d="M 100 18 L 100 168 M 62 62 L 128 128 M 138 62 L 72 128" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>'
   +'<path d="M 78 48 L 88 34 L 96 50 Z" fill="rgba(255,255,255,.45)"/>'
   +eye(86,92,10,12,'#fecdd3','#881337')+eye(114,92,10,12,'#fecdd3','#881337')
   +'<path d="M 82 122 L 100 134 L 118 122 L 100 148 Z" fill="#4c0519"/>'
   +'<path d="M 40 84 L 62 66 L 58 92 Z" fill="#9f1239"/><path d="M 160 84 L 138 66 L 142 92 Z" fill="#9f1239"/>';
   break;
  case 'golem':
   inner=bodyGrad(id,['#1e1b4b','#4338ca','#a5b4fc'])
   +'<ellipse cx="100" cy="188" rx="50" ry="9" fill="rgba(0,0,0,.4)"/>'
   +'<rect x="46" y="66" width="108" height="108" rx="18" fill="url(#'+id+')" stroke="rgba(165,180,252,.5)" stroke-width="2"/>'
   +'<rect x="60" y="40" width="80" height="40" rx="12" fill="url(#'+id+')" stroke="rgba(165,180,252,.5)" stroke-width="2"/>'
   +'<path d="M 60 120 h 24 M 110 100 h 26 M 70 150 h 30 M 120 140 h 20" stroke="#facc15" stroke-width="3" stroke-linecap="round" opacity=".8"/>'
   +'<path d="M 30 96 l -16 -10 l 6 22 Z" fill="#312e81"/><path d="M 170 96 l 16 -10 l -6 22 Z" fill="#312e81"/>'
   +eye(80,58,10,11,'#fde68a','#78350f')+eye(120,58,10,11,'#fde68a','#78350f')
   +'<path d="M 78 88 h 44" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round"/>';
   break;
  case 'golem2':
   inner=bodyGrad(id,['#451a03','#b45309','#fcd34d'])
   +'<ellipse cx="100" cy="188" rx="50" ry="9" fill="rgba(0,0,0,.4)"/>'
   +'<path d="M 48 174 L 60 84 Q 100 62 140 84 L 152 174 Z" fill="url(#'+id+')" stroke="rgba(252,211,77,.5)" stroke-width="2"/>'
   +'<rect x="62" y="44" width="76" height="48" rx="10" fill="url(#'+id+')" stroke="rgba(252,211,77,.5)" stroke-width="2"/>'
   +'<path d="M 74 128 L 126 128 M 66 148 L 134 148" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>'
   +'<rect x="82" y="158" width="36" height="18" rx="4" fill="#fde68a" stroke="#b45309" stroke-width="2"/><path d="M 88 164 h 24 M 88 170 h 18" stroke="#b45309" stroke-width="1.6"/>'
   +eye(82,64,9,11,'#fef3c7','#78350f')+eye(118,64,9,11,'#fef3c7','#78350f')
   +'<path d="M 80 84 q 20 12 40 0" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>';
   break;
  case 'serpent':
   inner=bodyGrad(id,['#172554','#1d4ed8','#93c5fd'])
   +'<ellipse cx="100" cy="190" rx="52" ry="8" fill="rgba(0,0,0,.4)"/>'
   +'<path d="M 100 186 C 52 180 50 130 84 118 C 118 106 140 140 118 156 C 100 168 78 156 92 142" fill="none" stroke="url(#'+id+')" stroke-width="26" stroke-linecap="round"/>'
   +'<path d="M 100 186 C 52 180 50 130 84 118" fill="none" stroke="rgba(147,197,253,.4)" stroke-width="6" stroke-linecap="round"/>'
   +'<ellipse cx="112" cy="66" rx="30" ry="24" fill="url(#'+id+')" stroke="rgba(147,197,253,.5)" stroke-width="2"/>'
   +'<path d="M 132 70 l 22 4 l -22 6 Z" fill="#dc2626"/><path d="M 134 80 l 16 2 l -16 5 Z" fill="#f87171"/>'
   +eye(102,58,8,10,'#fde047','#713f12')+eye(124,58,8,10,'#fde047','#713f12')
   +'<path d="M 88 108 q 12 -14 24 0" stroke="#172554" stroke-width="3" fill="none"/>';
   break;
  case 'spider':
   inner=bodyGrad(id,['#431407','#c2410c','#fed7aa'])
   +'<ellipse cx="100" cy="188" rx="46" ry="8" fill="rgba(0,0,0,.4)"/>'
   +'<ellipse cx="100" cy="120" rx="52" ry="46" fill="url(#'+id+')" stroke="rgba(254,215,170,.5)" stroke-width="2"/>'
   +'<path d="M 48 108 Q 10 84 22 56 Q 40 88 66 96 M 152 108 Q 190 84 178 56 Q 160 88 134 96 M 54 140 Q 20 150 14 172 M 146 140 Q 180 150 186 172" stroke="#7c2d12" stroke-width="7" fill="none" stroke-linecap="round"/>'
   +'<path d="M 66 74 L 78 42 L 90 70 L 100 36 L 110 70 L 122 42 L 134 74 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>'
   +eye(84,108,10,12,'#fff7ed','#7c2d12')+eye(116,108,10,12,'#fff7ed','#7c2d12')
   +'<circle cx="100" cy="92" r="5" fill="#fbbf24"/>'
   +'<path d="M 78 138 Q 100 156 122 138" stroke="#431407" stroke-width="4" fill="none"/>'
   +'<path d="M 84 138 l 6 10 l 6 -10 M 104 138 l 6 10 l 6 -10" stroke="#fff" stroke-width="2.4" fill="none"/>';
   break;
  case 'brute':
   inner=bodyGrad(id,['#500724','#db2777','#fbcfe8'])
   +'<ellipse cx="100" cy="188" rx="52" ry="9" fill="rgba(0,0,0,.4)"/>'
   +'<path d="M 42 172 Q 38 96 100 88 Q 162 96 158 172 Q 100 190 42 172 Z" fill="url(#'+id+')" stroke="rgba(251,207,232,.5)" stroke-width="2"/>'
   +'<path d="M 60 92 Q 44 44 66 26 Q 74 62 84 78 Z" fill="#fbcfe8"/><path d="M 140 92 Q 156 44 134 26 Q 126 62 116 78 Z" fill="#fbcfe8"/>'
   +eye(74,120,13,15,'#fde68a','#713f12')+eye(100,108,15,17,'#fde68a','#713f12')+eye(126,120,13,15,'#fde68a','#713f12')
   +'<path d="M 68 152 Q 100 176 132 152 L 126 168 Q 100 182 74 168 Z" fill="#500724"/>'
   +'<path d="M 78 156 l 6 9 l 6 -9 l 6 9 l 6 -9 l 6 9 l 6 -9" stroke="#fff" stroke-width="2.4" fill="none"/>'
   +'<path d="M 30 132 l -18 6 l 16 10 Z" fill="#9d174d"/><path d="M 170 132 l 18 6 l -16 10 Z" fill="#9d174d"/>';
   break;
  case 'brute2':
   inner=bodyGrad(id,['#1e1b4b','#4f46e5','#c7d2fe'])
   +'<ellipse cx="100" cy="188" rx="54" ry="9" fill="rgba(0,0,0,.4)"/>'
   +'<path d="M 44 176 L 52 100 Q 100 78 148 100 L 156 176 Q 100 194 44 176 Z" fill="url(#'+id+')" stroke="rgba(199,210,254,.5)" stroke-width="2"/>'
   +'<rect x="64" y="46" width="72" height="44" rx="12" fill="url(#'+id+')" stroke="rgba(199,210,254,.5)" stroke-width="2"/>'
   +'<path d="M 36 120 L 8 108 L 14 132 Z" fill="#3730a3"/><path d="M 164 120 L 192 108 L 186 132 Z" fill="#3730a3"/>'
   +'<path d="M 84 122 h 32 M 78 146 h 44" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round"/>'
   +eye(82,66,10,12,'#a5f3fc','#164e63')+eye(118,66,10,12,'#a5f3fc','#164e63')
   +'<path d="M 72 90 q 28 16 56 0" stroke="#1e1b4b" stroke-width="4" fill="none" stroke-linecap="round"/>';
   break;
  case 'ring':
   inner=bodyGrad(id,['#042f2e','#0d9488','#99f6e4'])
   +'<ellipse cx="100" cy="190" rx="50" ry="8" fill="rgba(0,0,0,.4)"/>'
   +'<circle cx="100" cy="104" r="58" fill="none" stroke="url(#'+id+')" stroke-width="26"/>'
   +'<circle cx="100" cy="104" r="58" fill="none" stroke="rgba(153,246,228,.35)" stroke-width="6"/>'
   +'<circle cx="100" cy="46" r="24" fill="url(#'+id+')" stroke="rgba(153,246,228,.5)" stroke-width="2"/>'
   +'<path d="M 116 52 l 18 4 l -18 6 Z" fill="#f43f5e"/>'
   +eye(92,42,7,9,'#ccfbf1','#134e4a')+eye(110,42,7,9,'#ccfbf1','#134e4a')
   +'<circle cx="100" cy="104" r="30" fill="rgba(4,47,46,.55)"/>'
   +eye(90,100,8,10,'#fde047','#713f12')+eye(112,100,8,10,'#fde047','#713f12')
   +'<path d="M 86 116 Q 101 128 116 116" stroke="#ccfbf1" stroke-width="3" fill="none"/>';
   break;
  case 'witch':
   inner=bodyGrad(id,['#14532d','#16a34a','#bbf7d0'])
   +'<ellipse cx="100" cy="188" rx="44" ry="8" fill="rgba(0,0,0,.35)"/>'
   +'<circle cx="100" cy="112" r="54" fill="url(#'+id+')" stroke="rgba(187,247,208,.5)" stroke-width="2"/>'
   +'<path d="M 34 84 L 100 22 L 166 84 Q 100 64 34 84 Z" fill="#166534"/>'
   +'<path d="M 100 22 L 108 -2 L 118 18 Z" fill="#166534"/>'
   +'<path d="M 34 84 Q 100 62 166 84" stroke="#facc15" stroke-width="5" fill="none"/>'
   +eye(84,110,11,13,'#fef08a','#365314')+eye(116,110,11,13,'#fef08a','#365314')
   +'<path d="M 82 140 Q 100 154 118 140" stroke="#14532d" stroke-width="4" fill="none"/>'
   +'<path d="M 60 148 q -18 10 -8 24 M 140 148 q 18 10 8 24" stroke="#166534" stroke-width="7" fill="none" stroke-linecap="round"/>';
   break;
  case 'colossus':
   inner=bodyGrad(id,['#083344','#0891b2','#a5f3fc'])
   +'<ellipse cx="100" cy="190" rx="52" ry="8" fill="rgba(0,0,0,.4)"/>'
   +'<circle cx="100" cy="140" r="40" fill="url(#'+id+')" stroke="rgba(165,243,252,.5)" stroke-width="2"/>'
   +'<circle cx="100" cy="72" r="34" fill="url(#'+id+')" stroke="rgba(165,243,252,.5)" stroke-width="2"/>'
   +'<ellipse cx="88" cy="58" rx="12" ry="7" fill="rgba(255,255,255,.4)"/>'
   +'<ellipse cx="88" cy="128" rx="14" ry="8" fill="rgba(255,255,255,.35)"/>'
   +eye(88,66,10,12,'#cffafe','#164e63')+eye(114,66,10,12,'#cffafe','#164e63')
   +eye(84,138,9,10,'#fde047','#713f12')+eye(100,142,9,10,'#fde047','#713f12')+eye(116,138,9,10,'#fde047','#713f12')
   +'<path d="M 82 158 q 18 10 36 0" stroke="#083344" stroke-width="4" fill="none"/>';
   break;
  case 'cube':
   inner=bodyGrad(id,['#0f172a','#475569','#cbd5e1'])
   +'<ellipse cx="100" cy="188" rx="46" ry="8" fill="rgba(0,0,0,.4)"/>'
   +'<path d="M 100 30 L 158 62 L 158 138 L 100 170 L 42 138 L 42 62 Z" fill="url(#'+id+')" stroke="rgba(203,213,225,.5)" stroke-width="2"/>'
   +'<path d="M 100 30 L 100 106 M 100 106 L 158 138 M 100 106 L 42 138 M 42 62 L 100 106 M 100 106 L 158 62" stroke="rgba(255,255,255,.18)" stroke-width="1.6"/>'
   +'<path d="M 100 30 L 158 62 L 100 94 L 42 62 Z" fill="rgba(226,232,240,.16)"/>'
   +eye(84,74,10,12,'#fef9c3','#713f12')+eye(116,74,10,12,'#fef9c3','#713f12')
   +'<path d="M 74 116 h 52" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>'
   +'<path d="M 20 100 l -12 -8 l 4 16 Z" fill="#334155"/><path d="M 180 100 l 12 -8 l -4 16 Z" fill="#334155"/>';
   break;
 }
 return '<svg viewBox="0 0 200 200" width="'+sz+'" height="'+sz+'" class="boss-art"><g style="animation:floaty 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center">'+inner+'</g></svg>';
}
</script>
