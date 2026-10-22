/* ============ LESSON SCRIPTS (stealth learning) ============ */
function until(fn, iv=120, timeout=60000){ return new Promise(res => { const t0 = Date.now(); const i = setInterval(() => { let v = false; try { v = fn(); } catch(e){} if (v || Date.now() - t0 > timeout){ clearInterval(i); res(); } }, iv); }); }
const LESSONS = {};

LESSONS['num-sort'] = async ctx => {
  const w = ctx.mount('sort', { items: [
    { s:'√2', k:'i' }, { s:'0.333…', k:'r' }, { s:'22/7', k:'r' }, { s:'π', k:'i' },
    { s:'√16', k:'r' }, { s:'−3/4', k:'r' }, { s:'0.101001000…', k:'i' }, { s:'√7', k:'i' } ] });
  await ctx.say('Welcome to the Isles. Two tribes live here: the <b>ORDER BAY</b> citizens — decimals that behave — and the <b>WILD BAY</b> rebels, whose decimals never end and never repeat.');
  await ctx.say('Your mission: tap a number, then tap its bay. Watch out — a few of these are wearing disguises.');
  await new Promise(res => w.onDone(res));
  await ctx.say('Look at the traps you caught: <b>√16 = 4</b> — secretly an order citizen! And <b>22/7</b> is rational — it\'s only an <i>approximation</i> of π, never π itself.');
  await ctx.ask({ q:'So — which of these is IRRATIONAL?', o:['0.5','3/8','√5','2.75'], a:2, why:'0.5 = 1/2 and 3/8 are clean fractions; 2.75 terminates. √5 = 2.2360679… goes on forever with no pattern.' });
};

LESSONS['num-root'] = async ctx => {
  const w = ctx.mount('numline');
  await ctx.say('An old island trick: draw a right triangle with legs 1 and 1. Pythagoras says the slanted side = √(1² + 1²) = <b>√2</b>.');
  w.showGuess(true);
  await ctx.say('Before we swing it — <b>drag the gold pin</b> to where you think √2 will land. Trust your gut.');
  await until(() => Math.abs(w.guessVal() - 1.4) > 0.06);
  const g = w.guessVal();
  await ctx.say(`Locked in at ${g.toFixed(2)}. Now watch the arc…`);
  w.showGuess(false);
  await w.swing(2);
  await ctx.say('√2 ≈ 1.414. It landed on a real point — irrational numbers aren\'t ghosts, they <i>occupy</i> the line. Now let\'s hunt bigger game.');
  await w.swing(3);
  await ctx.say('Height 1 over base 2 → √(4+1) = <b>√3</b>. Same swing, bigger base. One more — the classic 3-4-5 family\'s cousin:');
  await w.swing(5);
  await ctx.say('Height 1 over base 4 → √(16+1) = <b>√5</b>. Any √n can be built this way. That\'s why irrational numbers are "real" — constructible with compass and straightedge.');
  await ctx.ask({ q:'√3 sits…', o:['between 1 and 2','exactly at 2','between 2 and 3','exactly at 3'], a:0, why:'1² = 1 and 2² = 4. Since 1 < 3 < 4, we get 1 < √3 < 2 (≈1.732).' });
};

LESSONS['num-pow'] = async ctx => {
  const w = ctx.mount('orbs');
  w.say('2³ means 2×2×2 — power stored inside an orb.');
  w.show([3, 2]);
  await ctx.say('Two orbs, same base 2. <b>Tap both orbs</b> to fuse them.');
  const r1 = await w.pickTwo();
  await w.fuse(r1.els[0], r1.els[1], { exp:5, label:'2<sup>5</sup>', say:'<b>2³ × 2² = 2⁵</b> — multiplying same bases: <b>ADD the powers</b>. 8 × 4 = 32 = 2⁵ ✓' });
  await wait(900);
  w.show([5, 2]);
  await ctx.say('Now the reverse. <b>Tap both</b> — splitting an orb apart.');
  const r2 = await w.pickTwo();
  await w.fuse(r2.els[0], r2.els[1], { exp:7, label:'2<sup>7</sup>', say:'Hmm — fusing gives 2⁷… but DIVIDING works the mirror way: <b>2⁵ ÷ 2² = 2³</b>. Same bases dividing → <b>SUBTRACT</b> the powers.' });
  await wait(1100);
  w.show([2]);
  await ctx.say('And stacking? (2²)³ means "2² copied 3 floors tall" = 2×2 · 2×2 · 2×2 = 2⁶. Power of a power → <b>MULTIPLY</b>.');
  w.show([6]);
  w.say('(2²)³ = 2⁶ = 64');
  await ctx.ask({ q:'3⁴ × 3² = ?', o:['3⁶','3⁸','9⁶','3²'], a:0, why:'Same base 3 → add the powers: 4 + 2 = 6. (Don\'t multiply the bases!)' });
  await ctx.ask({ q:'5⁷ ÷ 5⁴ = ?', o:['5³','5¹¹','5²⁸','1³'], a:0, why:'Dividing same bases → subtract: 7 − 4 = 3.' });
};

LESSONS['num-rat'] = async ctx => {
  const w = ctx.mount('shield');
  w.show('1', '√2');
  await ctx.say('A <b>root demon</b> squats in the denominator of 1/√2. Your weapons: shields you multiply with. The secret — multiply by something that equals <b>1 in disguise</b>.');
  const ok1 = await w.offer(['√2', '√3', '2'], 0, 'Pick the shield that erases √2 below.');
  w.result({ num:'√2', den:'2' });
  await ctx.say('1/√2 × √2/√2 = <b>√2/2</b>. Same value, tamed denominator. Value unchanged because √2/√2 = 1.');
  w.show('1', '2 + √3');
  await ctx.say('A harder demon: 2 + √3. Brute force fails. You need its mirror twin — the <b>conjugate</b>: (2 + √3)(2 − √3) = 4 − 3 = <b>1</b>.');
  await w.offer(['2 − √3', '2 + √3', '√3'], 0, 'Which shield makes (2+√3) collapse?');
  w.result({ num:'2 − √3', den:'1' });
  await ctx.say('The demon dissolves: 1/(2+√3) = <b>2 − √3</b>. That\'s rationalisation — one multiply, zero value change.');
  await ctx.ask({ q:'Rationalise 1/√5:', o:['√5/5','5/√5','√5/√5','1/5'], a:0, why:'Multiply by √5/√5 (=1): 1·√5 / (√5·√5) = √5/5.' });
};

LESSONS['poly-what'] = async ctx => {
  const w = ctx.mount('sort', { bins: [
    { k:'p', title:'POLY VAULT', sub:'whole powers of x only', color:'var(--gold)', bg:'rgba(242,180,65,.07)' },
    { k:'n', title:'IMPOSTER PIT', sub:'broken powers exposed', color:'var(--coral)', bg:'rgba(255,122,110,.06)' } ],
    items: [ { s:'x² + 3x', k:'p' }, { s:'x⁻² + 1', k:'n' }, { s:'√x + 2', k:'n' }, { s:'7', k:'p' },
      { s:'4x³ − 2x', k:'p' }, { s:'2^x', k:'n' }, { s:'x² − x + 1', k:'p' }, { s:'5x^{1/2}', k:'n' } ] });
  await ctx.say('The Peaks only admit true polynomials. The entry law: every power of x must be a <b>whole number</b> — 0, 1, 2, 3…');
  await ctx.say('Imposters wear broken powers: x⁻² (negative), √x (a half), 2^x (x in the exponent\'s basement). File them!');
  await new Promise(res => w.onDone(res));
  await ctx.say('And plain <b>7</b>? It\'s 7x⁰ — degree 0, a legit polynomial. The <b>degree</b> is the highest power present: 4x³ − 2x is a <b>cubic</b>.');
  await ctx.ask({ q:'Degree of 4x³ − 2x + 7?', o:['3','2','7','1'], a:0, why:'Highest power of x wins: 3 → cubic polynomial.' });
};

LESSONS['poly-zero'] = async ctx => {
  const w = ctx.mount('zerolab');
  w.setFn(x => x - 3, 'p(x) = x − 3');
  await ctx.say('This line is a water-slide. For every x, p(x) is the runner\'s height above the waterline y = 0.');
  await ctx.say('<b>Drag the runner</b> until it SPLASHES — find where p(x) hits exactly zero.');
  await new Promise(res => w.onZero(res));
  await ctx.say('At <b>x = 3</b>: p(3) = 3 − 3 = 0. That x is called a <b>zero</b> of the polynomial. On any graph, zeroes are where the curve crosses the x-axis.');
  w.setFn(x => 2 * x - 6, 'p(x) = 2x − 6');
  await ctx.say('New slide: 2x − 6. Same game — find its zero. (Hint: where is 2x − 6 = 0?)');
  await new Promise(res => w.onZero(res));
  await ctx.say('x = 3 again! Both slides cross water at the same point. A linear ax + b always has exactly <b>one</b> zero, at x = −b/a.');
  await ctx.ask({ q:'Zero of p(x) = x + 7?', o:['x = 7','x = −7','x = 0','x = 1/7'], a:1, why:'x + 7 = 0 → x = −7. One zero, always, for linear polys.' });
};

LESSONS['poly-square'] = async ctx => {
  const w = ctx.mount('square');
  await ctx.say('A royal floor, side <b>a + b</b>. Area = (a+b)². But instead of memorising that… <b>cut it open</b>.');
  w.enableKnob(true);
  await until(() => w.a !== 3, 120, 22000);
  w.enableKnob(false);
  await ctx.say('See? One straight cut, one horizontal cut — and the floor splits into exactly <b>4 pieces</b>: two squares and two matching rectangles.');
  w.label();
  await ctx.say('The pieces: <b>a²</b> (gold), <b>ab</b> (teal), another <b>ab</b> (rose), <b>b²</b> (violet). All four together = the whole floor.');
  w.gridOn();
  await ctx.say('Turn on the counting grid — <b>tap each piece</b> and count its unit squares yourself.');
  await w.countTask();
  w.gridOff();
  await ctx.say(`That's the identity, discovered with your own hands: <b>(a+b)² = a² + 2ab + b²</b>. No formula-mugging required.`);
  w.setAB(4, 2);
  await wait(700);
  await ctx.ask({ q:'With a = 4, b = 2 — what are the four pieces?', o:['16, 8, 8, 4','8, 8, 8, 8','16, 16, 4, 4','4, 4, 4, 4'], a:0, why:'a² = 16, ab = 8 (twice), b² = 4. Total 36 = (4+2)² ✓' });
  await ctx.ask({ q:'Expand (x + 3)²', o:['x² + 9','x² + 6x + 9','x² + 3x + 9','2x + 6'], a:1, why:'a=x, b=3: x² + 2·x·3 + 9 = x² + 6x + 9. The middle term is the two ab pieces!' });
};

LESSONS['poly-ident'] = async ctx => {
  const w = ctx.mount('square');
  await ctx.say('The square has a darker twin. Start with a square of side <b>a</b>… and steal a <b>b²</b> corner.');
  await w.minusDemo();
  await ctx.say('What\'s left (the L-shape) has area <b>a² − b²</b>. But look what the slide did: it became ONE clean rectangle of sides <b>(a − b)</b> and <b>(a + b)</b>.');
  await ctx.say('So: <b>a² − b² = (a + b)(a − b)</b>. You just watched the proof happen.');
  await ctx.ask({ q:'Compute 51 × 49 the identity way:', o:['2499','2501','2490','2495'], a:0, why:'51×49 = (50+1)(50−1) = 50² − 1 = 2499. Identities are mental-math superpowers.' });
  await ctx.ask({ q:'Expand (x − 2)²:', o:['x² − 4','x² − 4x + 4','x² + 4x + 4','x² − 2x + 4'], a:1, why:'(a−b)² = a² − 2ab + b² → x² − 4x + 4. The minus only touches the middle term.' });
  await ctx.ask({ q:'And (x + 5)(x + 2)?', o:['x² + 10x + 10','x² + 7x + 10','x² + 7x + 7','x² + 10'], a:1, why:'x² + (5+2)x + 5·2 = x² + 7x + 10 — outer + inner terms make the middle.' });
};

LESSONS['poly-div'] = async ctx => {
  const w = ctx.mount('remainder');
  w.load(0);
  await ctx.say('Long division is slow. Here\'s the royal shortcut: dividing p(x) by (x − a), the leftover gold is simply <b>p(a)</b>. Test it yourself.');
  w.buttons([1, 2, 3, 4]);
  w.say('Tap values of x — hunting for remainder ZERO.');
  await new Promise(res => w.onZero(res));
  await ctx.say('At x = 2 the leftover vanished: p(2) = 0 → remainder 0 → <b>(x − 2) is a FACTOR</b>. That\'s the Factor Theorem.');
  w.load(1);
  w.buttons([1, 2, 3]);
  await ctx.say('New treasure: x³ + x² − 5x + 2. Tap x = 1 first… p(1) = −1. Not zero → (x−1) is <b>not</b> a factor. The theorem saves you from long division.');
  await ctx.ask({ q:'p(x) = x³ − 6x² + 11x − 6. Is (x − 1) a factor?', o:['Yes — p(1) = 0','No — p(1) = 1','Only if x = 6','Cannot tell'], a:0, why:'p(1) = 1 − 6 + 11 − 6 = 0 → remainder 0 → factor confirmed.' });
};

LESSONS['coord-plane'] = async ctx => {
  const w = ctx.mount('grid');
  w.btns();
  await ctx.say('Home port: the <b>origin (0, 0)</b> — where the two axes cross. Coordinates are sailing orders: (x, y) = go east x, go north y.');
  w.say('Sail to <b>(3, 2)</b> — click the water or use the arrows.');
  await new Promise(res => { w.arrive({ x:3, y:2, fn:res }); });
  await ctx.say('(3, 2) — 3 east, 2 north: <b>Quadrant I</b>. Both coordinates positive here.');
  w.flag(-2, 3, '?');
  w.say('Now hunt the mystery flag at <b>(−2, 3)</b>.');
  await new Promise(res => { w.arrive({ x:-2, y:3, fn:res }); });
  await ctx.say('West of the line, north of the other → <b>Quadrant II</b>: x negative, y positive. The four quadrants run anticlockwise: I (+,+) · II (−,+) · III (−,−) · IV (+,−).');
  w.clearFlags();
  await ctx.ask({ q:'(−3, −4) lives in…', o:['Quadrant I','Quadrant II','Quadrant III','Quadrant IV'], a:2, why:'Both negative → south-west → Quadrant III.' });
};

LESSONS['coord-plot'] = async ctx => {
  const w = ctx.mount('grid');
  w.btns();
  const targets = [[4, -2, 'south-east waters'], [-3, 3, 'north-west waters'], [0, 4, 'the y-axis itself']];
  for (const [tx, ty, zone] of targets){
    w.say(`Plant your ship at <b>(${tx}, ${ty})</b> — the ${zone}.`);
    await new Promise(res => { w.arrive({ x:tx, y:ty, fn:res }); });
    Sfx.ok(); toast(`Flag planted at (${tx}, ${ty})`, 'good', 'flag', 1400);
  }
  await ctx.say('Notice (0, 4): x = 0 means ON the y-axis. Any point <b>(0, y)</b> rides the y-axis; any <b>(x, 0)</b> rides the x-axis.');
  await ctx.say('The x-number has a royal name: <b>abscissa</b>. The y-number: <b>ordinate</b>. Order matters — (x, y) ≠ (y, x).');
  await ctx.ask({ q:'A point on the x-axis always looks like…', o:['(5, 0)','(0, 5)','(5, 5)','(−5, −5)'], a:0, why:'On the x-axis, height y = 0 → (x, 0).' });
};

LESSONS['coord-read'] = async ctx => {
  const w = ctx.mount('grid');
  w.btns();
  w.flag(-4, 2, '?'); w.flag(3, -3, '?');
  await ctx.say('Sunken flags, no labels. To read a point: drop straight to the x-axis for the <b>abscissa</b>, slide across to the y-axis for the <b>ordinate</b>.');
  w.say('Sail to the first flag (north-west) and scan it.');
  await new Promise(res => { w.arrive({ x:-4, y:2, fn:res }); });
  await ctx.say('Drop down: 4 west → x = −4. Slide across: 2 north → y = 2. The flag reads <b>(−4, 2)</b>.');
  w.say('Second flag — south-east waters.');
  await new Promise(res => { w.arrive({ x:3, y:-3, fn:res }); });
  await ctx.say('<b>(3, −3)</b> — and notice: swap it to (−3, 3) and you\'re in a totally different quadrant. Order is destiny.');
  await ctx.ask({ q:'Abscissa of (−7, 9)?', o:['9','−7','7','−9'], a:1, why:'Abscissa = x-coordinate = −7. Ordinate = 9.' });
};

LESSONS['lin-balance'] = async ctx => {
  const w = ctx.mount('balance');
  w.load(1, 3, 8, 'The scale holds because x + 3 really weighs 8.');
  await ctx.say('An equation is a <b>temple scale</b>: both pans weigh the same. To find x, remove weight — but ALWAYS from both pans.');
  await ctx.say('Remove 3 from both sides…');
  w.op('− 3 both sides', st => { if (st.cl < 3) return false; st.cl -= 3; st.cr -= 3; return true; });
  await new Promise(res => w.onSolved(res));
  await wait(600);
  w.load(2, 0, 10, '2x balances 10.');
  await ctx.say('Two x-blocks weigh 10. Each x is… halve BOTH sides.');
  w.op('÷ 2 both sides', st => { if (st.xs % 2 || st.cl % 2 || st.cr % 2) return false; st.xs /= 2; st.cl /= 2; st.cr /= 2; return true; });
  await new Promise(res => w.onSolved(res));
  await wait(600);
  w.load(2, 1, 9, '2x + 1 balances 9.');
  await ctx.say('Final trial — two moves needed. Strip the 1 first, then halve.');
  w.op('− 1 both sides', st => { if (st.cl < 1) return false; st.cl -= 1; st.cr -= 1; return true; });
  w.op('÷ 2 both sides', st => { if (st.xs % 2 || st.cl % 2 || st.cr % 2) return false; st.xs /= 2; st.cl /= 2; st.cr /= 2; return true; });
  await new Promise(res => w.onSolved(res));
  await ctx.ask({ q:'Solve 3x + 4 = 19', o:['x = 5','x = 15','x = 7','x = 3'], a:0, why:'−4 both sides: 3x = 15. ÷3 both sides: x = 5.' });
};

LESSONS['lin-graph'] = async ctx => {
  const w = ctx.mount('line');
  w.eq(1, 1, 4);
  await ctx.say('x + y = 4. One equation, TWO unknowns — so not one answer, but a whole family. Every (x, y) that satisfies it is a <b>solution</b>.');
  await ctx.say('Test your instincts: click grid points. Green = a real solution riding the road. Find <b>3</b> of them.');
  while (w.found() < 3){ const r = await w.pick('any'); if (r.on){ w.say(`${w.found()}/3 found. Keep clicking!`); } else w.say('Off the road — check: x + y must equal 4.'); }
  w.stopPick();
  await ctx.say('Every point you found — (4,0), (0,4), (2,2), (1,3)… — lies on ONE straight line. A linear equation\'s solutions <b>are</b> a line.');
  await ctx.say('Infinitely many solutions, one road. That\'s why it\'s called <b>linear</b>.');
  await ctx.ask({ q:'Does (2, 2) satisfy x + y = 4?', o:['Yes','No','Only sometimes','Cannot tell'], a:0, why:'2 + 2 = 4 ✓ — the point sits exactly on the road.' });
};

LESSONS['lin-inf'] = async ctx => {
  const w = ctx.mount('line');
  w.eq(1, 1, 4);
  await ctx.say('Road one: x + y = 4.');
  w.eq2(2, 2, 8);
  await ctx.say('Road two: 2x + 2y = 8. Look closely… they\'re the <b>same road</b>! (Double the first equation.) Every single solution is shared → <b>infinitely many</b> common solutions.');
  await wait(600);
  w.clear2(); w.eq2(1, 1, 6);
  await ctx.say('New rival: x + y = 6. Same slope but shifted up — <b>parallel</b>. They never touch → <b>zero</b> common solutions.');
  await wait(600);
  w.clear2();
  await ctx.say('Three fates for a pair of linear lines: identical (infinite solutions), crossing (exactly one), parallel (none).');
  await ctx.ask({ q:'2x + 3y = 7 and 4x + 6y = 14 meet…', o:['at one point','never','everywhere — same line','at two points'], a:2, why:'Second equation = 2 × first → identical roads → infinitely many shared solutions.' });
};

LESSONS['geo-axiom'] = async ctx => {
  const w = ctx.mount('sort', { bins: [
    { k:'t', title:'SACRED LAW', sub:'carve it in stone', color:'var(--lime)', bg:'rgba(168,217,63,.08)' },
    { k:'f', title:'TRAP', sub:'expose the lie', color:'var(--coral)', bg:'rgba(255,122,110,.06)' } ],
    items: [ { s:'Through 2 points: exactly 1 line', k:'t' }, { s:'Through 2 points: many lines', k:'f' },
      { s:'Halves of equal things are equal', k:'t' }, { s:'A line has 2 endpoints', k:'f' },
      { s:'The whole is greater than the part', k:'t' }, { s:'Two lines can cross twice', k:'f' },
      { s:'Things equal to the same thing are equal', k:'t' }, { s:'Parallel lines eventually meet', k:'f' } ] });
  await ctx.say('Euclid built ALL of geometry from a handful of self-evident truths — <b>axioms</b> (universal) and <b>postulates</b> (geometry-specific). No proofs needed; they ARE the foundation.');
  await ctx.say('Verdict time: sacred law, or trap?');
  await new Promise(res => w.onDone(res));
  await ctx.say('A line extends <i>endlessly</i> in both directions — endpoints belong to line <b>segments</b>. And two distinct lines cross at most ONCE, else they\'d be the same line.');
  await ctx.ask({ q:'How many lines pass through two distinct points?', o:['Exactly one','Two','Infinite','None'], a:0, why:'Euclid\'s first postulate: one and only one line through two given points.' });
};

LESSONS['geo-pair'] = async ctx => {
  const w = ctx.mount('angle');
  w.mode('pair');
  await ctx.say('Two laser beams leave point O along a straight line. <b>Drag the gold ray</b> — watch the two angles. Add them up. Every time.');
  await until(() => { const t = w.theta; return w._poll ? w._poll : (w._poll = false) || (t !== 60 && (w._poll = true)); });
  await ctx.say(`${w.theta}° + ${180 - w.theta}° = 180°. Always. A straight line is a 180° treaty — angles on it are a <b>linear pair</b>.`);
  w.set(35);
  await wait(500);
  await ctx.say('Free fact: if one angle of a linear pair is 110°, its partner is locked at 70°. No freedom.');
  await ctx.ask({ q:'Partner of a 65° angle in a linear pair?', o:['65°','115°','180°','25°'], a:1, why:'180 − 65 = 115°. Linear pairs always complete the straight line.' });
  w.mode('vert');
  await ctx.say('Now cross TWO full lines — an X. <b>Drag it</b> and watch opposite corners…');
  await until(() => { const t = w.theta; return w._poll2 ? true : (t !== 35 && (w._poll2 = true)); });
  await ctx.say('Opposite (vertically opposite) angles are <b>always equal</b> — they\'re the same angle seen across the crossing.');
  await ctx.ask({ q:'X-cross: one angle is 74°. Its vertical opposite?', o:['74°','106°','16°','148°'], a:0, why:'Vertical angles are equal copies. (The 106° would be its linear-pair neighbour.)' });
};

LESSONS['geo-trans'] = async ctx => {
  const w = ctx.mount('angle');
  w.mode('parallel');
  await ctx.say('A transversal crashes through two parallel lines — 8 angles born at once. But they\'re all copies of just TWO values.');
  await ctx.say('Mission 1: tap the angle <b>corresponding</b> to ∠1 — same corner, other line (the F-shape).');
  let done = false;
  w.pickChip(c => {
    if (c.key === '1ne'){ Sfx.ok(); w.say('∠5 — F-shape found! Corresponding angles are equal.'); done = true; }
    else { Sfx.bad(); w.say(`<b style="color:var(--bad)">Not corresponding.</b> Trace the F: same position at both crossings.`); }
  });
  await until(() => done);
  await ctx.say('Mission 2: tap the <b>alternate interior</b> partner of ∠4 — the Z-shape, inside the parallels, opposite sides of the transversal.');
  done = false;
  w.pickChip(c => {
    if (c.key === '1nw'){ Sfx.ok(); w.say('∠6! Z-shape locked. Alternate interior angles are equal.'); done = true; }
    else { Sfx.bad(); w.say(`<b style="color:var(--bad)">Trace the Z carefully.</b> Interior = between the parallel lines.`); }
  });
  await until(() => done);
  await ctx.say('Mission 3: co-interior (C-shape) partners sit inside, same side — they <b>sum to 180°</b>. Tap ∠3\'s co-interior partner.');
  done = false;
  w.pickChip(c => {
    if (c.key === '1nw'){ Sfx.ok(); w.say('∠6 again! ∠3 + ∠6 = θ + (180−θ) = 180° ✓'); done = true; }
    else { Sfx.bad(); w.say(`<b style="color:var(--bad)">Same side of the transversal, both inside.</b>`); }
  });
  await until(() => done);
  await ctx.ask({ q:'Parallel lines, transversal: one co-interior angle is 60°. Its partner?', o:['60°','30°','120°','180°'], a:2, why:'Co-interior partners sum to 180° → 180 − 60 = 120°.' });
};

LESSONS['geo-tsum'] = async ctx => {
  const w = ctx.mount('angle');
  w.mode('tri');
  await ctx.say('Triangle corner patrol. <b>Drag any vertex</b> — reshape it as wildly as you dare.');
  await wait(3200);
  await ctx.say('No matter how you mangle it: ∠A + ∠B + ∠C = <b>180°</b>. Three corners always pay exactly a straight line\'s worth.');
  await ctx.say('Bonus law: push one side outward — the <b>exterior angle</b> equals the two far corners ADDED. It\'s just 180° minus its neighbour.');
  await ctx.ask({ q:'Two angles of a triangle: 50° and 60°. The third?', o:['60°','70°','80°','90°'], a:1, why:'180 − 50 − 60 = 70°.' });
  await ctx.ask({ q:'Exterior angle at C, given ∠A = 40°, ∠B = 65°?', o:['75°','105°','115°','140°'], a:1, why:'Exterior = A + B = 40 + 65 = 105° (or 180 − 75).' });
};

LESSONS['tri-cong'] = async ctx => {
  const w = ctx.mount('tri');
  await ctx.say('Two forges hammer triangles. If all three sides match — 3, 4, 5 — can the gold one pose differently? <b>Watch it snap.</b>');
  await w.snapDemo(3, 4, 5);
  await ctx.say('<b>SSS</b> — Side-Side-Side. Same three sides → same triangle, no freedom left. But SSS isn\'t the only badge…');
  await ctx.say('<b>SAS</b>: two sides + the angle <b>between</b> them. <b>ASA</b>: two angles + the side between. <b>RHS</b>: right angle + hypotenuse + one side. The BETWEEN part is non-negotiable!');
  await ctx.ask({ q:'△ has sides 5, 6 with included angle 40°; another △ matches. Which rule?', o:['SSS','SAS','ASA','RHS'], a:1, why:'Side-Angle-Side with the angle BETWEEN the two sides → SAS.' });
  await ctx.ask({ q:'Two right triangles: hypotenuse 13 and a leg 5 match. Rule?', o:['SSS','SAS','AAA','RHS'], a:3, why:'Right angle + Hypotenuse + Side → RHS (the right-triangle special).' });
};

LESSONS['tri-iso'] = async ctx => {
  const w = ctx.mount('angle');
  w.mode('tri');
  await ctx.say('Crown a triangle: give it two equal legs (AB = AC). Instantly, the two base angles bow <b>equally</b>. Equal legs → equal base angles. Always.');
  await ctx.say('So if the apex is 40°, the remaining 140° splits perfectly: 70° + 70°.');
  await wait(800);
  await ctx.ask({ q:'Isosceles triangle, apex angle 40°. Each base angle?', o:['40°','50°','70°','140°'], a:2, why:'(180 − 40) ÷ 2 = 70°. Equal legs force equal base angles.' });
  await ctx.ask({ q:'Base angles are 55° each. The apex?', o:['55°','70°','80°','125°'], a:1, why:'180 − 55 − 55 = 70°. The converse holds too: equal base angles → equal legs.' });
};

LESSONS['tri-heron'] = async ctx => {
  const w = ctx.mount('tri');
  await ctx.say('No height given. No angles. Just three sides — and yet the area is fully determined. Heron\'s moat-filling ritual:');
  await ctx.say('<b>Step 1:</b> s = (a + b + c) ÷ 2 — the semi-perimeter. <b>Step 2:</b> Area = √(s(s−a)(s−b)(s−c)).');
  await ctx.say('Try the sliders — note the gate: if two sides together can\'t beat the third, the triangle <b>cannot exist</b>.');
  w.heron();
  w.ctlClear();
  w.btn('Lock the moat (3, 4, 5)', () => { w._locked = true; });
  await until(() => w._locked);
  w.setSides(3, 4, 5);
  w.heron();
  w.ctlClear();
  const t = w.btn('Pour the water', () => { w.fillWater(.45); t.disabled = true; });
  await ctx.say('Sides 3, 4, 5: s = 12/2 = 6. Then √(6·3·2·1) = √36 = <b>6 square units</b>. The moat fills exactly.');
  await ctx.ask({ q:'Heron: sides 5, 12, 13. What is s?', o:['30','15','13','7.5'], a:1, why:'s = (5+12+13)/2 = 30/2 = 15. (Then area = √(15·10·3·2) = √900 = 30 — a Heronian beauty.)' });
};

LESSONS['quad-slice'] = async ctx => {
  const w = ctx.mount('quad');
  w.drawQuad();
  await ctx.say('Fortress ABCD — four walls, four angles. You know triangles pay 180°… what does a quadrilateral pay? <b>Slice and see.</b>');
  await ctx.say('Press SLICE when ready.');
  let sliced = false;
  w.btn('SLICE', () => { sliced = true; });
  await until(() => sliced);
  await w.slice();
  await ctx.say('One diagonal → two triangles → 180° + 180° = <b>360°</b>. Every quadrilateral, every time. No memorising — you SAW it.');
  await ctx.ask({ q:'Three angles of a quadrilateral: 100°, 85°, 90°. The fourth?', o:['75°','85°','95°','360°'], a:1, why:'360 − (100+85+90) = 85°.' });
};

LESSONS['quad-para'] = async ctx => {
  const w = ctx.mount('quad');
  w.para();
  await ctx.say('A parallelogram — skew it however you like. Its oath never breaks:');
  await ctx.say('① opposite sides equal AND parallel ② opposite angles equal ③ adjacent angles sum to 180° ④ <b>diagonals bisect each other</b> — the gold dot.');
  await wait(1200);
  await ctx.ask({ q:'In parallelogram PQRS, ∠P = 110°. ∠Q (next to it)?', o:['110°','70°','90°','180°'], a:1, why:'Adjacent angles co-operate to 180° → ∠Q = 70°. (∠R would be 110° — opposite.)' });
  await ctx.ask({ q:'The diagonals of a parallelogram…', o:['are equal','bisect each other','are perpendicular always','never cross'], a:1, why:'They always cut each other at the same midpoint (not necessarily equal — that\'s rectangles).' });
};

LESSONS['quad-mid'] = async ctx => {
  const w = ctx.mount('midpt');
  await ctx.say('Take any triangle. Mark the <b>midpoints</b> of two sides. Join them — a half-bridge appears.');
  await ctx.say('<b>Drag every corner</b> and torture-test it: the bridge stays parallel to the base and stays EXACTLY half its length. That\'s the Midpoint Theorem.');
  await wait(2400);
  await ctx.ask({ q:'Triangle base = 14 cm. Segment joining midpoints of the other two sides?', o:['14 cm','7 cm','28 cm','depends on shape'], a:1, why:'Half of 14 = 7 cm, parallel to the base — no matter the triangle\'s shape.' });
};

LESSONS['circ-chord'] = async ctx => {
  const w = ctx.mount('circle');
  w.chord();
  await ctx.say('A chord across the temple floor. Drop a perpendicular from the centre — the <b>teal sword</b>. Watch what it does as you drag.');
  await wait(2200);
  await ctx.say('It splits the chord into <b>two equal halves</b>, every single position. The perpendicular from the centre always bisects the chord.');
  w.equalChords();
  await ctx.say('And twins: equal chords sit at equal distances from the centre. Pull a chord further from centre → it gets <b>shorter</b>. Diameter — the closest — is longest.');
  await ctx.ask({ q:'Chord 16 cm sits 6 cm from the centre. Radius?', o:['8 cm','10 cm','12 cm','14 cm'], a:1, why:'Half-chord 8, distance 6 → radius = √(8² + 6²) = √100 = 10 cm. Pythagoras inside every circle.' });
};

LESSONS['circ-insc'] = async ctx => {
  const w = ctx.mount('circle');
  w.inscribed();
  await ctx.say('The centre O looks at arc AB: one angle. Point P on the edge looks at the SAME arc: another angle. <b>Drag P all around the rim.</b>');
  await wait(3000);
  await ctx.say('Wherever P roams, the edge angle stays exactly <b>HALF</b> the centre angle. Same arc → same inscribed angle, always.');
  await ctx.say('Extreme case: AB a diameter → centre angle 180° → edge angle <b>90°</b>. "Angle in a semicircle is a right angle."');
  await ctx.ask({ q:'Angle at centre = 76°. Angle at the rim (same arc)?', o:['152°','76°','38°','19°'], a:2, why:'Inscribed = half of central: 76 ÷ 2 = 38°.' });
  await ctx.ask({ q:'Angle in a semicircle?', o:['180°','90°','45°','60°'], a:1, why:'Central angle of a semicircle is 180° → inscribed is half → 90°.' });
};

LESSONS['circ-cyclic'] = async ctx => {
  const w = ctx.mount('circle');
  w.cyclic();
  await ctx.say('Four gems pinned on one ring — a <b>cyclic quadrilateral</b>. Gem D can slide anywhere along the rim…');
  await wait(2600);
  await ctx.say('…and still ∠A + ∠C = <b>180°</b>, always. Opposite corners of a cyclic quad are 180° partners. Try to break it — you can\'t.');
  await ctx.ask({ q:'Cyclic quad: ∠A = 95°. ∠C (opposite)?', o:['95°','85°','190°','47.5°'], a:1, why:'Opposite angles of cyclic quads sum to 180° → 180 − 95 = 85°.' });
};

LESSONS['solid-net'] = async ctx => {
  const w = ctx.mount('solid');
  w.cubeNet();
  await ctx.say('Every 3D box is a lie — it\'s really flat paper folded up. <b>Pull the unwrap slider.</b>');
  await wait(1800);
  await ctx.say('Six identical squares. So the total wrapping paper — the <b>surface area</b> — is 6 × side². Painting a box? This is your bill.');
  w.ctlClear();
  w.cylNet();
  await ctx.say('Cylinders hide a rectangle: unroll the curved wall → width <b>2πr</b> (the rim!), height h. Curved surface = 2πrh, plus two circle lids πr² each.');
  await ctx.ask({ q:'Total surface area of a cube, side 4?', o:['64','96','48','16'], a:1, why:'6 × 4² = 6 × 16 = 96 square units.' });
};

LESSONS['solid-vol'] = async ctx => {
  const w = ctx.mount('solid');
  w.pour();
  await ctx.say('Volume = how many unit cubes fit INSIDE. <b>Fill the crate</b> — tap ADD until it\'s full.');
  await new Promise(res => { w.onFull(res); });
  await ctx.say('15 cubes. And notice: 3 columns × 5 rows = l × b × h. Volume formulas are just clever counting.');
  await ctx.say('Cylinder? A circular base stacked h times: πr²h. Sphere? (4/3)πr³ — the sphere-filling crown jewel.');
  await ctx.ask({ q:'Volume of a cube with side 3?', o:['9','27','6','81'], a:1, why:'3 × 3 × 3 = 27 unit cubes.' });
};

LESSONS['data-mmm'] = async ctx => {
  const w = ctx.mount('data');
  w.mmm();
  await ctx.say('Data Dominion: tap columns to drop beans. Drop at least <b>6</b> — build any skyline you like.');
  await until(() => w.vals.length >= 6);
  await ctx.say(`Your data: mean ${fr(Math.round(w.vals.reduce((a,b)=>a+b,0) / w.vals.length * 10) / 10)} (the gold balance point), median (the teal middle), mode (the tallest gold tower).`);
  w.preset([4, 4, 4, 7, 9]);
  await ctx.say('Demo set: 4, 4, 4, 7, 9. Mean = 28/5 = 5.6. Median (sorted: 4,4,4,7,9) = 4. Mode = 4 (appears 3×). Three different "centres", three different stories.');
  await ctx.ask({ q:'Mean of 2, 4, 6, 8?', o:['4','5','6','20'], a:1, why:'Sum 20, count 4 → mean 5. It\'s the balance point.' });
  await ctx.ask({ q:'Median of 3, 1, 9, 7, 5?', o:['5','9','3','7'], a:0, why:'Sort first: 1, 3, 5, 7, 9 → middle value 5.' });
};

LESSONS['data-prob'] = async ctx => {
  const w = ctx.mount('data');
  await ctx.say('Dice of Destiny: one roll is pure chaos. But roll <b>120 times</b> in 5 seconds and watch chaos grow a law.');
  await w.dice(120, 32);
  await ctx.say('Each face grabbed roughly 1/6 of the rolls. P(E) = favourable ÷ total — and in the long run, reality obeys it.');
  await ctx.say('P(six) = 1/6 ≈ 0.167. P(anything) is always between 0 (impossible) and 1 (certain).');
  await ctx.ask({ q:'P(odd number) on one die roll?', o:['1/6','1/3','1/2','2/3'], a:2, why:'Odd faces: 1, 3, 5 → 3 of 6 → P = 3/6 = 1/2.' });
  await ctx.ask({ q:'P(number greater than 4)?', o:['1/6','1/3','1/2','5/6'], a:1, why:'Faces 5 and 6 → 2 of 6 → 1/3.' });
};
