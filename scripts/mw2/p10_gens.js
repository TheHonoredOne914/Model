/* ============ QUESTION GENERATORS ============ */
function MC(r, q, ans, wrongs, hint, steps){
  const warr = Array.isArray(wrongs) ? wrongs : (wrongs != null ? [wrongs] : []);
  const seen = new Set([String(ans)]);
  const o = [String(ans)];
  warr.forEach(w => { const k = String(w); if (!seen.has(k) && o.length < 4){ seen.add(k); o.push(k); } });
  const shuffled = shuffle(r, o);
  return { q, o: shuffled, a: shuffled.indexOf(String(ans)), h: hint || 'Work it out on paper — slowly is fast.', s: steps || [] };
}
function yn(r, q, ans, hint, steps){ return MC(r, q, ans, ans === 'Yes' ? 'No' : 'Yes', hint, steps); }
const TRIPLES = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[10,24,26]];

const GENS = {};
/* ---------- NUMBER SYSTEMS ---------- */
GENS.num = [
{ lv:1, f(r){ const n = pick(r, [{s:'0.75',k:'r'},{s:'22/7',k:'r'},{s:'−3/4',k:'r'},{s:'0.333…',k:'r'},{s:'5',k:'r'},{s:'√2',k:'i'},{s:'π',k:'i'},{s:'√7',k:'i'},{s:'0.101001000…',k:'i'},{s:'√10',k:'i'},{s:'1.414214…(no pattern)',k:'i'},{s:'√16',k:'r'}]);
  return MC(r, `Classify: <b>${mf(n.s)}</b>`, n.k === 'r' ? 'Rational' : 'Irrational', ['Irrational','Rational'], 'Does the decimal terminate or repeat? Then it\'s rational.', ['A rational number can be written as p/q with p, q integers.', '√16 = 4 → rational. π and √2, √7, √10 never repeat → irrational.']); } },
{ lv:2, f(r){ const irr = pick(r, ['√{3}', '√{5}', '√{6}', '√{7}', '√{10}']); const k = irr.match(/\d+/)[0];
  const rats = shuffle(r, [`${ri(r,2,9)}/8`, '0.45', '√{25}', '2.131131…?'.replace('…?',''), '0.666…', '1.75']).filter(x => x !== '').slice(0,3);
  return MC(r, `Which one is <b>irrational</b>?`, mf(irr), rats.map(mf), 'Squares of integers are rational. Non-perfect squares are not.', [`√${k} is not a perfect square → its decimal runs forever without repeating → irrational.`]); } },
{ lv:1, f(r){ const b = pick(r,[2,3,5]), m = ri(r,2,4), n = ri(r,2,4);
  return MC(r, `Simplify: ${b}^{${m}} × ${b}^{${n}}`, `${b}^{${m+n}}`, [`${b}^{${m*n}}`,`${b}^{${m+n+1}}`,`${b+m+n}^{1}`], 'Same base multiplying? Add the powers.', [`${b}^${m} × ${b}^${n} = ${b}^(${m}+${n}) = ${b}^${m+n}`, `= ${fr(Math.pow(b, m+n))}`]); } },
{ lv:2, f(r){ const b = pick(r,[2,3,5]), m = ri(r,5,7), n = ri(r,2,4);
  return MC(r, `Simplify: ${b}^{${m}} ÷ ${b}^{${n}}`, `${b}^{${m-n}}`, [`${b}^{${m+n}}`,`${b}^{${m*n}}`,`1^{${m-n}}`], 'Same base dividing? Subtract the powers.', [`${b}^${m} ÷ ${b}^${n} = ${b}^(${m}−${n}) = ${b}^${m-n}`]); } },
{ lv:2, f(r){ const k = pick(r,[2,3,5,7]);
  return MC(r, `Rationalise: <b>1/√{${k}}</b>`, `√{${k}}/${k}`, [`1/${k}`,`√{${k}}`,`√{${k}}/${k*k}`], 'Multiply above and below by √k.', [`1/√${k} × √${k}/√${k} = √${k}/${k}`]); } },
{ lv:3, f(r){ const a = ri(r,2,5), b = ri(r,2,5);
  return MC(r, `Rationalise: <b>1/(2 + √{${b}})</b>`, `(2 − √{${b}})/(4 − ${b})`, [`(2 + √{${b}})/(4 + ${b})`, `(2 − √{${b}})/(4 + ${b})`, `1/(4 − ${b})`], 'Multiply by the conjugate (2 − √b).', [`Multiply by (2−√${b})/(2−√${b})`, `Denominator: (2+√${b})(2−√${b}) = 4 − ${b}`, `Result: (2−√${b})/(4−${b})`]); } },
{ lv:3, f(r){ const d = ri(r,2,4) * pick(r,[1,5]); const q = pick(r,[[d*4,`terminating`],[d*3,`non-terminating recurring`],[d*7,`terminating`],[d*13,`non-terminating recurring`]]);
  return MC(r, `Without long division: ${q[0]}/${d * 5} has a decimal expansion that is…`, q[1], ['terminating','non-terminating recurring','non-terminating non-recurring'], 'Write the denominator as 2^m × 5^n — then it terminates.', [`Denominator ${d*5} = 2^m × 5^n? If yes → terminating.`, `Any other prime factor → recurring forever.`]); } } ];
/* ---------- POLYNOMIALS ---------- */
GENS.poly = [
{ lv:1, f(r){ const p = pick(r, [{s:'4x^{3} − 2x + 7', d:3},{s:'x^{2} − 9x', d:2},{s:'2x + 11', d:1},{s:'x^{3} + x^{2} + x + 1', d:3},{s:'9 − x^{4}', d:4}]);
  return MC(r, `Degree of <b>${mf(p.s)}</b>?`, p.d, [p.d + 1, p.d - 1 < 0 ? 0 : p.d - 1, 1], 'Degree = highest power of x.', [`Highest power present is ${p.d} → degree ${p.d}.`]); } },
{ lv:1, f(r){ const a = ri(r,-4,5) || 2, b = ri(r,-6,6);
  return MC(r, `If p(x) = x + ${b}, find p(${a}).`, a + b, [a - b, b - a, a * b], 'Substitute x = a.', [`p(${a}) = ${a} + ${b} = ${a + b}`]); } },
{ lv:2, f(r){ const a = ri(r,2,5), b = ri(r,1,6) * pick(r,[1,-1]);
  return MC(r, `Zero of p(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}?`, `${fr(-b / a)}`, [`${fr(b / a)}`, `${a}`, `${fr(-b / a) === '0' ? '1' : -a}`], 'Solve ax + b = 0.', [`${a}x + (${b}) = 0`, `x = ${fr(-b/a)}`]); } },
{ lv:2, f(r){ const k = ri(r,2,6);
  return MC(r, `Expand <b>(x + ${k})²</b>`, mf(`x^{2} + ${2*k}x + ${k*k}`), [mf(`x^{2} + ${k*k}`), mf(`x^{2} + ${k}x + ${k*k}`), mf(`x^{2} + ${2*k}x − ${k*k}`)], 'Square-cut: a², then 2ab, then b².', [`(x+${k})² = x² + 2·x·${k} + ${k}²`, `= x² + ${2*k}x + ${k*k}`]); } },
{ lv:2, f(r){ const a = ri(r,1,6), b = ri(r,1,6);
  return MC(r, `Expand <b>(x + ${a})(x + ${b})</b>`, mf(`x^{2} + ${a + b}x + ${a * b}`), [mf(`x^{2} + ${a * b}x + ${a + b}`), mf(`x^{2} + ${a + b}x + ${a + b}`), mf(`x^{2} − ${a + b}x + ${a * b}`)], 'x² + (a+b)x + ab.', [`Outer + inner: ${a}x + ${b}x = ${a + b}x`, `Last: ${a}·${b} = ${a * b}`]); } },
{ lv:3, f(r){ const k = ri(r,1,3);
  const p = pick(r, [ { s:`x^{3} − 3x^{2} + 4x − 4`, f: x => x*x*x - 3*x*x + 4*x - 4 }, { s:`2x^{3} − x^{2} − 8x + 4`, f: x => 2*x*x*x - x*x - 8*x + 4 }, { s:`x^{3} + x^{2} − 5x + 2`, f: x => x*x*x + x*x - 5*x + 2 } ]);
  return MC(r, `Divide ${mf(p.s)} by (x − ${k}). Remainder?`, p.f(k), [p.f(k) + 1, -p.f(k), 0], 'Remainder theorem: just compute p(k).', [`Remainder = p(${k})`, `p(${k}) = ${p.f(k)}`]); } },
{ lv:3, f(r){ const k = ri(r,1,4); const p = pick(r, [ { s:`x^{3} − 6x^{2} + 11x − 6`, z:[1,2,3] }, { s:`x^{3} − 4x^{2} + x + 6`, z:[-1,2,3] }, { s:`x^{3} − 2x^{2} − 5x + 6`, z:[-2,1,3] } ]);
  const isF = p.z.includes(k);
  return yn(r, `Is (x − ${k}) a factor of ${mf(p.s)}?`, isF ? 'Yes' : 'No', 'Factor test: is p(k) = 0?', [`p(${k}) = ${p.z.includes(k) ? 0 : '≠ 0'}`, isF ? 'Remainder 0 → factor ✓' : 'p(k) ≠ 0 → not a factor']); } },
{ lv:3, f(r){ const t = pick(r,[[102, 10404],[51, 2601],[99, 9801],[ext(97), 9409]]); function ext(){ return 97; }
  return MC(r, `Use identities: <b>${t[0]}² = ?</b>`, fr(t[1]), [fr(t[1] + 20), fr(t[1] - 20), fr(t[1] + 200)], 'Break into (100 + k)² or (100 − k)².', [`${t[0]}² = (100 ${t[0] > 100 ? '+' : '−'} ${Math.abs(t[0] - 100)})²`, `= 10000 ${t[0] > 100 ? '+' : '−'} ${200 * Math.abs(t[0] - 100)} + ${Math.abs(t[0] - 100) ** 2}`, `= ${t[1]}`]); } } ];
/* ---------- COORDINATE GEOMETRY ---------- */
GENS.coord = [
{ lv:1, f(r){ const x = pick(r,[-1,1]) * ri(r,1,7), y = pick(r,[-1,1]) * ri(r,1,7);
  const q = x > 0 && y > 0 ? 'Quadrant I' : x < 0 && y > 0 ? 'Quadrant II' : x < 0 && y < 0 ? 'Quadrant III' : 'Quadrant IV';
  return MC(r, `Point <b>(${x}, ${y})</b> lies in…`, q, ['Quadrant I','Quadrant II','Quadrant III','Quadrant IV'], 'Signs decide: (+,+) I, (−,+) II, (−,−) III, (+,−) IV.', [`x is ${x > 0 ? '+' : '−'}, y is ${y > 0 ? '+' : '−'}`]); } },
{ lv:1, f(r){ const x = pick(r,[-1,1]) * ri(r,2,9), y = pick(r,[-1,1]) * ri(r,2,9);
  return MC(r, `Abscissa of <b>(${x}, ${y})</b>?`, x, [y, -x, -y], 'Abscissa = x-coordinate (first number).', [`Ordered pair = (abscissa, ordinate) = (${x}, ${y})`]); } },
{ lv:1, f(r){ const v = r() < .5; const p = v ? [ri(r,2,9), 0] : [0, ri(r,2,9)];
  return MC(r, `Point <b>(${p[0]}, ${p[1]})</b> lies on the…`, v ? 'x-axis' : 'y-axis', ['y-axis','x-axis','origin'], 'Zero coordinate = sits on the other axis.', [`y = 0 → the point rides the x-axis.`]); } },
{ lv:2, f(r){ const e = ri(r,2,7), n = ri(r,2,7) * pick(r,[1,-1]);
  return MC(r, `A ship sails ${e} east and ${Math.abs(n)} ${n > 0 ? 'north' : 'south'} from origin. Its position?`, `(${e}, ${n})`, [`(${n}, ${e})`,`(${e}, ${-n})`,`(${-e}, ${n})`], '(east, north) = (x, y).', [`East → +x = ${e}`, `${n > 0 ? 'North' : 'South'} → y = ${n}`]); } },
{ lv:2, f(r){ const x = ri(r,2,9), y = pick(r,[-1,1]) * ri(r,2,9);
  return MC(r, `Perpendicular distance of <b>(${x}, ${y})</b> from the <b>x-axis</b>?`, Math.abs(y), [Math.abs(x), Math.abs(y) + Math.abs(x), y], 'Distance from x-axis = |y|.', [`Drop a perpendicular to the x-axis — its length is |y| = ${Math.abs(y)}`]); } } ];
/* ---------- LINEAR EQUATIONS ---------- */
GENS.lin = [
{ lv:1, f(r){ const a = ri(r,1,4), b = ri(r,1,4), c = a * ri(r,1,4) + b * ri(r,1,4);
  const x0 = ri(r,0,4), y0 = a * x0 + b * ri(r,0,4) === c ? ri(r,0,4) : ri(r,1,5);
  const is = a * x0 + b * y0 === c;
  return yn(r, `Is <b>(${x0}, ${y0})</b> a solution of ${a}x + ${b}y = ${c}?`, is ? 'Yes' : 'No', 'Substitute and check.', [`LHS = ${a}(${x0}) + ${b}(${y0}) = ${a * x0 + b * y0}`, `LHS ${is ? '=' : '≠'} ${c} (RHS)`]); } },
{ lv:1, f(r){ const a = ri(r,1,4), b = ri(r,1,5), c = ri(r,5,20), x0 = ri(r,1,4);
  const y0 = (c - a * x0) / b; if (!Number.isInteger(y0)) return GENS.lin[0].f(r);
  return MC(r, `If ${a}x + ${b}y = ${c} and x = ${x0}, then y = ?`, y0, [y0 + 1, y0 - 1, c - a * x0], 'Substitute x, solve for y.', [`${a}(${x0}) + ${b}y = ${c}`, `${b}y = ${c - a * x0} → y = ${y0}`]); } },
{ lv:2, f(r){ const a = ri(r,2,4), b = pick(r,[2,3,4]), c = ri(r,6,15);
  const g = gcd(a, c);
  return MC(r, `In ${a}x + ${b}y = ${c}, express y in terms of x:`, mf(`y = (${c} − ${a}x)/${b}`), [mf(`y = (${a}x − ${c})/${b}`), mf(`y = ${c} − ${a}x`), mf(`x = (${c} − ${b}y)/${a}`)], 'Move the x-term across, then divide by b.', [`${b}y = ${c} − ${a}x`, `y = (${c} − ${a}x)/${b}`]); } },
{ lv:2, f(r){ const a = ri(r,1,4), b = ri(r,1,4), x0 = ri(r,1,4), y0 = ri(r,1,4), k = a * x0 + b * y0;
  return MC(r, `Find k if <b>(${x0}, ${y0})</b> lies on ${a}x + ${b}y = k.`, k, [k + a, k - b, a * x0 * b * y0], 'Substitute the point; k is the LHS.', [`k = ${a}(${x0}) + ${b}(${y0}) = ${a*x0} + ${b*y0} = ${k}`]); } },
{ lv:1, f(r){ return MC(r, `A linear equation in two variables has…`, 'infinitely many solutions', ['exactly one solution','no solution','exactly two solutions'], 'One equation, two unknowns — a whole line of answers.', ['Every point on its graph (a line) is a solution — and a line has infinitely many points.']); } } ];
/* ---------- EUCLID & ANGLES ---------- */
GENS.geo = [
{ lv:1, f(r){ const a = pick(r,[35, 48, 62, 71, 84, 95, 110, 125]);
  return MC(r, `Two angles form a linear pair. One is <b>${a}°</b>. The other?`, 180 - a, [a, 90, 360 - a], 'Linear pair → sums to 180°.', [`180° − ${a}° = ${180 - a}°`]); } },
{ lv:1, f(r){ const a = pick(r,[42, 55, 68, 76, 88, 104, 133]);
  return MC(r, `Two lines cross. One angle is <b>${a}°</b>. Its vertically opposite angle?`, a, [180 - a, 90, 360 - a], 'Vertical angles are equal.', [`Opposite corners of an X-cross are exact copies → ${a}°`]); } },
{ lv:2, f(r){ const th = pick(r,[50, 60, 70, 110, 120, 130]); const kind = pick(r,['corresponding','alternate interior','co-interior']);
  const ans = kind === 'co-interior' ? 180 - th : th;
  return MC(r, `Parallel lines cut by a transversal. One angle is <b>${th}°</b>. Its ${kind} partner?`, ans + '°', [th + '°', (180 - th) + '°', (th + 90) + '°'], kind === 'co-interior' ? 'C-shape → sums to 180°.' : 'F/Z shapes → equal copies.', [kind === 'co-interior' ? `180° − ${th}° = ${ans}°` : `Corresponding/alternate angles are EQUAL → ${ans}°`]); } },
{ lv:1, f(r){ const a = ri(r,30,70), b = ri(r,30,70);
  return MC(r, `Triangle with angles <b>${a}°</b> and <b>${b}°</b>. Third angle?`, 180 - a - b, [180 - a, 90, 360 - a - b], 'Angle sum = 180°.', [`180° − ${a}° − ${b}° = ${180 - a - b}°`]); } },
{ lv:2, f(r){ const a = ri(r,30,55), b = ri(r,35,60);
  return MC(r, `Exterior angle at C of △ABC, given ∠A = ${a}°, ∠B = ${b}°?`, a + b, [180 - a - b, 180, a + b + 90], 'Exterior = sum of two remote interiors.', [`Exterior = ∠A + ∠B = ${a} + ${b} = ${a + b}°`]); } },
{ lv:3, f(r){ const k = ri(r,2,4), u = pick(r,[10, 15, 20]);
  const A = k * u, B = (k + 1) * u, C = (k + 2) * u, S = 180 - A - B - C;
  return MC(r, `Angles of a triangle are in ratio <b>${k} : ${k+1} : ${k+2}</b>. The LARGEST angle?`, C + S, [A + S, B + S, 180], 'Let angles be kx, (k+1)x, (k+2)x; total 180°.', [`kx + (k+1)x + (k+2)x = 180 → x = ${u}`, `Angles: ${A + S}°, ${B + S}°, ${C + S}°`]); } } ];
/* ---------- TRIANGLES & HERON ---------- */
GENS.tri = [
{ lv:2, f(r){ const rule = pick(r,['SSS','SAS','ASA','RHS']);
  const desc = { SSS:'all three pairs of sides are equal', SAS:'two sides and the angle BETWEEN them are equal', ASA:'two angles and the side BETWEEN them are equal', RHS:'right angle, hypotenuse and one side are equal' }[rule];
  return MC(r, `Two triangles: ${desc}. Congruence rule?`, rule, ['SSS','SAS','ASA','RHS'], 'Match the story to the rule.', [`${rule}: ${desc}.`]); } },
{ lv:1, f(r){ const apex = pick(r,[40, 50, 60, 80, 90, 100]);
  return MC(r, `Isosceles △ with apex angle <b>${apex}°</b>. Each base angle?`, (180 - apex) / 2, [(180 - apex) / 2 + 10, apex, 180 - apex], 'Equal legs → equal base angles; total 180°.', [`(180° − ${apex}°) ÷ 2 = ${(180 - apex) / 2}°`]); } },
{ lv:1, f(r){ const t = pick(r,TRIPLES.filter(t => t[0] <= 12));
  return MC(r, `Right △ with legs <b>${t[0]}</b> and <b>${t[1]}</b>. Area?`, t[0] * t[1] / 2, [t[0] * t[1], t[2] * t[0] / 2, t[0] + t[1]], 'Right triangle area = ½ × leg × leg (hypotenuse NOT used!).', [`Area = ½ × ${t[0]} × ${t[1]} = ${t[0] * t[1] / 2}`]); } },
{ lv:2, f(r){ const t = pick(r,[[3,4,5,6],[5,12,13,30],[6,8,10,24],[9,12,15,54],[13,14,15,84]]);
  return MC(r, `Heron: sides <b>${t[0]}, ${t[1]}, ${t[2]}</b>. Area?`, t[3], [t[3] / 2, t[3] + 6, t[0] + t[1] + t[2]], 's = (a+b+c)/2, then √(s(s−a)(s−b)(s−c)).', [`s = ${t[0] + t[1] + t[2]}/2 = ${(t[0] + t[1] + t[2]) / 2}`, `Area = √(${(t[0]+t[1]+t[2])/2} × ${(t[0]+t[1]+t[2])/2 - t[0]} × ${(t[0]+t[1]+t[2])/2 - t[1]} × ${(t[0]+t[1]+t[2])/2 - t[2]}) = ${t[3]}`]); } },
{ lv:2, f(r){ const s = pick(r,[2, 4, 6, 8, 10]);
  return MC(r, `Area of an <b>equilateral</b> △ with side ${s}?`, mf(`√{3}/4 × ${s * s}`), [mf(`√{3}/2 × ${s * s}`), mf(`${s * s}`), mf(`√{3} × ${s * s}`)], 'Equilateral area = (√3/4)·a².', [`(√3/4) × ${s}² = ${s * s}√3/4`]); } } ];
/* ---------- QUADRILATERALS ---------- */
GENS.quad = [
{ lv:1, f(r){ const a = ri(r,60,110), b = ri(r,60,110), c = ri(r,60,110);
  return MC(r, `Quadrilateral angles: ${a}°, ${b}°, ${c}°, and x. Find x.`, 360 - a - b - c, [180 - a, 360 - a, 90], 'Quadrilateral angle sum = 360°.', [`360° − (${a}+${b}+${c})° = ${360 - a - b - c}°`]); } },
{ lv:2, f(r){ const p = pick(r,[70, 100, 110, 125, 135]);
  return MC(r, `Parallelogram PQRS, ∠P = ${p}°. Find ∠Q (adjacent).`, 180 - p, [p, 90, 360 - p], 'Adjacent angles of a parallelogram sum to 180°.', [`180° − ${p}° = ${180 - p}°`]); } },
{ lv:2, f(r){ const p = pick(r,[70, 100, 110, 125]);
  return MC(r, `Parallelogram PQRS, ∠P = ${p}°. Find ∠R (opposite).`, p, [180 - p, 90, 360 - p], 'Opposite angles are equal.', [`∠R = ∠P = ${p}°`]); } },
{ lv:2, f(r){ const base = pick(r,[10, 12, 14, 16, 18]);
  return MC(r, `△ with base ${base} cm. Length of segment joining midpoints of the other two sides?`, base / 2, [base, base / 4, base * 2], 'Midpoint theorem: parallel and HALF.', [`${base}/2 = ${base / 2} cm`]); } },
{ lv:2, f(r){ return MC(r, `Diagonals of a parallelogram…`, 'bisect each other', ['are equal','are perpendicular always','bisect the angles always'], 'The one ALWAYS-true property.', ['Diagonals cut each other at the same midpoint — always.', 'Equal diagonals → rectangle; perpendicular → rhombus.']); } },
{ lv:1, f(r){ const a = ri(r,4,12), b = ri(r,3,10);
  return MC(r, `Parallelogram with sides ${a} cm and ${b} cm. Perimeter?`, 2 * (a + b), [a + b, a * b, 4 * a], 'Opposite sides equal → P = 2(a+b).', [`P = 2(${a} + ${b}) = ${2 * (a + b)} cm`]); } } ];
/* ---------- CIRCLES ---------- */
GENS.circ = [
{ lv:1, f(r){ const c = pick(r,[40, 50, 64, 76, 88, 100, 120, 140]);
  return MC(r, `Angle at the centre = <b>${c}°</b>. Angle at the circumference on the same arc?`, c / 2, [c, 180 - c, c * 2], 'Inscribed = HALF of central.', [`${c}° ÷ 2 = ${c / 2}°`]); } },
{ lv:1, f(r){ const i = pick(r,[25, 30, 35, 42, 48, 55]);
  return MC(r, `Angle at the circumference = <b>${i}°</b>. Angle at the centre (same arc)?`, i * 2, [i, 180 - i, i + 90], 'Central = DOUBLE the inscribed.', [`${i}° × 2 = ${i * 2}°`]); } },
{ lv:1, f(r){ const a = pick(r,[85, 95, 100, 110, 120, 132]);
  return MC(r, `Cyclic quadrilateral: ∠A = ${a}°. ∠C (opposite)?`, 180 - a, [a, 90, 360 - a], 'Opposite angles of a cyclic quad sum to 180°.', [`180° − ${a}° = ${180 - a}°`]); } },
{ lv:2, f(r){ const t = pick(r,[[6,8,10],[8,6,10],[12,5,13],[24,7,25],[16,12,20]]);
  return MC(r, `Chord ${t[0]*2} cm sits ${t[1]} cm from the centre. Radius?`, t[2], [t[0] + t[1], t[2] + 2, t[0]], 'Half-chord + distance → Pythagoras.', [`Half-chord = ${t[0]}, distance = ${t[1]}`, `r = √(${t[0]}² + ${t[1]}²) = ${t[2]} cm`]); } },
{ lv:1, f(r){ return MC(r, `Two chords of a circle are equal. Their distances from the centre are…`, 'equal', ['in a 2:1 ratio','always 5 cm','impossible to compare'], 'Equal chords → equal distances.', ['Symmetry: equal chords are equidistant from the centre.']); } },
{ lv:2, f(r){ const t = pick(r,[[6,8,10],[8,6,10],[12,5,13]]);
  return MC(r, `Radius ${t[2]} cm, chord at distance ${t[1]} cm from centre. Chord length?`, t[0] * 2, [t[0], t[2], t[1] * 2], 'r² = (chord/2)² + d² → chord = 2√(r² − d²).', [`Half-chord = √(${t[2]}² − ${t[1]}²) = ${t[0]}`, `Chord = ${t[0] * 2} cm`]); } } ];
/* ---------- SURFACE AREAS & VOLUMES ---------- */
GENS.solid = [
{ lv:1, f(r){ const a = ri(r,2,9);
  return MC(r, `Total surface area of a cube with side ${a}?`, 6 * a * a, [a * a * a, 4 * a * a, 12 * a], 'Cube: 6 identical square faces.', [`6 × ${a}² = ${6 * a * a}`]); } },
{ lv:2, f(r){ const l = ri(r,2,8), b = ri(r,2,8), h = ri(r,2,6);
  return MC(r, `TSA of a cuboid ${l} × ${b} × ${h}?`, 2 * (l * b + b * h + l * h), [l * b * h, 2 * (l + b + h), l * b + b * h], 'TSA = 2(lb + bh + lh).', [`2(${l}·${b} + ${b}·${h} + ${l}·${h}) = ${2 * (l * b + b * h + l * h)}`]); } },
{ lv:2, f(r){ const r0 = pick(r,[7, 14, 21]), h = ri(r,2,12);
  return MC(r, `Curved surface area of a cylinder, r = ${r0}, h = ${h} (π = 22/7)?`, fr(2 * 22 / 7 * r0 * h), [fr(22 / 7 * r0 * h), fr(2 * 22 / 7 * r0), fr(22 / 7 * r0 * r0 * h)], 'CSA = 2πrh — the unrolled rectangle.', [`2 × 22/7 × ${r0} × ${h} = ${fr(2 * 22 / 7 * r0 * h)}`]); } },
{ lv:1, f(r){ const l = ri(r,2,9), b = ri(r,2,9), h = ri(r,2,9);
  return MC(r, `Volume of a cuboid ${l} × ${b} × ${h}?`, l * b * h, [2 * (l * b + b * h + l * h), l + b + h, l * b], 'V = l × b × h.', [`${l} × ${b} × ${h} = ${l * b * h}`]); } },
{ lv:2, f(r){ const r0 = pick(r,[7, 14]), h = ri(r,3,10);
  return MC(r, `Volume of a cylinder, r = ${r0}, h = ${h} (π = 22/7)?`, fr(22 / 7 * r0 * r0 * h), [fr(2 * 22 / 7 * r0 * h), fr(22 / 7 * r0 * h), fr(3 * r0 * r0 * h)], 'V = πr²h.', [`22/7 × ${r0}² × ${h} = ${fr(22 / 7 * r0 * r0 * h)}`]); } },
{ lv:2, f(r){ const t = pick(r,[[3,4,5],[6,8,10],[5,12,13],[9,12,15]]);
  return MC(r, `Cone with r = ${t[0]}, h = ${t[1]}. Slant height l?`, t[2], [t[0] + t[1], t[2] + 1, t[1]], 'l² = r² + h² — a hidden right triangle.', [`l = √(${t[0]}² + ${t[1]}²) = ${t[2]}`]); } },
{ lv:3, f(r){ const r0 = pick(r,[3, 2, 6]);
  return MC(r, `Volume of a sphere with radius ${r0} (leave π)?`, mf(`(4/3)π(${r0 * r0 * r0})`), [mf(`4π(${r0 * r0})`), mf(`(3/4)π(${r0 * r0 * r0})`), mf(`(4/3)π(${r0 * r0})`)], 'V = (4/3)πr³.', [`V = (4/3)π × ${r0}³ = (4/3)π × ${r0 ** 3}`]); } } ];
/* ---------- STATISTICS & PROBABILITY ---------- */
GENS.data = [
{ lv:1, f(r){ const n = ri(r,4,5); const base = ri(r,2,9); const vals = Array.from({length:n}, () => base + ri(r,-2,3) * 2);
  const sum = vals.reduce((a,b) => a + b, 0); const mean = sum / n;
  if (!Number.isInteger(mean)) return GENS.data[0].f(r);
  return MC(r, `Mean of ${vals.join(', ')}?`, mean, [mean + 1, mean - 1, sum], 'Mean = sum ÷ count.', [`Sum = ${sum}, n = ${n}`, `Mean = ${sum}/${n} = ${mean}`]); } },
{ lv:1, f(r){ const vals = shuffle(r, [1,3,5,7,9,11,13].slice(ri(r,0,2), ri(r,4,7) + 3)).slice(0, ri(r,5,7));
  const s = [...vals].sort((a,b) => a - b); const med = s[(s.length - 1) / 2];
  if (!Number.isInteger(med)) return GENS.data[1].f(r);
  return MC(r, `Median of ${vals.join(', ')}?`, med, [s[0], s[s.length - 1], med + 2], 'SORT first, then take the middle.', [`Sorted: ${s.join(', ')}`, `Middle of ${s.length} values → ${med}`]); } },
{ lv:1, f(r){ const m = ri(r,1,9); const vals = shuffle(r, [m,m,m, ri(r,1,9), ri(r,1,9), ri(r,1,9)]);
  return MC(r, `Mode of ${vals.join(', ')}?`, m, [m + 1, Math.max(...vals), Math.min(...vals)], 'Mode = most frequent.', [`${m} appears 3 times — more than anything else.`]); } },
{ lv:1, f(r){ const vals = Array.from({length: ri(r,4,6)}, () => ri(r,1,40));
  const rng = Math.max(...vals) - Math.min(...vals);
  return MC(r, `Range of ${vals.join(', ')}?`, rng, [Math.max(...vals), Math.min(...vals), rng + 2], 'Range = max − min.', [`${Math.max(...vals)} − ${Math.min(...vals)} = ${rng}`]); } },
{ lv:1, f(r){ const ev = pick(r,[ {t:'a six', n:1, d:6}, {t:'an even number', n:3, d:6}, {t:'a number greater than 4', n:2, d:6}, {t:'a prime number (2,3,5)', n:3, d:6}, {t:'a number less than 3', n:2, d:6} ]);
  return MC(r, `One fair die. P(${ev.t}) = ?`, `${ev.n}/${ev.d}`, ['1/6', '1/2', '2/3'], 'P = favourable ÷ total.', [`${ev.n} favourable out of 6 → ${ev.n}/6`]); } },
{ lv:1, f(r){ const ev = pick(r,[ {t:'heads', n:1, d:2, o:['1/2','1/3','1/4']}, {t:'a king (from 52 cards)', n:4, d:52, o:['4/52 = 1/13','1/4','1/26']}, {t:'a red card', n:26, d:52, o:['1/2','1/4','13/52']} ]);
  return MC(r, `P(${ev.t})?`, ev.o[0], ev.o.slice(1), 'favourable ÷ total outcomes.', [`${ev.n}/${ev.d} = ${ev.o[0]}`]); } },
{ lv:2, f(r){ const cls = pick(r,[ {t:'10−20', f:5},{t:'20−30', f:8},{t:'30−40', f:12},{t:'40−50', f:6} ]);
  return MC(r, `Frequencies: 10−20 → 5, 20−30 → 8, 30−40 → 12, 40−50 → 6. The <b>modal class</b> is…`, '30−40', ['10−20','20−30','40−50'], 'Modal class = highest frequency.', ['Highest frequency is 12 → class 30−40.']); } } ];
/* pick a question: weighted by level ramp */
function genQuestion(wid, r, maxLv = 3){
  const pool = GENS[wid] || GENS.num;
  const weighted = [];
  pool.forEach(g => { let w = 4 - g.lv; if (g.lv > maxLv) w = 0.4; if (g.lv === maxLv) w += 1.5; for (let i = 0; i < w * 2; i++) weighted.push(g); });
  for (let tries = 0; tries < 8; tries++){ const q = pick(r, weighted).f(r); if (q) return q; }
  return pool[0].f(r);
}
