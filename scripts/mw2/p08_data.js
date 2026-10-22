/* ============ WORLDS & CONCEPTS ============ */
const WORLDS = [
{ id:'num', name:'Irrational Isles', tag:'Number Systems', color:'#3FCFC0',
  desc:'An archipelago where wild numbers swim free. Catch them, tame them, file them.',
  boss:{ name:'Rootkraken', title:'Keeper of Wild Numbers' },
  minions:['Radisprite','Floatfiend','Decimaw'],
  sparks:[
    { id:'num-sort', title:'Two Tribes', widget:'sort', brief:'Every number belongs to a tribe. File them all.',
      concept:{ name:'Rational vs Irrational', hook:'ordered citizens vs. wild rebels', pts:['<b>Rational</b> = can be written p/q — terminates or repeats (0.75, 22/7, −3)','<b>Irrational</b> = decimals that go forever without a pattern (√2, π, 0.101001000…)','Every real number is one or the other — no third tribe exists.'] } },
    { id:'num-root', title:'Hunt for √2', widget:'numline', brief:'Build √2 with your own hands using a right triangle.',
      concept:{ name:'Irrational lengths are real', hook:'√2 lives exactly between 1.41 and 1.42', pts:['A right triangle with legs 1 and 1 has hypotenuse <b>√2</b> (Pythagoras: 1²+1²=2)','Swing that length down onto the number line — it LANDS on a point','Irrational numbers are not "missing" — they fill the line solidly.'] } },
    { id:'num-pow', title:'Power Orb Fusion', widget:'orbs', brief:'Fuse orbs, split orbs, stack orbs — feel the exponent laws.',
      concept:{ name:'Laws of exponents', hook:'same base? add, subtract, multiply the powers', pts:['a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup> (fusing orbs adds power)','a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup> (splitting subtracts)','(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup> (a stack of stacks multiplies)'] } },
    { id:'num-rat', title:'Slay the Root Demon', widget:'shield', brief:'A demon squats in your denominator. Choose the right shield.',
      concept:{ name:'Rationalising the denominator', hook:'multiply by 1, in disguise', pts:['Multiply top and bottom by the same root — the value never changes','1/√2 × √2/√2 = √2/2 — the demon below is gone','For 1/(2+√3) use the <b>conjugate</b> (2−√3): (2+√3)(2−√3) = 4−3 = 1'] } } ] },
{ id:'poly', name:'Polynomial Peaks', tag:'Polynomials', color:'#F2B441',
  desc:'Golden mountains carved from x. Climb the degree ladder, cut the perfect square.',
  boss:{ name:'Polyphinx', title:'Sphinx of the Golden Sum' },
  minions:['Termite','Coeffiendir','Binomicon'],
  sparks:[
    { id:'poly-what', title:'Degree Ladder', widget:'sort', brief:'Not every expression deserves the name "polynomial".',
      concept:{ name:'What makes a polynomial', hook:'whole powers of x only', pts:['Polynomial = terms like ax<sup>n</sup> with n a <b>whole number</b> (0, 1, 2, 3…)','x<sup>2</sup>+3x is IN. x<sup>−1</sup>, √x, 2<sup>x</sup> are OUT — powers must be whole','<b>Degree</b> = highest power; degree 1 → linear, 2 → quadratic, 3 → cubic'] } },
    { id:'poly-zero', title:'Zero Hunter', widget:'zerolab', brief:'Where does the line touch the water? That x is a zero.',
      concept:{ name:'Zeroes of a polynomial', hook:'p(k) = 0 means k is a root', pts:['A <b>zero</b> of p(x) is a value k where p(k) = 0','On a graph, zeroes are exactly where the curve crosses y = 0','Linear polynomial ax+b has exactly one zero: x = −b/a'] } },
    { id:'poly-square', title:'The Square Cutter', widget:'square', brief:'Slice one big square into 4 pieces. Discover the most famous identity in algebra.',
      concept:{ name:'The (a+b)² identity', hook:'the 4-piece square proof', pts:['Cut a square of side (a+b): pieces are <b>a², ab, ab, b²</b>','So (a+b)² = a² + 2ab + b² — not a formula to memorise, a picture you\'ve SEEN','Try a=3, b=2: 9 + 12 + 4 = 25 = 5² ✓'] } },
    { id:'poly-ident', title:'Identity Dojo', widget:'square', brief:'The square has a darker twin: cutting corners reveals a² − b².',
      concept:{ name:'The identity family', hook:'same picture, different cuts', pts:['(a−b)² = a² − 2ab + b² (same square, b counted twice)','<b>a² − b² = (a+b)(a−b)</b> — steal the corner, slide the strip','(x+a)(x+b) = x² + (a+b)x + ab — a rectangle cut into 4'] } },
    { id:'poly-div', title:'Leftover Gold', widget:'remainder', brief:'Divide the treasure. The leftover gold has a secret shortcut.',
      concept:{ name:'Remainder & Factor theorem', hook:'the leftover equals p(a)', pts:['Dividing p(x) by (x−a): <b>remainder = p(a)</b> — no long division needed','If p(a) = 0, the remainder is zero → (x−a) is a <b>factor</b>','p(x) = x³−3x²+4x−4 at x=1: 1−3+4−4 = −2 → remainder −2, no factor'] } } ] },
{ id:'coord', name:'Cartesian Cove', tag:'Coordinate Geometry', color:'#5CA8FF',
  desc:'Blue lagoons mapped by four quadrants. Sail, drop anchor, read the map.',
  boss:{ name:'Grid Leviathan', title:'Serpent of the Axes' },
  minions:['Abissca','Ordiniate','Originis'],
  sparks:[
    { id:'coord-plane', title:'Set Sail', widget:'grid', brief:'Sail a ship with number commands: east, north, anchor.',
      concept:{ name:'The Cartesian plane', hook:'two numbers = one exact spot', pts:['<b>Origin (0,0)</b> is home port; x-axis runs east-west, y-axis north-south','Ordered pair (x, y): x = steps east, y = steps north','Four <b>quadrants</b>: I (+,+) · II (−,+) · III (−,−) · IV (+,−)'] } },
    { id:'coord-plot', title:'Treasure Marks', widget:'grid', brief:'Plant flags at exact coordinates before the tide comes in.',
      concept:{ name:'Plotting points', hook:'x first, then climb', pts:['To plot (3, −2): walk 3 east, then 2 south','<b>Abscissa</b> = x-coordinate, <b>ordinate</b> = y-coordinate','Points on the x-axis look like (5, 0) — y must be 0'] } },
    { id:'coord-read', title:'Read the Map', widget:'grid', brief:'Reverse the skill: read coordinates off sunken flags.',
      concept:{ name:'Reading coordinates', hook:'perpendicular drops tell the truth', pts:['Drop straight down to the x-axis → that number is the abscissa','Slide across to the y-axis → that number is the ordinate','Same point, two names: (x, y) ≠ (y, x) unless x = y'] } } ] },
{ id:'lin', name:'Lineforge', tag:'Linear Equations', color:'#9B8CFF',
  desc:'A violet forge where equations are hammered into straight roads.',
  boss:{ name:'The InfinityEngine', title:'Machine of Endless Roads' },
  minions:['Two-Variablean','Slopelord','Interceptus'],
  sparks:[
    { id:'lin-balance', title:'Balance Temple', widget:'balance', brief:'Equations are sacred scales. Touch both sides equally.',
      concept:{ name:'Solving linear equations', hook:'do the same thing to both sides', pts:['x + 3 = 8 → remove 3 from BOTH pans → x = 5','2x = 10 → halve both sides → x = 5','Always keep the beam level — that IS the equation'] } },
    { id:'lin-graph', title:'Roads of Solutions', widget:'line', brief:'Solutions of ax+by=c aren\'t lonely — they all live on one road.',
      concept:{ name:'Graph of a linear equation', hook:'every solution is a point on the line', pts:['ax + by = c has <b>infinitely many</b> solutions (x, y)','Plot them — they line up perfectly into a straight road','Check: a point satisfies the equation ⇔ it sits on the line'] } },
    { id:'lin-inf', title:'Twin Roads', widget:'line', brief:'Two equations, one graph. Twins, strangers, or the same road?',
      concept:{ name:'Two lines, three fates', hook:'cross, parallel, or identical', pts:['Same line (all solutions shared) → <b>infinitely many</b> common solutions','Crossing lines → exactly <b>one</b> common solution','Parallel lines → <b>no</b> common solution, ever'] } } ] },
{ id:'geo', name:"Euclid's Outpost", tag:'Geometry Foundations & Angles', color:'#A8D93F',
  desc:'Where the rules of all geometry were carved in lime-stone. Guard the beams.',
  boss:{ name:'Anglelord Zephyr', title:'Master of the Lime Beams' },
  minions:['Axiomite','Rayling','Transversal'],
  sparks:[
    { id:'geo-axiom', title:'Rules of the Realm', widget:'sort', brief:'Some statements are laws. Others are traps. Zap accordingly.',
      concept:{ name:'Axioms & postulates', hook:'truths so basic we don\'t prove them', pts:['<b>Axiom</b>: "things equal to the same thing are equal to each other"','<b>Postulate</b>: exactly ONE line passes through two given points','Two distinct lines can meet in at most ONE point'] } },
    { id:'geo-pair', title:'Laser Beams', widget:'angle', brief:'Drag the beam and watch two angles lock into a 180° pact.',
      concept:{ name:'Linear pair & vertical angles', hook:'straight line = 180° treaty', pts:['Angles on a straight line (linear pair) always sum to <b>180°</b>','When two lines cross: opposite (vertical) angles are <b>equal</b>','Adjacent angles on a line: if one is 110°, the other must be 70°'] } },
    { id:'geo-trans', title:'Stealth Crossing', widget:'angle', brief:'A transversal crosses two parallel lines — matching angles light up.',
      concept:{ name:'Parallel lines & transversals', hook:'F, Z and C shape angle treaties', pts:['<b>Corresponding</b> (F-shape) angles are equal','<b>Alternate interior</b> (Z-shape) angles are equal','<b>Co-interior</b> (C-shape) angles sum to 180°'] } },
    { id:'geo-tsum', title:'Corner Patrol', widget:'angle', brief:'Stress-test a triangle\'s corners. The sum never cracks.',
      concept:{ name:'Angle sum of a triangle', hook:'three corners always pay 180°', pts:['∠A + ∠B + ∠C = 180° for EVERY triangle, any shape','<b>Exterior angle</b> = sum of the two opposite interior angles','Two angles known → third is free: 180° minus the other two'] } } ] },
{ id:'tri', name:'Delta Domain', tag:'Triangles & Heron', color:'#FF7A6E',
  desc:'Coral canyons of congruence. Forge twins, crown isosceles, dig moats.',
  boss:{ name:'Tri-Chimera', title:'Beast of Three Faces' },
  minions:['Scalenex','Isoscelly','Equilaterrex'],
  sparks:[
    { id:'tri-cong', title:'Twin Forges', widget:'tri', brief:'Two forges, same blueprint. Snap them together.',
      concept:{ name:'Congruence rules', hook:'SSS · SAS · ASA · RHS', pts:['<b>SSS</b>: all three pairs of sides equal → congruent','<b>SAS</b>: two sides + the angle BETWEEN them','<b>ASA</b>: two angles + the side between them · <b>RHS</b>: right angle + hypotenuse + side'] } },
    { id:'tri-iso', title:'Crowned Triangle', widget:'angle', brief:'Give a triangle two equal legs and watch its base angles bow equally.',
      concept:{ name:'Isosceles base angles', hook:'equal sides → equal base angles', pts:['If AB = AC then ∠B = ∠C — automatically','The converse too: equal base angles force equal sides','CPCT: Corresponding Parts of Congruent Triangles are equal'] } },
    { id:'tri-heron', title:'The Moat Calculator', widget:'tri', brief:'No heights, no angles — just 3 sides. Heron\'s moat-filling trick.',
      concept:{ name:"Heron's formula", hook:'area from three sides alone', pts:['First compute <b>s = (a+b+c)/2</b> (semi-perimeter)','Area = √(s(s−a)(s−b)(s−c))','Sides 3,4,5: s=6 → √(6·3·2·1) = √36 = 6 sq units'] } } ] },
{ id:'quad', name:'Quad Bastion', tag:'Quadrilaterals', color:'#FFA04D',
  desc:'A fortress of four-sided walls. Slice it, dance it, bridge it.',
  boss:{ name:'Quad Golem', title:'Warden of the Four Walls' },
  minions:['Parallera','Rhombunt','Trapezoidon'],
  sparks:[
    { id:'quad-slice', title:'Fort Slicer', widget:'quad', brief:'One slice turns any fortress into two triangles.',
      concept:{ name:'Angle sum of a quadrilateral', hook:'two triangles in a trenchcoat', pts:['A diagonal cuts a quadrilateral into 2 triangles','So interior angles sum to <b>180° + 180° = 360°</b>','Missing angle trick: 360° minus the other three'] } },
    { id:'quad-para', title:'Parallelogram Dance', widget:'quad', brief:'Twist it, skew it — a parallelogram refuses to lose its properties.',
      concept:{ name:'Parallelogram properties', hook:'equal opposites, bisecting diagonals', pts:['Opposite sides are equal AND parallel','Opposite angles are equal; adjacent ones sum to 180°','<b>Diagonals bisect each other</b> — cut at the same midpoint'] } },
    { id:'quad-mid', title:'Bridge of Halves', widget:'quad', brief:'Join the midpoints of two sides — a perfect half-bridge appears.',
      concept:{ name:'Midpoint theorem', hook:'the half-size parallel bridge', pts:['Line joining midpoints of two sides is <b>parallel</b> to the third side','And it is exactly <b>half</b> as long','Triangle midpoints form 4 mini congruent triangles'] } } ] },
{ id:'circ', name:'Circle Sanctum', tag:'Circles', color:'#F473B9',
  desc:'A rose-marble temple of perfect curves. Chords, angles and a sacred ring.',
  boss:{ name:'Ringwraith Circulus', title:'Phantom of the Perfect Curve' },
  minions:['Chordling','Arcwisp','Tangentus'],
  sparks:[
    { id:'circ-chord', title:'Sword & Chord', widget:'circle', brief:'Drop a perpendicular sword from the centre — chords split in half.',
      concept:{ name:'Chord properties', hook:'the centre cuts chords fairly', pts:['A perpendicular from the centre <b>bisects</b> any chord','Equal chords sit at <b>equal distances</b> from the centre','Bigger chord → smaller distance from centre'] } },
    { id:'circ-insc', title:'Half-Angle Secret', widget:'circle', brief:'The centre sees double what the edge sees. Drag and verify.',
      concept:{ name:'Central vs inscribed angles', hook:'edge view = half the centre view', pts:['Angle subtended at the centre = <b>double</b> the angle at the circumference','Angles in the <b>same segment</b> are equal','Angle in a <b>semicircle</b> is exactly 90°'] } },
    { id:'circ-cyclic', title:'Ring of Gems', widget:'circle', brief:'Four gems on one ring: opposite angles pair to 180°. Drag to test.',
      concept:{ name:'Cyclic quadrilaterals', hook:'opposite angles are 180° partners', pts:['All 4 vertices on one circle → cyclic quadrilateral','<b>Opposite angles sum to 180°</b> — drag D anywhere, it holds','Exterior angle of a cyclic quad = interior opposite angle'] } } ] },
{ id:'solid', name:'Solid Spires', tag:'Surface Areas & Volumes', color:'#5FD9E8',
  desc:'Crystal spires of cubes, cylinders and spheres. Unwrap them, fill them.',
  boss:{ name:'Cubicron', title:'The Great Unwrapper' },
  minions:['Cubix','Cylindra','Spherix'],
  sparks:[
    { id:'solid-net', title:'Box Unwrapper', widget:'solid', brief:'Pull the slider — every 3D box opens into flat paper.',
      concept:{ name:'Nets & surface area', hook:'SA = the wrapping paper', pts:['Unwrap a cube → 6 identical squares → SA = 6a²','Cylinder unrolls: rectangle (2πr × h) + 2 circles → CSA = 2πrh','Surface area answers: "how much paper/paint/wrapping?"'] } },
    { id:'solid-vol', title:'Cube Filler', widget:'solid', brief:'Fill a box with unit cubes. Volume is just counting.',
      concept:{ name:'Volume as filling', hook:'how many cubes fit inside', pts:['Volume = number of unit cubes that fill the solid','Cuboid: V = l × b × h · Cube: V = a³','Cylinder: V = πr²h (circle base × height) · Sphere: V = (4/3)πr³'] } } ] },
{ id:'data', name:'Data Dominion', tag:'Statistics & Probability', color:'#4ED88E',
  desc:'A mint-green kingdom of numbers waiting to be counted. Balance it, roll it.',
  boss:{ name:'Baron Histogram', title:'Earl of Endless Rolls' },
  minions:['Meanie','Medianix','Modus'],
  sparks:[
    { id:'data-mmm', title:'Balance the Beans', widget:'data', brief:'Drop beans into columns — watch mean, median and mode emerge.',
      concept:{ name:'Mean, median, mode', hook:'three different "centres"', pts:['<b>Mean</b> = sum ÷ count — the balance point of the data','<b>Median</b> = middle value after sorting (n+1)/2 th','<b>Mode</b> = most frequent value — the tallest tower'] } },
    { id:'data-prob', title:'Dice of Destiny', widget:'data', brief:'Roll 120 times in seconds. Watch chaos obey a law.',
      concept:{ name:'Probability basics', hook:'long-run fairness', pts:['P(E) = favourable outcomes ÷ total outcomes','A die: P(six) = 1/6 ≈ 0.167 — never guaranteed on ONE roll','Roll enough times and each face\'s share approaches its probability'] } } ] }
];
const WORLD_BY_ID = {}; WORLDS.forEach(w => WORLD_BY_ID[w.id] = w);
const TOTAL_SPARKS = WORLDS.reduce((n, w) => n + w.sparks.length, 0);
const SPARK_BY_ID = {}; WORLDS.forEach(w => w.sparks.forEach(s => { s.world = w; SPARK_BY_ID[s.id] = s; }));
function worldUnlocked(save, wi){
  if (wi === 0) return true;
  const prev = WORLDS[wi - 1], st = save.worlds[prev.id];
  if (!st) return false;
  return prev.sparks.filter(s => st.sparks[s.id]).length >= Math.ceil(prev.sparks.length * 0.6) || st.boss;
}
function worldProgress(save, w){
  const st = save.worlds[w.id];
  if (!st) return { sparks:0, total:w.sparks.length, drills:0, boss:0 };
  return { sparks: w.sparks.filter(s => st.sparks[s.id]).length, total: w.sparks.length, drills: w.sparks.filter(s => st.drills[s.id]).length, boss: st.boss };
}
function levelOf(xp){ return Math.floor(Math.sqrt(xp / 60)) + 1; }
function xpForLevel(l){ return 60 * (l - 1) * (l - 1); }
