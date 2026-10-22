<script>
'use strict';
/* ================= WORLD DATA · part 1 (num, poly, grid, line) ================= */

WORLDS=[
{id:'num',n:'Number Nagar',ch:'Chapter 1 · Number Systems',ic:'🔢',
 tag:'Where every number — from 0 to √2 — finds its home on the number line.',
 boss:{n:'ZAROX',ti:'The Null Devourer',taunt:'Your little number families cannot save you, Warrior. I swallow every number you cannot classify!',art:'orb'},
 concepts:[

 {id:'num1',t:'The Number Family',sub:'NCERT 1.1 · Naturals → Reals',
  hook:{ic:'🪜',s:'Riya keeps score during a cricket match: 0, 1, 2, 3… When her team owes 5 runs by DLS, the scoreboard shows −5. At the canteen they split a samosa into quarters — 3/4 each. Then the sports teacher draws the cricket field diagonally and whispers: "That diagonal of a 1 m square? Its length is √2 — and no fraction can ever write it down."',
        w:'One number line holds ALL of them: naturals, zero, negatives, fractions, and wild irrationals. Knowing which family a number belongs to decides which rules apply to it.'},
  facts:[['Five families, nested like dolls','N (1,2,3…) ⊂ W (adds 0) ⊂ Z (adds negatives) ⊂ Q (adds fractions p/q, q≠0) ⊂ R (adds irrationals). Every set swallows the one before it.'],
         ['Rationals are ratios','A rational number is any p/q where p, q are integers and q ≠ 0. 3, −7, 0.25, 22/7 — all rationals.'],
         ['Irrationals break the ratio rule','√2, √3, π cannot be written as p/q with integers. Their decimals go on forever WITHOUT any repeating block.'],
         ['The number line is full','Every point on the number line is a real number, and every real number sits on exactly one point. Nothing is missing.']],
  lab:['numline',{mode:'family'}],
  tasks:['Tap each family chip and watch which part of the line lights up','Drag the orange pin onto a negative integer like −3','Find a spot that belongs to NO family except Reals (√2 territory)'],
  ex:{t:'Classify: −7, 0, 22/7, √5, 3.14',
      steps:[['−7','It is negative, so not Natural or Whole. It IS an integer → also rational, also real. Family: Integers.'],
             ['0','Zero is the member that separates N from W: not natural, but whole → also integer, rational, real. Family: Whole numbers.'],
             ['22/7','A ratio of two integers → rational (famous as an approximation of π, but it is still rational!). Family: Rationals.'],
             ['√5 and 3.14','√5 is irrational — no fraction equals it. 3.14 is finite → rational. Fun: they are extremely close, but one is rational and the other is not!']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const items=[['-7','Integers'],['0','Whole numbers'],['5','Natural numbers'],['-3/4','Rational numbers'],['2/9','Rational numbers'],['-12','Integers'],['100','Natural numbers'],['-1','Integers'],['1/2','Rational numbers']];
      const it=pick(items);
      return Q('The SMALLEST number set that contains '+it[0]+' is…',it[1],['Natural numbers','Whole numbers','Integers','Rational numbers','Real numbers'].filter(s=>s!==it[1]).slice(0,3),'Slide down the chain N ⊂ W ⊂ Z ⊂ Q ⊂ R and stop at the first set that contains '+it[0]+'. That is '+it[1]+'.','Nest: N ⊂ W ⊂ Z ⊂ Q ⊂ R — pick the innermost set that fits.');
    }
    if(t===2){
      const trues=['Every whole number is an integer','Every integer is a rational number','0 is a whole number','Every natural number is a rational number','√2 is a real number','Every rational number is a real number'];
      const falses=['Every integer is a whole number','Every rational number is an integer','0 is a natural number','√2 is a rational number','Every real number is a rational number','Every natural number is negative'];
      const tS=pick(trues);const fs=shuf(falses).slice(0,3);
      return Q('Which statement is TRUE?',tS,fs,'Because W ⊂ Z ⊂ Q ⊂ R, every member of the smaller set is automatically a member of the bigger one — never the reverse.','Check each option against the nesting N ⊂ W ⊂ Z ⊂ Q ⊂ R.');
    }
    const irr=pick(['√3','√5','√7','√10','π']);
    const rats=shuf(['0.25','22/7','-4','1/3','2.5','0.9','3/8']).slice(0,3);
    return Q('Which of these is an IRRATIONAL number?',irr,rats,irr+' cannot be written as a ratio of two integers — its decimal never terminates and never repeats.','Irrationals hide under roots of non-perfect-squares (and π).');
  }},

 {id:'num2',t:'Density: Numbers Between',sub:'NCERT 1.1 · Infinitely many rationals',
  hook:{ic:'🪑',s:'Aarav and Zoya sit on a bench at marks 1/4 and 1/3. "There is no seat between us," says Zoya. Their maths teacher smiles, walks over, and places a new bench at 7/24 — exactly the mean. "Now?" "Another bench fits between THOSE two!" Realises Aarav. "We could do this forever…"',
        w:'And that is the whole magic: between any two rationals you can always fit another — infinitely many. No two rationals are ever "next to" each other.'},
  facts:[['The mean never misses','Between rationals a and b, (a+b)/2 is ALWAYS a rational lying strictly between them.'],
         ['Infinitely many','Because each new number creates two new gaps, the process never ends: there are infinitely many rationals between ANY two rationals.'],
         ['Even between rational and irrational','Between 1 and √2 there are infinitely many rationals too (like 1.41, 1.414, 1.4142…).'],
         ['Same value, many dresses','1/2 = 2/4 = 3/6 — writing with a bigger common denominator makes hunting numbers between two fractions easier.']],
  lab:['numline',{mode:'between'}],
  tasks:['Set the two pins to any two positions and tap "Insert midpoint" three times','Watch the gaps never run out — try 6 insertions!'],
  ex:{t:'Find 3 rationals between 1/4 and 1/3',
      steps:[['Make denominators friendly','1/4 = 6/24 and 1/3 = 8/24. Now the gap is visible: only 7/24 sits between — we need more dresses!'],
             ['Magnify further','Write with denominator 48: 1/4 = 12/48, 1/3 = 16/48. Candidates: 13/48, 14/48, 15/48.'],
             ['Verify with the mean','Mean of 1/4 and 1/3 = (6/24 + 8/24)/2 = (14/24)/2 = 7/24 ✓ — exactly one of our findings. Three rationals: 13/48, 7/24 (14/48), 15/48.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[[1,4,1,3],[2,3,3,4],[1,2,2,3],[1,5,2,5],[3,4,4,5],[1,6,1,3],[2,5,3,5],[1,3,1,2],[1,4,1,2],[3,5,4,5]];
      const [n1,d1,n2,d2]=pick(bank);
      const mean=fr(n1*d2+n2*d1,2*d1*d2);
      return Q('A rational number strictly between '+n1+'/'+d1+' and '+n2+'/'+d2+' is…',mean,['1/2','1/3','2/3','1/4','3/4','2/5','3/5','1/5','5/6','1/6'].filter(s=>s!==mean).slice(0,3),'Mean method: ('+n1+'/'+d1+' + '+n2+'/'+d2+')/2 = ('+(n1*d2+n2*d1)+'/'+(2*d1*d2)+')/2 = '+mean+' — always a rational between them.','Take the mean: (a + b)/2.');
    }
    if(t===2){
      return Q('How many rational numbers lie between 1/5 and 1/4?','Infinitely many',['Exactly 10','Exactly 100','None'],'Every new number creates fresh gaps, so the supply NEVER runs out. The answer is always infinitely many.','Density: you can always take another mean!');
    }
    const opts=[['7/24','1/4 and 1/3'],['13/48','1/4 and 1/3'],['15/48','1/4 and 1/3'],['3/8','1/3 and 1/2'],['5/12','1/3 and 1/2'],['7/12','1/2 and 2/3'],['11/24','2/5 and 1/2']];
    const o=pick(opts);
    return Q('The number '+o[0]+' lies strictly between…',o[1],['1/2 and 1','0 and 1/4','3/4 and 1','1/5 and 1/4','2/3 and 3/4','1 and 2'].filter(s=>s!==o[1]).slice(0,3),'Convert to common denominators and compare: '+o[0]+' fits inside the interval '+o[1]+'.','Write both boundary fractions with a common denominator and compare.');
  }},

 {id:'num3',t:'Decimal Expansions',sub:'NCERT 1.2 · Terminating & recurring',
  hook:{ic:'🔁',s:'The bus odometer flips 0.375 km and stops dead. The milk booth\'s meter, though, keeps whispering 3.3333… forever, and the magic meter repeats 4.545454… like a beat drop. Three meters, three personalities — and the secret behind each one is hidden in ONE number: the denominator.',
        w:'Decide from p/q alone whether a decimal will terminate, repeat, or go wild. This single trick answers a full exam question every year.'},
  facts:[['The denominator decides everything','Write the fraction in LOWEST form. If the denominator is only 2s and 5s (like 8 = 2³, 40 = 2³·5), the decimal terminates.'],
         ['Any other denominator repeats','Denominators with 3, 7, 11… force the decimal to repeat a block forever (non-terminating recurring).'],
         ['The 9s trick','0.777… = 7/9, 0.454545… = 45/99 = 5/11, 0.123123… = 123/999. A repeating block of one digit → divide by 9; two digits → 99; three → 999.'],
         ['The legendary 0.999…','0.999… is EXACTLY 1. Let x = 0.999…, then 10x = 9.999…, so 10x − x = 9, x = 1. Infinity decimals can surprise you!']],
  lab:['numline',{mode:'decimal'}],
  tasks:['Reveal the digits of 1/3 and 1/7 — spot the repeating block','Reveal 17/8 and confirm it stops after 3 digits','Type-the-fact: which denominators (2s and 5s) terminate?'],
  ex:{t:'Classify the expansions of 17/8 and 1/7',
      steps:[['Factor the denominator','17/8: 8 = 2³ — only 2s! Verdict: terminating.'],
             ['Confirm by dividing','17 ÷ 8 = 2.125. Three digits, done.'],
             ['Now 1/7','7 is neither 2 nor 5 → non-terminating recurring: 0.142857142857… a 6-digit block cycling forever.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const term=pick(['17/8','9/40','13/25','7/20','21/16','11/125']);
      const rec=pick(['1/7','5/11','4/15','10/21','2/3','8/13']);
      if(Math.random()<0.5){
        return Q('The decimal expansion of '+term+' is…','Terminating',['Non-terminating recurring','Non-terminating non-recurring','None of these'],term+' in lowest form has a denominator made of only 2s and 5s, so the decimal must terminate.','Reduce the fraction, then factor the denominator into primes.');
      }
      return Q('The decimal expansion of '+rec+' is…','Non-terminating recurring',['Terminating','Non-terminating non-recurring','None of these'],rec+' has a prime other than 2 or 5 in the denominator, so the digits must repeat a block forever.','Look for primes like 3, 7, 11 in the denominator.');
    }
    if(t===2){
      const bank=[['0.777…','7/9'],['0.555…','5/9'],['0.888…','8/9'],['0.222…','2/9'],['0.454545…','5/11'],['0.272727…','3/11'],['0.818181…','9/11'],['0.363636…','4/11'],['0.123123…','41/333'],['0.246246…','82/333']];
      const [dec,frv]=pick(bank);
      return Q(dec+' written as a fraction (lowest form) is…',frv,['1/9','2/11','7/11','41/333','5/9','3/11','8/9','82/333','1/3','2/7'].filter(s=>s!==frv).slice(0,3),'Repeating block of '+((dec.length>7)?'three':'one or two')+' digits → divide the block by 9, 99 or 999, then reduce.','Block ÷ (9, 99 or 999), then reduce.');
    }
    const bank=[['3/8','0.375'],['7/8','0.875'],['5/16','0.3125'],['9/40','0.225'],['7/20','0.35'],['13/25','0.52'],['21/16','1.3125']];
    const [f,dv]=pick(bank);
    return Q(f+' as a decimal is…',dv,['0.38','0.87','0.31','0.23','0.34','0.53','1.31','0.375','0.875'].filter(s=>s!==dv).slice(0,3),'Divide directly: '+f+' = '+dv+'. Terminating because the denominator is built from 2s (and 5s).','Long divide — or trust the 2s-and-5s promise that it will terminate.');
  }},

 {id:'num4',t:'Irrationals & the Root Spiral',sub:'NCERT 1.2 · Locating √2, √3, √n',
  hook:{ic:'📐',s:'2,500 years ago a Greek sailor-geometer, Theodorus, kept drawing right triangles with one arm of length 1, hinged tip-to-tail: √2, then √3, then √4… until his compass reached √17. Legend says when the Pythagoreans proved √2 was NOT a fraction, they threw a feast — and, some say, threw a man overboard for revealing the secret.',
        w:'The spiral is a MACHINE for placing irrational roots exactly on the number line — no measuring, pure construction. Exam papers love asking "locate √3.5-style values".'},
  facts:[['√2 is the first rebel','No integers p, q satisfy p/q = √2. Its decimal 1.41421356… never terminates and never repeats → irrational.'],
         ['The spiral construction','At the tip of √(k−1), raise a perpendicular of length 1. The new hypotenuse from the origin is √k. Each triangle adds one unit arm.'],
         ['Compass arcs drop roots onto the line','Swing an arc centred at 0 through the spiral tip down to the number line: that landing point IS √k.'],
         ['Squeeze test','Since 1.4² = 1.96 < 2 < 2.25 = 1.5², √2 lies between 1.4 and 1.5 — squeeze between perfect squares to locate any √n.']],
  lab:['spiral',{}],
  tasks:['Build the spiral up to √5 — watch each hypotenuse get labelled','Drop the compass arc and land √2 on the number line','Use the squeeze test: which two integers trap √10?'],
  ex:{t:'Locate √3 on the number line',
      steps:[['Start with √2','Mark 0 and 1. At 1, erect a perpendicular of length 1. Join to 0: hypotenuse = √(1²+1²) = √2.'],
             ['Grow the spiral','At the tip of √2, raise another unit perpendicular. The new hypotenuse = √(2+1) = √3.'],
             ['Arc it home','Centre the compass at 0, radius √3, swing an arc down to the number line. The landing point is √3 ≈ 1.732, between 1 and 2.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const n=pick([2,3,5,6,7,8,10,11,12,13,14,15,17,18,19,20]);
      const k=Math.floor(Math.sqrt(n));
      return Q('√'+n+' lies between which two consecutive integers?',k+' and '+(k+1),[(k-1)+' and '+k,(k+1)+' and '+(k+2),(k+2)+' and '+(k+3),(k-2)+' and '+(k-1)],(k*k)+' < '+n+' < '+((k+1)*(k+1))+', so √'+n+' is trapped between '+k+' and '+(k+1)+'.','Square the neighbouring integers and trap n between perfect squares.');
    }
    if(t===2){
      const bank=[['√8','2√2'],['√12','2√3'],['√20','2√5'],['√45','3√5'],['√50','5√2'],['√75','5√3'],['√98','7√2'],['√27','3√3'],['√32','4√2']];
      const [q,a]=pick(bank);
      return Q(q+' simplifies to…',a,['2√2','2√3','2√5','3√2','3√3','3√5','4√2','5√2','5√3','7√2'].filter(s=>s!==a).slice(0,3),'Pull out the biggest perfect-square factor: '+q+' = '+a+'.','Factor out the largest perfect square under the root.');
    }
    return Q('A decimal that neither terminates nor repeats is…','Always irrational',['Always rational','Sometimes rational','Always an integer'],'Non-terminating + non-recurring decimals are exactly the irrationals — that is their identity card.','Remember the two tests: terminating/repeating → rational; otherwise → irrational.');
  }},

 {id:'num5',t:'Exponent Laws & Rationalising',sub:'NCERT 1.4–1.6 · Powers & surds',
  hook:{ic:'🦠',s:'A scientist counts bacteria: 2, 4, 8, 16… "Doubling is just powers of 2," she says. Then a microbe shears one cell into THREE parts each hour — and suddenly she needs 2^(1/2) and 5^(1/3): powers with FRACTIONS. And when a formula demands 1/√2 in the denominator, she refuses to leave a surd downstairs — she rationalises the basement.',
        w:'Exponent laws work for ALL real exponents, and a rationalised denominator is the exam-clean form every checker wants to see.'},
  facts:[['The four power laws','aᵐ·aⁿ = aᵐ⁺ⁿ · aᵐ/aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ · a⁻ⁿ = 1/aⁿ. They hold for any real a > 0.'],
         ['Fractional exponents are roots','a^(1/n) means the n-th root: 4^(1/2) = 2, 8^(1/3) = 2, 32^(1/5) = 2.'],
         ['Rationalise single surds','1/√n = √n/n: multiply top and bottom by √n. The surd moves upstairs, the denominator becomes clean.'],
         ['Rationalise with conjugates','For 1/(√7 − 2), multiply by (√7 + 2)/(√7 + 2). The denominator becomes 7 − 4 = 3 by the (a−b)(a+b) pattern.']],
  lab:['expo',{}],
  tasks:['Slide the base and exponent — watch the laws fire in the readout','Rationalise 1/√7 in the surd tab','Try the conjugate machine on 1/(√5 − 2)'],
  ex:{t:'Rationalise 1/(√7 − 2) and simplify 2^(1/2)·2^(1/3)',
      steps:[['Spot the conjugate','Multiply by (√7 + 2)/(√7 + 2): denominator becomes (√7 − 2)(√7 + 2) = 7 − 4 = 3.'],
             ['Clean result','Answer: (√7 + 2)/3. No surd survives downstairs.'],
             ['Power law in action','2^(1/2)·2^(1/3) = 2^(1/2 + 1/3) = 2^(5/6) — add exponents when bases multiply.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const n=pick([2,3,5,6,7,10,11]);
      return Q('The rationalised form of 1/√'+n+' is…','√'+n+'/'+n,['√'+n+'/'+(n*n),n+'√'+n,'√'+n+'/2','1/√'+n,'√(2'+n+')/'+n],'Multiply top and bottom by √'+n+': (1·√'+n+')/(√'+n+'·√'+n+') = √'+n+'/'+n+'.','Multiply by √n / √n.');
    }
    if(t===2){
      const bank=[['64^(1/2)','8',['6','4','16']],['32^(1/5)','2',['4','8','16']],['125^(1/3)','5',['15','25','3']],['(3²)³','729',['36','81','27']],['2^(1/2)·2^(1/3)','2^(5/6)',['2^(1/6)','2^(2/5)','4^(1/6)']],['5^(1/3)·5^(2/3)','5',['25','5^(2/9)','1']]];
      const b=pick(bank);
      return Q('The value of '+b[0]+' is…',b[1],b[2],'Apply the laws: roots are fractional powers, and multiplying equal bases adds the exponents.','a^(1/n) = n-th root; multiply same bases → add exponents.');
    }
    const pairs=[[3,2,1],[5,1,4],[7,3,4],[6,2,4],[10,1,9]];
    const [a,b,c]=pick(pairs);
    return Q('(√'+a+' + √'+b+')(√'+a+' − √'+b+') equals…',String(a-b),[String(a+b),String(a*b),'√'+(a*b),String(a),'2'+b],'Pattern (x+y)(x−y) = x² − y²: (√'+a+')² − (√'+b+')² = '+a+' − '+b+' = '+(a-b)+'.','Use (a+b)(a−b) = a² − b² — the squares kill the roots.');
  }}
]}
,
{id:'poly',n:'Polynomial Kingdom',ch:'Chapter 2 · Polynomials',ic:'🧩',
 tag:'Term-builders, zero-hunters and the four legendary identities.',
 boss:{n:'X-ANATH',ti:'Keeper of Degrees',taunt:'Every polynomial that enters my kingdom loses its degree… and its power. Expand or perish, Warrior!',art:'crystal'},
 concepts:[

 {id:'poly1',t:'Meet the Polynomials',sub:'NCERT 2.1 · Terms & degrees',
  hook:{ic:'🏗️',s:'Think of x as a Lego brick. Stick 3 bricks: 3x. Add a flat 2-brick plate: 3x + 2. Stack a triple-decker: x³ + 2x + 1 — a cubic skyscraper. But the moment you try 1/x or √x, the building inspector shuts the site down: those are NOT polynomials.',
        w:'Degree = the tallest tower of x. It decides the graph\'s shape, the number of zeros, and the whole behaviour of the polynomial.'},
  facts:[['Whole powers only','A polynomial in x has terms like a₀ + a₁x + a₂x² + … where every power of x is a whole number (0, 1, 2, 3…).'],
         ['Degree = highest power','5x³ − 2x² + 7 has degree 3. A constant like 9 has degree 0. The zero polynomial has NO degree.'],
         ['Names by degree','Degree 1 → linear (2x + 3). Degree 2 → quadratic (x² − 5x + 6). Degree 3 → cubic (x³ + 1).'],
         ['The rule-breakers','1/x = x⁻¹ and √x = x^(1/2) break the whole-power rule, so they are NOT polynomials — however friendly they look.']],
  lab:['degree',{}],
  tasks:['Toggle the x³ chip and watch the degree update','Switch on √x and 1/x — hear the "NOT a polynomial" alarm','Build a quadratic: exactly one x² tower as the tallest'],
  ex:{t:'Dissect p(x) = 4x² − 3x + 7',
      steps:[['Read the terms','Three terms: 4x², −3x, +7. Coefficients: 4, −3, 7.'],
             ['Find the degree','Highest power of x is 2 → degree 2 → a quadratic polynomial.'],
             ['Name the parts','Coefficient of x is −3; the constant term is 7; leading coefficient (of x²) is 4.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[['2x³ − x² + 5','3'],['7 − x + 4x³','3'],['x² − 9','2'],['5t² + 3t − 1','2'],['3y + 8','1'],['x³ + x² + x + 1','3'],['9 − 2y²','2'],['11 − 4z','1']];
      const b=pick(bank);
      return Q('The degree of the polynomial '+b[0]+' is…',b[1],['1','2','3','0','4'].filter(s=>s!==b[1]).slice(0,3),'The degree is the highest power of the variable that actually appears: here it is '+b[1]+'.','Scan for the tallest power of x.');
    }
    if(t===2){
      const bad=pick(['√x + 1','1/x + 2','x + 1/x','3√x − 5','x^(1/2) + 7']);
      return Q('Which of these is NOT a polynomial?',bad,['x² − 5x + 6','2x³ + 3x − 1','4x² + 9','x + 7','5y³ − y','7z − 2z²'].slice(0,3),bad+' has a negative or fractional power of the variable — the polynomial rulebook demands whole-number powers.','Look for x under a root or in a denominator.');
    }
    const bank=[['5x³ − 2x² + 7','−2'],['3x² + 8x − 4','3'],['7 − 4x²','−4'],['x³ + x² − 6','1'],['2x² − x + 9','2']];
    const b=pick(bank);
    return Q('In the polynomial '+b[0]+', the coefficient of x² is…',b[1],['2','5','−4','7','1','3','8','−1','−6'].filter(s=>s!==b[1]).slice(0,3),'The coefficient is the number multiplying x², signs included: it is '+b[1]+'.','Sign travels with the term!');
  }},

 {id:'poly2',t:'Zeros of Polynomials',sub:'NCERT 2.2–2.3 · Where p(x) = 0',
  hook:{ic:'🎚️',s:'p(x) is a machine with a slider. Slide x to 2 and the display reads 0 — CLUNK, the machine switches off. That value of x is called a ZERO. On the graph, zeros are exactly the spots where the curve dives into (or kisses) the x-axis. Every crossing is a solution of p(x) = 0.',
        w:'Finding zeros = solving equations. It links algebra (p(r) = 0) to geometry (graph meets the x-axis) — a favourite exam connection.'},
  facts:[['Definition','r is a zero of p(x) if p(r) = 0. Substitute and check — that is the entire test.'],
         ['Linear has exactly one','The zero of p(x) = ax + b is x = −b/a. One line, one crossing.'],
         ['Quadratic: at most two','A quadratic graph (parabola) can cross the x-axis twice, touch once, or miss it — so 2, 1 or 0 real zeros.'],
         ['Zeros live on the x-axis','Geometrically, the zeros of p(x) are the x-coordinates of the points where its graph meets the x-axis.']],
  lab:['polygraph',{}],
  tasks:['Slide a and b until the line\'s zero lands on x = 2','Switch to the quadratic tab — slide c and watch zeros appear/disappear','Make the parabola miss the x-axis completely (0 real zeros)'],
  ex:{t:'Verify that 2 is a zero of p(x) = x² − 3x + 2',
      steps:[['Substitute','p(2) = 2² − 3(2) + 2 = 4 − 6 + 2.'],
             ['Simplify','4 − 6 + 2 = 0. The machine reads zero!'],
             ['Conclusion','2 IS a zero. (So is 1: p(1) = 1 − 3 + 2 = 0.) The parabola crosses the x-axis at x = 1 and x = 2.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const a=pick([2,3,4,5,6]),b=pick([-6,-9,-12,4,8,10]);
      const z=fr(-b,a);
      return Q('The zero of p(x) = '+a+'x + ('+b+') is…',z,['2','3','-2','-3','1/2','-1/3','4','-4','3/2'].filter(s=>s!==z).slice(0,3),'Set '+a+'x + ('+b+') = 0 → x = '+z+'.','Zero of ax + b is −b/a.');
    }
    if(t===2){
      const r1=pick([1,2,3,4,-1,-2]),r2=pick([5,6,7,2,3,-3]);
      if(r1===r2)return this.gen();
      const b=-(r1+r2),c=r1*r2;
      const k=pick([r1,r2,0,7]);
      const val=k*k+b*k+c;
      const isZero=val===0;
      return Q('p(x) = x² + ('+b+')x + '+c+'. What is p('+k+')?',String(val),[String(val+1),String(val-1),String(-val),String(val+2),'0','1','-1'].filter(s=>s!==String(val)).slice(0,3),'Substitute: p('+k+') = '+k+'² + ('+b+')('+k+') + '+c+' = '+val+'.'+(isZero?' Since it is 0, '+k+' is a zero!':' Since it is not 0, '+k+' is not a zero.'),'Just substitute x = '+k+' and compute.');
    }
    return Q('How many zeros can a quadratic polynomial have (at most)?','2',['1','3','Infinitely many'],'A parabola can meet the x-axis at most twice — degree 2 means at most 2 real zeros.','Degree n → at most n zeros.');
  }},

 {id:'poly3',t:'Identity Lab ★ The Square-Cut',sub:'NCERT 2.4 · The four identities',
  hook:{ic:'🟫',s:'A mason must tile a square courtyard of side (a + b). He orders big a×a tiles, slim a×b strips, and tiny b×b corner tiles. When the job is done he counts: ONE big square, TWO strips, ONE corner — total area a² + 2ab + b². But the courtyard side is (a + b), so its area is (a + b)². Same floor, two countings — that is the identity, proven with tiles, not algebra!',
        w:'Identities are true for EVERY value of a and b. Memorise them as pictures, not strings — the square-cut makes them unforgettable and unconfusable.'},
  facts:[['The crown identity','(a + b)² = a² + 2ab + b² — one a², one b², TWO ab rectangles filling the cross gap.'],
         ['The minus version','(a − b)² = a² − 2ab + b². Watch the signs: the two strips you remove overlap at the b² corner, so b² comes BACK positive.'],
         ['Difference of squares','(a + b)(a − b) = a² − b² — cut the b² corner from an a×a square and slide it to complete a rectangle.'],
         ['Two-term product','(x + a)(x + b) = x² + (a + b)x + ab — multiply mentally: outer + inner gives (a+b)x.']],
  lab:['ident',{}],
  tasks:['Set a = 3, b = 2 in the (a+b)² tab and verify 25 = 9 + 12 + 4','Open the (a−b)² tab: why does b² stay positive?','Try (a+b)(a−b) with a = 5, b = 3 and watch the corner slide'],
  ex:{t:'Expand (2x + 3y)² and evaluate 103² mentally',
      steps:[['Match the identity','(2x + 3y)² has the form (a + b)² with a = 2x, b = 3y.'],
             ['Substitute','(2x)² + 2(2x)(3y) + (3y)² = 4x² + 12xy + 9y².'],
             ['Mental maths bonus','103² = (100 + 3)² = 10000 + 2·100·3 + 9 = 10609. No calculator, three seconds.']]},
  gen(){
    const t=R(1,4);
    if(t===1){
      const p=pick([2,3,4,5]),q=pick([2,3,4,5]);
      const a=p*p,bq=2*p*q,c=q*q;
      return Q('Expand ('+p+'x + '+q+'y)²',a+'x² + '+bq+'xy + '+c+'y²',[a+'x² + '+bq+'xy − '+c+'y²',a+'x² + '+p*q+'xy + '+c+'y²',a+'x² − '+bq+'xy + '+c+'y²',(a+c)+'xy + '+bq],'(a + b)² = a² + 2ab + b² with a = '+p+'x, b = '+q+'y: ('+p+'x)² + 2('+p+'x)('+q+'y) + ('+q+'y)².','Middle term = 2ab. Never forget the 2!');
    }
    if(t===2){
      const bank=[['102²',102,10404],['103²',103,10609],['104²',104,10816],['101²',101,10201],['98²',98,9604],['97²',97,9409],['99²',99,9801],['96²',96,9216]];
      const [q,base,a]=pick(bank);
      return Q('Using identities: '+q+' = ?',a,[a+base,a-base,a+2,a+20,a-100],'Write as ('+base+(base>100?' + ':' − ')+Math.abs(base-100)+')² and apply (a ± b)² = a² ± 2ab + b².','Split into (100 ± k)² and expand.');
    }
    if(t===3){
      const bank=[[102,98,9996],[103,97,9991],[106,94,9964],[101,99,9999],[105,95,9975]];
      const [m,pr,a]=pick(bank);
      return Q(m+' × '+pr+' = ?',String(a),[String(a+100),String(a-100),String(m*pr+4),String(a-4),String(a+4)],m+' × '+pr+' = ('+((m+pr)/2)+' + '+Math.abs(m-pr)/2+')('+((m+pr)/2)+' − '+Math.abs(m-pr)/2+') = '+((m+pr)/2)+'² − '+Math.abs(m-pr)/2+'² = '+a+'.','Use (a+b)(a−b) = a² − b² around the middle value.');
    }
    const a=R(3,6),b=R(2,4);
    return Q('If a = '+a+' and b = '+b+', the value of (a+b)² − (a−b)² is…',String(4*a*b),[String(2*a*b),String(a*a-b*b),String(2*a*a),String(4*(a+b)),String(a*b)],'(a+b)² − (a−b)² = 4ab = 4·'+a+'·'+b+' = '+(4*a*b)+'. (Check: ('+(a+b)+')² − ('+(a-b)+')² = '+(a+b)*(a+b)+' − '+(a-b)*(a-b)+'.)','Expand both and subtract — everything cancels except 4ab.');
  }},

 {id:'poly4',t:'The Remainder Machine',sub:'NCERT 2.4 · Remainder theorem',
  hook:{ic:'📦',s:'A courier named p(x) carries boxes into cartons shaped (x − k). However he arranges them, some boxes always spill over — the REMAINDER. The magic insight: to know the spillage without opening a single carton, just feed x = k into p(x). p(k) IS the remainder. Always.',
        w:'This turns ugly long division into one substitution. It also secretly powers the factor theorem — the master key of factorisation.'},
  facts:[['The theorem','When p(x) is divided by (x − k), the remainder is p(k). No long division needed.'],
         ['Why it works','p(x) = (x − k)·q(x) + r. Put x = k: p(k) = 0·q(k) + r = r. The carton term vanishes!'],
         ['Divisor (x + k)?','Dividing by (x + k) means x − (−k), so remainder = p(−k). Sign flip!'],
         ['Zero remainder = factor','If p(k) = 0, then (x − k) divides p(x) exactly — that is the factor theorem waiting on the next concept.']],
  lab:['remt',{mode:'remainder'}],
  tasks:['Slide k and watch p(k) match the remainder bar','Find the k where the remainder hits 0','Predict: dividing by (x + 1) means testing which x?'],
  ex:{t:'Remainder of (x³ − 3x² + 4x − 4) ÷ (x − 2)',
      steps:[['Skip the division','By the remainder theorem, remainder = p(2).'],
             ['Substitute','p(2) = 8 − 12 + 8 − 4 = 0.'],
             ['Read the surprise','Remainder is 0 — so (x − 2) is a FACTOR, and the cubic factors as (x − 2)(x² − x + 2).']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const cubs=[[[1,-3,4,-4],2],[[1,-2,-4,4],2],[[1,1,-1,1],-1],[[2,-5,3,1],1],[[1,-4,0,5],1],[[1,0,-5,6],-2]];
      const [co,k]=pick(cubs);
      const val=co[0]*k*k*k+co[1]*k*k+co[2]*k+co[3];
      const px=co[0]+'x³'+(co[1]?(co[1]>0?' + ':' − ')+Math.abs(co[1])+'x²':'')+(co[2]?(co[2]>0?' + ':' − ')+Math.abs(co[2])+'x':'')+(co[3]?(co[3]>0?' + ':' − ')+Math.abs(co[3]):'');
      return Q('The remainder when ('+px+') is divided by (x − '+k+') is…',String(val),[String(val+1),String(val-1),String(-val),String(val+2),'0','1'].filter(s=>s!==String(val)).slice(0,3),'Remainder = p('+k+') = '+val+'.','Just substitute x = '+k+' into p(x) — that IS the remainder.');
    }
    if(t===2){
      const bank=[['x² − 5x + b, divisible by (x − 1)','4',['1','2','5','−4']],['x² + bx − 6, divisible by (x − 2)','1',['−1','2','3','−2']],['x³ − 2x² + bx + 6, divisible by (x − 3)','−5',['5','−3','3','−15']]];
      const [q,a,ws]=pick(bank);
      return Q('Find b so that ('+q+')…',a,ws,'Set p(root) = 0 and solve for b — the remainder theorem demands the remainder vanish.','Put the root into p(x), set equal to 0, solve for b.');
    }
    return Q('The remainder when p(x) is divided by (x + 1) is…','p(−1)',['p(1)','p(0)','−p(1)'],'x + 1 = x − (−1), so the theorem tests x = −1: remainder = p(−1).','Rewrite x + 1 as x − (−1) and substitute.');
  }},

 {id:'poly5',t:'Factor Theorem & Splitting',sub:'NCERT 2.3–2.4 · Factorisation',
  hook:{ic:'🕵️',s:'A detective cracks safes by trying likely codes: 1, −1, 2, −2… For cubics, p(±1), p(±2) are the "likely codes". The moment p(k) = 0, the safe door (x − k) swings open, and inside the remaining quadratic waits to be cracked by splitting.',
        w:'Factorising is reversing multiplication. The factor theorem finds the first break-in point; splitting the middle term finishes quadratics in seconds.'},
  facts:[['Factor theorem','(x − k) is a factor of p(x) ⟺ p(k) = 0. It is the remainder theorem with remainder zero.'],
         ['Trial roots first','For cubics with integer coefficients, test x = ±1, ±2, ±3 — at least one usually works.'],
         ['Splitting the middle','For x² + bx + c: find u, v with u + v = b and u·v = c, then write (x + u)(x + v).'],
         ['Zeros fall out free','Once factored, the zeros are just the roots inside each bracket — no more solving.']],
  lab:['remt',{mode:'factor'}],
  tasks:['Slide k until p(k) = 0 and collect the factor chip','Find ALL integer factors of the hidden cubic','Try p(1) and p(−1) first — the detective\'s rule'],
  ex:{t:'Factorise x³ − 2x² − x + 2',
      steps:[['Hunt a trial root','p(1) = 1 − 2 − 1 + 2 = 0 ✓ So (x − 1) is a factor.'],
             ['Group smartly','x²(x − 2) − 1(x − 2) = (x − 2)(x² − 1) = (x − 2)(x − 1)(x + 1).'],
             ['Read the zeros','x = 2, 1, −1 — three linear factors, three zeros. Done.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const u=pick([1,2,3,4,-1,-2]),v=pick([5,6,7,-3,-4,2]);
      if(u===v)return this.gen();
      const b=u+v,c=u*v;
      const part=x=>x>0?'(x + '+x+')':'(x − '+Math.abs(x)+')';
      const wrongs=[];
      wrongs.push(part(u)+(v>0?'(x − '+v+')':'(x + '+Math.abs(v)+')'));
      wrongs.push(part(u+1)+part(v));
      wrongs.push(part(u)+part(v+1));
      return Q('Factorise x² + ('+b+')x + ('+c+')',part(u)+part(v),wrongs,'Find two numbers with sum '+b+' and product '+c+': they are '+u+' and '+v+'. So x² + '+b+'x + '+c+' = '+part(u)+part(v)+'.','Look for two numbers: sum = '+b+', product = '+c+'.');
    }
    if(t===2){
      const bank=[['5 and 6 (sum 5? no — product 6, sum 5)','2 and 3','1 and 6','−2 and −3'],['x² + 7x + 12','3 and 4','2 and 6','1 and 12'],['x² − 7x + 10','−2 and −5','2 and 5','−1 and −10'],['x² + 2x − 15','5 and −3','−5 and 3','5 and 3']];
      const [q,a,w1,w2]=pick(bank);
      return Q('For '+q+': which pair correctly splits the middle term?',a,[w1,w2,'1 and '+q.split(' ').pop()],'Splitting needs sum = middle coefficient, product = constant. The pair '+a+' does exactly that.','u + v = b, u·v = c.');
    }
    return Q('A factor of x³ − 2x² − x + 2 is…','(x − 1)',['(x + 1)','(x + 2)','(x − 3)'],'p(1) = 1 − 2 − 1 + 2 = 0, so (x − 1) is a factor. Full factorisation: (x − 2)(x − 1)(x + 1).','Test x = 1 with the factor theorem.');
  }}
]}
,
{id:'grid',n:'Grid Guardians',ch:'Chapter 3 · Coordinate Geometry',ic:'🧭',
 tag:'Two number lines, one origin — every point in the universe gets an address.',
 boss:{n:'ORION',ti:'Warden of the Origin',taunt:'Lost without your coordinates, Warrior? In MY grid, every misstep is permanent!',art:'golem'},
 concepts:[

 {id:'grid1',t:'The Cartesian Stage',sub:'NCERT 3.1–3.2 · Axes & quadrants',
  hook:{ic:'🎬',s:'A cinema ticket says: BALCONY, ROW D, SEAT 7. Two numbers — row and seat — and you walk straight to it. Descartes did this to the whole universe in 1637: two perpendicular number lines, and EVERY point on the plane gets a unique address (x, y). Maths got a GPS.',
        w:'Quadrant rules tell you the SIGNS of coordinates instantly — a one-mark gimme in every exam, and the base of all graph work.'},
  facts:[['The address system','(x, y): x = abscissa (horizontal walk), y = ordinate (vertical climb). ORDER matters — (2, 3) ≠ (3, 2).'],
         ['Origin: (0, 0)','The two axes meet at right angles at the origin O. Distances are measured from here.'],
         ['Four quadrants, four sign zones','I: (+, +). II: (−, +). III: (−, −). IV: (+, −). x first, y second — always.'],
         ['On the axes','If x = 0 the point sits on the y-axis; if y = 0 it sits on the x-axis. Axis points belong to NO quadrant.']],
  lab:['coord',{mode:'explore'}],
  tasks:['Click any cell to drop a point — read its (x, y) aloud','Land a point in Quadrant III (both negative)','Drop a point exactly ON the y-axis'],
  ex:{t:'Locate (3, −2) and (0, 4)',
      steps:[['Walk then climb','For (3, −2): walk 3 right, then 2 down. Positive x, negative y → Quadrant IV.'],
             ['The y-axis case','For (0, 4): zero horizontal walk, 4 up → sits exactly on the y-axis, 4 above origin. No quadrant.'],
             ['Sign sense','(−2, −5) would be Quadrant III (both negative); (−2, 5) is Quadrant II.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const x=pick([-4,-3,2,5,-1,3]),y=pick([-2,4,3,-5,1,-3]);
      const q=(x>0&&y>0)?'Quadrant I':(x<0&&y>0)?'Quadrant II':(x<0&&y<0)?'Quadrant III':'Quadrant IV';
      return Q('The point ('+x+', '+y+') lies in…',q,['Quadrant I','Quadrant II','Quadrant III','Quadrant IV','On the x-axis','On the y-axis'].filter(s=>s!==q).slice(0,3),'x is '+(x>0?'positive':'negative')+', y is '+(y>0?'positive':'negative')+' → '+q+'.','Sign of x decides I/IV vs II/III; sign of y finishes the job.');
    }
    if(t===2){
      const a=pick([3,-5,7]);
      return Q('The point (0, '+a+') lies…','on the y-axis',['on the x-axis','in Quadrant I','in Quadrant IV'],'x = 0 means zero horizontal movement — the point sits directly on the y-axis, '+a+' units from origin.','x = 0 → y-axis. y = 0 → x-axis.');
    }
    const b=pick([5,-3,8,-7]),c=pick([2,-4,6]);
    return Q('For the point ('+b+', '+c+'), the ordinate is…',String(c),[String(b),String(-b),String(-c),'0'],'Ordinate = the y-coordinate (second number) = '+c+'. Abscissa is the first.','Abscissa first, ordinate second — like alphabet: x before y!');
  }},

 {id:'grid2',t:'Plot, Mirror & Measure',sub:'NCERT 3.2 · Plotting & reflections',
  hook:{ic:'🗺️',s:'A treasure map shows X at (4, 3). Your rival digs at (−4, 3) — the mirror twin across the y-axis! You laugh, then fall into your own trap at (4, −3). Same distances, opposite directions: reflections are coordinate flips, and the axes are the mirrors.',
        w:'Mirror rules and "distance from axis" questions are tiny but guaranteed marks — and they train the eye for graphs of equations next chapter.'},
  facts:[['Mirror across the y-axis','(a, b) → (−a, b). Only the x sign flips; the height never changes.'],
         ['Mirror across the x-axis','(a, b) → (a, −b). Only the y sign flips; the walk stays the same.'],
         ['Distance from axes','Distance of (a, b) from the x-axis is |b|; from the y-axis is |a|. Just read the right coordinate.'],
         ['Same coordinate lines','Points with the same x stand on one vertical line; same y → one horizontal line. (a, b) and (b, a) are usually different points!']],
  lab:['coord',{mode:'catch'}],
  tasks:['Catch the target point the map demands — 3 in a row!','Drop two points with the same x and see the vertical line','Find a point exactly as far from the x-axis as from the y-axis'],
  ex:{t:'Mirror A(2, 3) across both axes',
      steps:[['Across the y-axis','A(2, 3) → A′(−2, 3): walk left instead of right, same height.'],
             ['Across the x-axis','A(2, 3) → A″(2, −3): same walk, climb below instead.'],
             ['Both mirrors','Doing both sends A to (−2, −3) — Quadrant III, the 180° rotation of A about O.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const a=pick([2,3,5,-4]),b=pick([3,-2,6,4]);
      const across=Math.random()<0.5;
      const ans=across?fr(-a,1)+', '+b:a+', '+fr(-b,1);
      const w1=across?a+', '+fr(-b,1):fr(-a,1)+', '+b;
      const w2=fr(-a,1)+', '+fr(-b,1);
      return Q('The mirror image of ('+a+', '+b+') across the '+(across?'y':'x')+'-axis is…','('+ans+')',['('+w1+')','('+w2+')','('+b+', '+a+')'],across?'Across the y-axis only the x-sign flips: (−a, b) = ('+(-a)+', '+b+').':'Across the x-axis only the y-sign flips: (a, −b) = ('+a+', '+(-b)+').','Flip ONE sign — the axis you mirror across stays positive.');
    }
    if(t===2){
      const a=pick([3,5,7,-6]),b=pick([4,-8,2,9]);
      return Q('The distance of point ('+a+', '+b+') from the x-axis is…',String(Math.abs(b)),[String(Math.abs(a)),String(Math.abs(a)+Math.abs(b)),String(Math.abs(a-b))],'Distance from the x-axis = |y| = |'+b+'| = '+Math.abs(b)+'. (From the y-axis it would be |x| = '+Math.abs(a)+'.)','From x-axis read |y|; from y-axis read |x|.');
    }
    const a=pick([4,6,-5]),b=pick([9,7,3]);
    return Q('Points ('+a+', 2) and ('+a+', '+b+') both lie on…','the same vertical line',['the same horizontal line','a line through the origin','the x-axis'],'Same x-coordinate → both stand on the vertical line x = '+a+'.','Same x → vertical; same y → horizontal.');
  }}
]}
,
{id:'line',n:'Line Land',ch:'Chapter 4 · Linear Equations in Two Variables',ic:'📈',
 tag:'One equation, infinite solutions — every solution paints the same straight line.',
 boss:{n:'SLOKEM',ti:'The Endless Slope',taunt:'My slope never ends and neither does my patience. Graph me if you dare, Warrior!',art:'serpent'},
 concepts:[

 {id:'line1',t:'Lines & Their Solutions',sub:'NCERT 4.1–4.2 · Solutions of ax + by + c = 0',
  hook:{ic:'☕',s:'At Meera\'s chai stall, a cup costs ₹5 and a samosa ₹10. A customer pays exactly ₹30: "5x + 10y = 30 — but how many cups and samosas?" One cup + 2.5 samosas? No! But 6 cups + 0 samosas works, and so do many other combos. ONE equation, MANY solutions — and when you plot them all… they fall on a perfect straight line.',
        w:'A linear equation in two variables is not a puzzle with one answer — it is a whole family of answers, and their graph is a line.'},
  facts:[['The standard form','ax + by + c = 0, with a and b not both zero. Examples: 2x + 3y = 12, x − 4 = 0 (take y\'s coefficient as 0!).'],
         ['Solutions come in pairs','A solution is an ordered pair (x, y) that satisfies the equation. Pick any x, compute the matching y.'],
         ['Infinitely many','Because x is free to be anything, there are infinitely many solutions — a whole line of them.'],
         ['Geometry of a solution','Every solution is a point on the line; every point on the line is a solution. Line = picture of the equation.']],
  lab:['lineg',{mode:'table'}],
  tasks:['Build the solution table for 2x + 3y = 12 with x = 0, 3, 6','Watch the three dots line up perfectly','Slide x and find the solution where y = 0'],
  ex:{t:'Find three solutions of 2x + 3y = 12',
      steps:[['Choose x freely','Let x = 0: 3y = 12 → y = 4. Solution (0, 4).'],
             ['Choose again','Let x = 3: 6 + 3y = 12 → y = 2. Solution (3, 2).'],
             ['And again','Let x = 6: 12 + 3y = 12 → y = 0. Solution (6, 0). Plot them — collinear, always.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const pairs=[[0,4],[3,2],[6,0],[1.5,3]];
      const [x0,y0]=pick(pairs);
      const eqOk=2*x0+3*y0===12;
      return Q('Is ('+x0+', '+y0+') a solution of 2x + 3y = 12?',eqOk?'Yes — it satisfies the equation':'No — it fails the equation',['Only if x is positive','Yes, but only graphically','Cannot be determined'],'Substitute: 2('+x0+') + 3('+y0+') = '+(2*x0+3*y0)+' '+(eqOk?'= 12 ✓':'≠ 12')+'.','Substitute both values and check the total.');
    }
    if(t===2){
      const x0=pick([0,3,6]);
      const y0=fr(12-2*x0,3);
      return Q('If 2x + 3y = 12 and x = '+x0+', then y = …',y0,['4','2','0','1','6','3'].filter(s=>s!==y0).slice(0,3),'2('+x0+') + 3y = 12 → 3y = '+(12-2*x0)+' → y = '+y0+'.','Substitute x, solve for y.');
    }
    return Q('How many solutions does a linear equation in two variables have?','Infinitely many',['Exactly 2','Exactly 1','No solution'],'x is free — every choice of x gives a valid y. A whole line of solutions, uncountably many.','One equation, two unknowns → freedom → infinity.');
  }},

 {id:'line2',t:'Drawing the Graph',sub:'NCERT 4.3–4.4 · Intercepts & special lines',
  hook:{ic:'⛏️',s:'A cricket coach chalks a boundary line across the field. She only needs TWO points — one near each end — and the chalk snaps a perfect line between them. Graphs work the same: any two solutions of ax + by = c, joined with a ruler, ARE the whole equation on display.',
        w:'Intercepts (put y = 0, then x = 0) give the two easiest points. And special lines like x = 3 or y = −2 have personalities you must recognise on sight.'},
  facts:[['Two points are enough','A straight line is fixed by any two of its points. Find two solutions, plot, join — extend both ways.'],
         ['Intercept shortcuts','Put y = 0 to find where the line cuts the x-axis; put x = 0 for the y-axis cut. These two points are usually the easiest.'],
         ['Vertical & horizontal','x = 3 is a vertical line through 3 (all points with x = 3). y = −2 is horizontal through −2.'],
         ['Through the origin','Lines like y = 2x (c = 0) pass through (0, 0) — the second point can be any other solution.']],
  lab:['lineg',{mode:'draw'}],
  tasks:['Slide m and c — watch the line pivot and glide','Switch on the intercept flags to see both axis cuts','Set the vertical tab and drag x = k sideways'],
  ex:{t:'Graph 3x + y = 6 using intercepts',
      steps:[['x-axis cut','Put y = 0: 3x = 6 → x = 2. Point (2, 0).'],
             ['y-axis cut','Put x = 0: y = 6. Point (0, 6).'],
             ['Join and extend','Plot (2, 0) and (0, 6), join with a ruler. Any point you read on this line satisfies 3x + y = 6.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const which=Math.random()<0.5;
      return Q('The equation of the '+(which?'x':'y')+'-axis is…',which?'y = 0':'x = 0',[which?'x = 0':'y = 0','x + y = 0','x = 1','y = 1','x = y'],'Every point on the '+(which?'x':'y')+'-axis has '+(which?'y':'x')+' = 0 — that is exactly the equation.','On the x-axis, height is always 0; on the y-axis, walk is always 0.');
    }
    if(t===2){
      const a=pick([2,4,-3,5]),b=pick([3,-1,7]);
      return Q('A line through ('+a+', '+b+') parallel to the x-axis is…','y = '+b,['x = '+a,'y = '+a,'x = '+b,'x + y = '+(a+b)],'Parallel to the x-axis means horizontal: every point keeps the same height y = '+b+'.','Horizontal lines are y = constant; vertical are x = constant.');
    }
    const k=pick([2,-4,5]);
    return Q('The graph of x = '+k+' is…','a vertical line cutting the x-axis at '+k,['a horizontal line cutting the y-axis at '+k,'a line through the origin','a line parallel to the x-axis'],'x = '+k+' collects all points with that same walk — a vertical line crossing the x-axis at '+k+'.','x = constant → vertical; y = constant → horizontal.');
  }},

 {id:'line3',t:'Stories → Equations',sub:'NCERT 4.4–4.5 · Word problems & graphs',
  hook:{ic:'🛺',s:'Auto-driver Ravi charges ₹20 the moment you sit (flag-down), then ₹8 per kilometre. A 1 km ride: ₹28. A 5 km ride: ₹60. A 0 km ride: ₹20 (just sitting!). Fare = 20 + 8×km — a linear equation wearing a rickshaw costume. Plot (km, fare) and the points line up like beads.',
        w:'Translating stories into equations is half of applied maths. Fixed charge → constant; rate → coefficient; total → the line.'},
  facts:[['Spot the structure','"Fixed fee + rate × quantity" always becomes y = mx + c (m = rate, c = fixed fee).'],
         ['The graph tells the story','Slope = per-unit rate. The y-intercept = the charge before anything starts.'],
         ['Read the graph both ways','Given km, read fare. Given fare, read the km where the vertical meets the line.'],
         ['Negative slopes are real stories','A mobile balance draining ₹2/day: balance = 200 − 2d — a falling line with slope −2.']],
  lab:['lineg',{mode:'story'}],
  tasks:['Set the flag-down fee and per-km rate, then ride to 7 km','Find where the fare hits ₹100 on the line','Make the rate 0 — what kind of line is the fare now?'],
  ex:{t:'Ravi\'s fare: find the cost of a 7 km ride',
      steps:[['Build the equation','Fare y = 20 + 8x, where x = km ridden.'],
             ['Substitute x = 7','y = 20 + 8(7) = 20 + 56 = 76.'],
             ['Reverse question','If a passenger paid ₹100: 100 = 20 + 8x → 8x = 80 → x = 10 km. Read it on the graph too!']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const c=pick([15,20,25,50]),m=pick([5,8,10,12]);
      return Q('An auto charges ₹'+c+' fixed plus ₹'+m+' per km. If x = km and y = fare, the equation is…','y = '+m+'x + '+c,['y = '+c+'x + '+m,'y = '+m+'x − '+c,'y = '+(m+c)+'x','x = '+m+'y + '+c],'Rate '+m+' multiplies x; the fixed ₹'+c+' is the constant: y = '+m+'x + '+c+'.','Fixed charge = constant, per-km rate = coefficient of x.');
    }
    if(t===2){
      const c=pick([15,20,25,50]),m=pick([5,8,10,12]),k=R(3,9);
      const total=c+m*k;
      return Q('Fare = ₹'+c+' + ₹'+m+' per km. The fare for '+k+' km is…','₹'+total,['₹'+(total+m),'₹'+(total-m),'₹'+(m*k),'₹'+(total+5),'₹'+(c*k)],'y = '+c+' + '+m+'('+k+') = ₹'+total+'.','Multiply rate by km, then add the fixed fee.');
    }
    const c=pick([20,25,50]),m=pick([5,8,10]);
    const k=R(2,8),total=c+m*k;
    return Q('You paid ₹'+total+' in an auto with flag-fall ₹'+c+' and rate ₹'+m+'/km. Distance travelled…',k+' km',[(k+1)+' km',(k-1)+' km',(k+2)+' km','2 km'],'('+total+' − '+c+')/'+m+' = '+k+' km. Work the story backwards!','(Total − fixed) ÷ rate = distance.');
  }}
]}
]
</script>
