# -*- coding: utf-8 -*-
"""Chapter 4 extra bank H1: Q71-95 (18 Basic + 7 Moderate), algebraic identities."""

CH4_H1 = [
("q", {"n": 71, "level": "Basic", "concept": "Binomial square (T1)",
 "stem": "Expand: (i) (3a + 2b)<super>2</super>, (ii) (4m - n)<super>2</super>, (iii) (x + 6)(x - 6).",
 "steps": [
  "(i) (3a)<super>2</super> + 2(3a)(2b) + (2b)<super>2</super> = 9a<super>2</super> + 12ab + 4b<super>2</super>.",
  "(ii) (4m)<super>2</super> - 2(4m)(n) + n<super>2</super> = 16m<super>2</super> - 8mn + n<super>2</super>.",
  "(iii) Difference of squares: x<super>2</super> - 36.",
 ],
 "why": ["(a ± b)² = a² ± 2ab + b²; the middle term is 2ab - forgetting the 2 is the #1 error. (x + 6)(x − 6) is the special minus case."],
 "hinglish": "Square identity mein middle term 2ab hota hai - '2' bhoolna national hobby hai, tum mat karna! (iii) plus-minus pair = a² - b², seedha 36.",
 "answer": "(i) 9a<super>2</super> + 12ab + 4b<super>2</super>  (ii) 16m<super>2</super> - 8mn + n<super>2</super>  (iii) x<super>2</super> - 36"}),

("q", {"n": 72, "level": "Basic", "concept": "(x + a)(x + b) product (T4)",
 "stem": "Expand: (i) (x + 5)(x + 3), (ii) (y - 8)(y - 2), (iii) (t + 9)(t - 4).",
 "steps": [
  "Identity: (x + a)(x + b) = x<super>2</super> + (a + b)x + ab.",
  "(i) x<super>2</super> + 8x + 15.",
  "(ii) y<super>2</super> - 10y + 16 (minus × minus = plus constant).",
  "(iii) t<super>2</super> + 5t - 36 (mixed signs -> negative constant).",
 ],
 "why": ["Sum goes on the middle term, product on the ends - the same pair of numbers that factorises quadratics."],
 "hinglish": "Sum middle mein, product end mein. Signs ka combination dekho: (-)(-) = +16, (+)(-) = -36. Ye identity factorisation ka bhi engine hai.",
 "answer": "(i) x<super>2</super> + 8x + 15  (ii) y<super>2</super> - 10y + 16  (iii) t<super>2</super> + 5t - 36"}),

("q", {"n": 73, "level": "Basic", "concept": "Near-number squares (T3)",
 "stem": "Evaluate using identities: (i) 52<super>2</super>, (ii) 97<super>2</super>, (iii) 103 × 97.",
 "steps": [
  "(i) 52<super>2</super> = (50 + 2)<super>2</super> = 2500 + 200 + 4 = 2704.",
  "(ii) 97<super>2</super> = (100 - 3)<super>2</super> = 10000 - 600 + 9 = 9409.",
  "(iii) 103 × 97 = (100 + 3)(100 - 3) = 100<super>2</super> - 9 = 9991.",
 ],
 "why": ["Snap to the nearest round number, then let the identity carry the arithmetic."],
 "hinglish": "Round number ke aas paas bindaas: 50±2, 100∓3. Aur 103×97 ka plus-minus jodi = 10000 - 9. Calculator ki zaroorat khatam!",
 "answer": "(i) 2704  (ii) 9409  (iii) 9991"}),

("q", {"n": 74, "level": "Basic", "concept": "Difference of squares factorising (T2)",
 "stem": "Factorise: (i) 25p<super>2</super> - 49q<super>2</super>, (ii) x<super>2</super> - 18x + 81, (iii) 36a<super>2</super> + 60a + 25.",
 "steps": [
  "(i) 25p<super>2</super> - 49q<super>2</super> = (5p)<super>2</super> - (7q)<super>2</super> = (5p + 7q)(5p - 7q).",
  "(ii) x<super>2</super> - 18x + 81 = x<super>2</super> - 2(x)(9) + 9<super>2</super> = (x - 9)<super>2</super>.",
  "(iii) 36a<super>2</super> + 60a + 25 = (6a)<super>2</super> + 2(6a)(5) + 5<super>2</super> = (6a + 5)<super>2</super> (check middle: 2·6·5 = 60 ✓).",
 ],
 "why": ["Recognise the pattern first: two perfect squares apart (case i), or a perfect-square trinomial (cases ii, iii)."],
 "hinglish": "Perfect squares pehchano: 25 = 5², 49 = 7². (ii) aur (iii) perfect square trinomials hain - middle term 2ab se match karke confirm karo. Pattern dikha toh likhna 5 second ka hai.",
 "answer": "(i) (5p + 7q)(5p - 7q)  (ii) (x - 9)<super>2</super>  (iii) (6a + 5)<super>2</super>"}),

("q", {"n": 75, "level": "Basic", "concept": "Middle-term splitting (T6)",
 "stem": "Factorise: (i) x<super>2</super> + 9x + 20, (ii) x<super>2</super> - 3x - 10, (iii) 2y<super>2</super> + 11y + 12.",
 "steps": [
  "(i) Need two numbers with sum 9, product 20: 4 and 5 -> (x + 4)(x + 5).",
  "(ii) Sum -3, product -10: -5 and +2 -> (x - 5)(x + 2).",
  "(iii) Split 11y = 8y + 3y (8 × 3 = 24 = 2 × 12): 2y<super>2</super> + 8y + 3y + 12 = 2y(y + 4) + 3(y + 4) = (y + 4)(2y + 3).",
 ],
 "why": ["Split the middle term into the pair whose product matches the ends - then group."],
 "hinglish": "Do numbers dhoondo: sum middle, product ends. (iii) lead coefficient 2 hai, isliye product 2×12 = 24 lena hai - 8 aur 3. Grouping ke baad bracket match - done.",
 "answer": "(i) (x + 4)(x + 5)  (ii) (x - 5)(x + 2)  (iii) (y + 4)(2y + 3)"}),

("q", {"n": 76, "level": "Basic", "concept": "Square-sum identities (T1/T11)",
 "stem": "If a + b = 14 and ab = 48, find (i) a<super>2</super> + b<super>2</super>, (ii) (a - b)<super>2</super>, (iii) a - b (a > b).",
 "steps": [
  "(i) a<super>2</super> + b<super>2</super> = (a + b)<super>2</super> - 2ab = 196 - 96 = 100.",
  "(ii) (a - b)<super>2</super> = (a + b)<super>2</super> - 4ab = 196 - 192 = 4.",
  "(iii) a - b = √4 = 2 (positive, since a > b).",
 ],
 "why": ["Given (a + b) and ab, every symmetric expression is one identity away."],
 "hinglish": "Bridge questions ka formula kit: a²+b² = S² - 2P, (a-b)² = S² - 4P. 196 se minus karo, done. a-b = 2 kyunki a bada tha.",
 "answer": "(i) 100  (ii) 4  (iii) 2"}),

("q", {"n": 77, "level": "Basic", "concept": "Cube expansion (T7)",
 "stem": "Expand: (i) (x + 4)<super>3</super>, (ii) (a - 2b)<super>3</super>.",
 "steps": [
  "(i) x<super>3</super> + 3x<super>2</super>(4) + 3x(4)<super>2</super> + 4<super>3</super> = x<super>3</super> + 12x<super>2</super> + 48x + 64.",
  "(ii) a<super>3</super> - 3a<super>2</super>(2b) + 3a(2b)<super>2</super> - (2b)<super>3</super> = a<super>3</super> - 6a<super>2</super>b + 12ab<super>2</super> - 8b<super>3</super>.",
 ],
 "why": ["(a ± b)³ = a³ ± 3a²b + 3ab² ± b³ - signs alternate for the minus cube."],
 "hinglish": "Cube identity: 1-3-3-1 coefficients. Minus case mein signs + - + - chalte hain. Powers ka pattern: 3,2,1,0 aur 0,1,2,3.",
 "answer": "(i) x<super>3</super> + 12x<super>2</super> + 48x + 64  (ii) a<super>3</super> - 6a<super>2</super>b + 12ab<super>2</super> - 8b<super>3</super>"}),

("q", {"n": 78, "level": "Basic", "concept": "Sum/difference of cubes (T8)",
 "stem": "Factorise: (i) 27x<super>3</super> + 64y<super>3</super>, (ii) 216 - 343t<super>3</super>.",
 "steps": [
  "(i) 27x<super>3</super> + 64y<super>3</super> = (3x)<super>3</super> + (4y)<super>3</super> = (3x + 4y)(9x<super>2</super> - 12xy + 16y<super>2</super>).",
  "(ii) 216 - 343t<super>3</super> = 6<super>3</super> - (7t)<super>3</super> = (6 - 7t)(36 + 42t + 49t<super>2</super>).",
 ],
 "why": ["a³ ± b³ = (a ± b)(a² ∓ ab + b²) - the second bracket is NOT a perfect square; keep its signs straight."],
 "hinglish": "Perfect cubes pehchano: 27, 64, 216, 343 (6³, 7³). Formula ka doosra bracket a² ∓ ab + b² - signs ka pattern yaad rakho, yahi galti hoti hai.",
 "answer": "(i) (3x + 4y)(9x<super>2</super> - 12xy + 16y<super>2</super>)  (ii) (6 - 7t)(36 + 42t + 49t<super>2</super>)"}),

("q", {"n": 79, "level": "Basic", "concept": "Near-number cube (T3)",
 "stem": "Evaluate 102<super>3</super> without a calculator.",
 "steps": [
  "102<super>3</super> = (100 + 2)<super>3</super>.",
  "= 100<super>3</super> + 3(100)<super>2</super>(2) + 3(100)(2)<super>2</super> + 2<super>3</super>.",
  "= 1000000 + 60000 + 1200 + 8 = 1061208.",
 ],
 "why": ["The cube identity turns scary cubes into four friendly terms."],
 "hinglish": "(100+2)³ ke chaar tukde: 10⁶ + 6×10⁴ + 1200 + 8 = 1061208. Cube identity se bade numbers ka calculation mental ho jaata hai.",
 "answer": "1061208"}),

("q", {"n": 80, "level": "Basic", "concept": "Chained difference of squares (T2)",
 "stem": "Simplify completely: (3x + 4y)(3x - 4y)(9x<super>2</super> + 16y<super>2</super>).",
 "steps": [
  "First pair: (3x + 4y)(3x - 4y) = 9x<super>2</super> - 16y<super>2</super>.",
  "Now: (9x<super>2</super> - 16y<super>2</super>)(9x<super>2</super> + 16y<super>2</super>) = (9x<super>2</super>)<super>2</super> - (16y<super>2</super>)<super>2</super>.",
  "= 81x<super>4</super> - 256y<super>4</super>.",
 ],
 "why": ["Conjugate pairs eat powers two at a time: a² − b², then a⁴ − b⁴ - keep pairing until nothing factors."],
 "hinglish": "Do conjugate pairs ke baad 4th power aa gayi: 81x⁴ - 256y⁴. Aage koi square pattern nahi, bas. Chain factorisation mein har step pe check karo - aur khaana hai kya?",
 "answer": "81x<super>4</super> - 256y<super>4</super>"}),

("q", {"n": 81, "level": "Basic", "concept": "Fourth-power difference (T2)",
 "stem": "Factorise completely: (i) x<super>4</super> - 625, (ii) a<super>4</super> - 81.",
 "steps": [
  "(i) x<super>4</super> - 625 = (x<super>2</super> - 25)(x<super>2</super> + 25) = (x - 5)(x + 5)(x<super>2</super> + 25).",
  "(ii) a<super>4</super> - 81 = (a<super>2</super> - 9)(a<super>2</super> + 9) = (a - 3)(a + 3)(a<super>2</super> + 9).",
 ],
 "why": ["x⁴ − n⁴ chains: difference of squares twice; the sum-of-squares piece (x² + 25) stops the chain in reals."],
 "hinglish": "Do baar a² - b² lagao: x²-25 phir x-5, x+5. x² + 25 ko aage todna mat - real numbers mein sum of squares factor nahi hota. 'Completely' ka matlab yahi hai.",
 "answer": "(i) (x - 5)(x + 5)(x<super>2</super> + 25)  (ii) (a - 3)(a + 3)(a<super>2</super> + 9)"}),

("q", {"n": 82, "level": "Basic", "concept": "Perfect square spotting (T1/T5)",
 "stem": "Check whether each is a perfect square trinomial, and factorise if so: (i) 49x<super>2</super> + 42x + 9, (ii) 16m<super>2</super> - 40mn + 25n<super>2</super>.",
 "steps": [
  "(i) 49x<super>2</super> = (7x)<super>2</super>, 9 = 3<super>2</super>, middle test: 2(7x)(3) = 42x ✓ -> (7x + 3)<super>2</super>.",
  "(ii) 16m<super>2</super> = (4m)<super>2</super>, 25n<super>2</super> = (5n)<super>2</super>, middle: 2(4m)(5n) = 40mn with a minus sign -> (4m - 5n)<super>2</super>.",
 ],
 "why": ["Perfect square test: first and last terms are squares AND the middle equals 2ab (with either sign)."],
 "hinglish": "Do check karo: dono ends square hain? Middle 2ab hai? Dono haan -> seedha (a ± b)². Middle match nahi karta toh yeh identity nahi hai - splitting karni padti.",
 "answer": "(i) (7x + 3)<super>2</super>  (ii) (4m - 5n)<super>2</super>"}),

("q", {"n": 83, "level": "Basic", "concept": "x + 1/x chain (T10)",
 "stem": "If x + 1/x = 6, find (i) x<super>2</super> + 1/x<super>2</super>, (ii) x<super>4</super> + 1/x<super>4</super>.",
 "steps": [
  "(i) Square: x<super>2</super> + 2 + 1/x<super>2</super> = 36 -> x<super>2</super> + 1/x<super>2</super> = 34.",
  "(ii) Square again: x<super>4</super> + 2 + 1/x<super>4</super> = 34<super>2</super> = 1156 -> x<super>4</super> + 1/x<super>4</super> = 1154.",
 ],
 "why": ["Each squaring adds the constant 2 on the middle - climb the ladder one square at a time."],
 "hinglish": "Square karo, 2 minus karo, repeat. 6 -> 34 -> 1154. x + 1/x family ki seedhi khaddi hai - ek step per floor.",
 "answer": "(i) 34  (ii) 1154"}),

("q", {"n": 84, "level": "Basic", "concept": "Trinomial square (T5)",
 "stem": "Expand: (a + 2b - 3c)<super>2</super>.",
 "steps": [
  "Treat as (a + 2b) + (-3c) or use the three-term identity: square each term, then double every pair.",
  "Squares: a<super>2</super> + 4b<super>2</super> + 9c<super>2</super>.",
  "Doubles: 2(a)(2b) = 4ab; 2(2b)(-3c) = -12bc; 2(a)(-3c) = -6ac.",
  "Result: a<super>2</super> + 4b<super>2</super> + 9c<super>2</super> + 4ab - 12bc - 6ac.",
 ],
 "why": ["(x + y + z)² = sum of squares + 2 × each pairwise product - three doubles, no exceptions."],
 "hinglish": "Teen term ka square: teen squares + teen doubles. Signs terms ke saath jaate hain: -3c ne do doubles ko negative kiya. Ek bhi double miss = poora answer galat.",
 "answer": "a<super>2</super> + 4b<super>2</super> + 9c<super>2</super> + 4ab - 12bc - 6ac"}),

("q", {"n": 85, "level": "Basic", "concept": "Square-difference evaluation (T2)",
 "stem": "Evaluate: (i) 68<super>2</super> - 32<super>2</super>, (ii) 7.8<super>2</super> - 2.2<super>2</super>, (iii) (0.73)<super>2</super> - (0.27)<super>2</super>.",
 "steps": [
  "(i) (68 - 32)(68 + 32) = 36 × 100 = 3600.",
  "(ii) (7.8 - 2.2)(7.8 + 2.2) = 5.6 × 10 = 56.",
  "(iii) (0.73 - 0.27)(0.73 + 0.27) = 0.46 × 1 = 0.46.",
 ],
 "why": ["a² − b² = (a − b)(a + b): the sum is often a clean round number - multiply THAT instead of squaring twice."],
 "hinglish": "Squares alag-alag nikalna pagalpan hai. Jod aur ghat lo: 36 × 100, 5.6 × 10, 0.46 × 1. Difference of squares = mental math ka cheat code.",
 "answer": "(i) 3600  (ii) 56  (iii) 0.46"}),

("q", {"n": 86, "level": "Basic", "concept": "Difference-of-squares multiplication (T2)",
 "stem": "Evaluate without direct multiplication: (i) 51 × 49, (ii) 102 × 98, (iii) 10.3 × 9.7.",
 "steps": [
  "(i) 51 × 49 = (50 + 1)(50 - 1) = 2500 - 1 = 2499.",
  "(ii) (100 + 2)(100 - 2) = 10000 - 4 = 9996.",
  "(iii) (10 + 0.3)(10 - 0.3) = 100 - 0.09 = 99.91.",
 ],
 "why": ["Numbers equidistant from a round centre are conjugates - their product is centre² minus offset²."],
 "hinglish": "Dono number ka average pakdo (50, 100, 10), offset dekho (1, 2, 0.3). Product = avg² - offset². Har saal aane wala gift question.",
 "answer": "(i) 2499  (ii) 9996  (iii) 99.91"}),

("q", {"n": 87, "level": "Basic", "concept": "Grouped difference of squares (T2/T12)",
 "stem": "Factorise: (i) (a + b)<super>2</super> - 16c<super>2</super>, (ii) 36 - (2p + q)<super>2</super>.",
 "steps": [
  "(i) (a + b)<super>2</super> - (4c)<super>2</super> = (a + b + 4c)(a + b - 4c).",
  "(ii) 6<super>2</super> - (2p + q)<super>2</super> = (6 + 2p + q)(6 - 2p - q).",
 ],
 "why": ["Treat a whole bracket as ONE block: A² − B² = (A + B)(A − B) with A = the bracket."],
 "hinglish": "Bracket ko ek hi package samjho: A = (a+b), B = 4c. Plus-minus ke saath bracket copy karo. Bracket treatment se complex-looking expressions bhi easy.",
 "answer": "(i) (a + b + 4c)(a + b - 4c)  (ii) (6 + 2p + q)(6 - 2p - q)"}),

("q", {"n": 88, "level": "Basic", "concept": "Difference bridge (T11)",
 "stem": "If a - b = 5 and ab = 14, find (i) a<super>2</super> + b<super>2</super>, (ii) a + b (taking a + b > 0).",
 "steps": [
  "(i) a<super>2</super> + b<super>2</super> = (a - b)<super>2</super> + 2ab = 25 + 28 = 53.",
  "(ii) (a + b)<super>2</super> = (a - b)<super>2</super> + 4ab = 25 + 56 = 81 -> a + b = 9.",
 ],
 "why": ["The minus-version bridge: (a − b)² = a² + b² − 2ab and (a + b)² = (a − b)² + 4ab."],
 "hinglish": "Difference wale bridge mein +2ab hota hai (minus ki jodi plus ban jaati hai square mein). 53 aur 9. Signs ka ye flip samajh liya toh half chapter clear.",
 "answer": "(i) 53  (ii) 9"}),

("q", {"n": 89, "level": "Moderate", "concept": "Grouped square minus square (T12)",
 "stem": "Factorise completely: 9x<super>2</super> + 24xy + 16y<super>2</super> - 25z<super>2</super>.",
 "steps": [
  "First three terms: 9x<super>2</super> + 24xy + 16y<super>2</super> = (3x + 4y)<super>2</super> (middle 2·3·4 = 24 ✓).",
  "Expression = (3x + 4y)<super>2</super> - (5z)<super>2</super>.",
  "= (3x + 4y + 5z)(3x + 4y - 5z).",
 ],
 "why": ["Spot the hidden perfect square FIRST, then the whole expression becomes a two-term difference of squares."],
 "hinglish": "Pehle teen terms ka perfect square (3x+4y)², phir 25z² = (5z)². Do-step factorisation - square pehchano, phir a²-b². Ye combo board exam ka favourite hai.",
 "answer": "(3x + 4y + 5z)(3x + 4y - 5z)"}),

("q", {"n": 90, "level": "Moderate", "concept": "Cube pattern recognition (T7/T8)",
 "stem": "(i) Expand (2x - 3)(4x<super>2</super> + 6x + 9) without long multiplication. (ii) Factorise x<super>3</super> - 512 completely.",
 "steps": [
  "(i) This matches a<super>3</super> - b<super>3</super> with a = 2x, b = 3: the second bracket is a<super>2</super> + ab + b<super>2</super> = 4x<super>2</super> + 6x + 9.",
  "So the product = (2x)<super>3</super> - 3<super>3</super> = 8x<super>3</super> - 27.",
  "(ii) x<super>3</super> - 512 = x<super>3</super> - 8<super>3</super> = (x - 8)(x<super>2</super> + 8x + 64).",
 ],
 "why": ["Learn to read a³ − b³'s second bracket BACKWARDS: seeing a² + ab + b² next to (a − b) means the product collapses to a cube pair."],
 "hinglish": "Doosra bracket 4x² + 6x + 9? Ye a² + ab + b² ka costume hai (a = 2x, b = 3)! Isliye product seedha 8x³ - 27. Pattern ko ulta bhi padhna aana chahiye.",
 "answer": "(i) 8x<super>3</super> - 27  (ii) (x - 8)(x<super>2</super> + 8x + 64)"}),

("q", {"n": 91, "level": "Moderate", "concept": "x + 1/x deeper chain (T10)",
 "stem": "If x + 1/x = 5, find (i) x<super>2</super> + 1/x<super>2</super>, (ii) x<super>3</super> + 1/x<super>3</super>, (iii) x<super>4</super> + 1/x<super>4</super>.",
 "steps": [
  "(i) Square: 25 - 2 = 23.",
  "(ii) Cube: x<super>3</super> + 1/x<super>3</super> = (x + 1/x)<super>3</super> - 3(x + 1/x) = 125 - 15 = 110.",
  "(iii) Square the (i) result: 23<super>2</super> - 2 = 529 - 2 = 527.",
 ],
 "why": ["Two engines: squaring (+2 in the middle) and cubing (−3s). Alternate them to reach any power."],
 "hinglish": "Square: -2. Cube: -3(x + 1/x). Phir square: -2. 5 → 23 → 110 → 527. Ye ladder ek baar chalana aayi toh family ke saare questions tumhare.",
 "answer": "(i) 23  (ii) 110  (iii) 527"}),

("q", {"n": 92, "level": "Moderate", "concept": "Both bridges at once (T11)",
 "stem": "If a + b = 10 and a - b = 6, find (i) ab, (ii) a<super>2</super> + b<super>2</super>, (iii) a<super>4</super> - b<super>4</super>.",
 "steps": [
  "(i) ab = ((a + b)<super>2</super> - (a - b)<super>2</super>)/4 = (100 - 36)/4 = 16.",
  "(ii) a<super>2</super> + b<super>2</super> = ((a + b)<super>2</super> + (a - b)<super>2</super>)/2 = (100 + 36)/2 = 68.",
  "(iii) a<super>4</super> - b<super>4</super> = (a<super>2</super> + b<super>2</super>)(a<super>2</super> - b<super>2</super>) = 68 × (a + b)(a - b) = 68 × 60 = 4080.",
 ],
 "why": ["Both bridges together give ab AND a² + b² - then difference of squares chains the fourth powers."],
 "hinglish": "Sum aur difference dono mile toh ab aur a²+b² formula se niklo, a-b solve karne ki zaroorat nahi! (iii) mein chain: 68 × 10 × 6 = 4080.",
 "answer": "(i) 16  (ii) 68  (iii) 4080"}),

("q", {"n": 93, "level": "Moderate", "concept": "Complete the square then split (T12)",
 "stem": "Factorise: x<super>2</super> + 12x + 36 - 9y<super>2</super>.",
 "steps": [
  "First three terms: x<super>2</super> + 12x + 36 = (x + 6)<super>2</super>.",
  "Expression = (x + 6)<super>2</super> - (3y)<super>2</super>.",
  "= (x + 6 + 3y)(x + 6 - 3y).",
 ],
 "why": ["Add-nothing trick: the first three terms were already a perfect square - the -9y² was waiting to become (3y)²."],
 "hinglish": "(x+6)² pehle se mojood tha! -9y² ko (3y)² banao aur a² - b². 'Pehle group karo, phir identity' - yehi two-step dance hai.",
 "answer": "(x + 6 + 3y)(x + 6 - 3y)"}),

("q", {"n": 94, "level": "Moderate", "concept": "Cube bridge classic (T11)",
 "stem": "If a + b = 9 and ab = 20, find a<super>3</super> + b<super>3</super>.",
 "steps": [
  "a<super>3</super> + b<super>3</super> = (a + b)<super>3</super> - 3ab(a + b).",
  "= 9<super>3</super> - 3(20)(9) = 729 - 540.",
  "= 189.",
 ],
 "why": ["The cube bridge: (a + b)³ minus the 3ab(a + b) correction term."],
 "hinglish": "Cube bridge: S³ - 3PS. 729 - 540 = 189. (a+b)³ pure expand karne ke chakkar mein mat pado - correction term hi asli shortcut hai.",
 "answer": "189"}),

("q", {"n": 95, "level": "Moderate", "concept": "Cube-sum evaluation trick (T3/T11)",
 "stem": "Evaluate 88<super>3</super> + 12<super>3</super> without cubing either number.",
 "steps": [
  "Note a + b = 88 + 12 = 100 and ab = 88 × 12 = 1056.",
  "a<super>3</super> + b<super>3</super> = (a + b)<super>3</super> - 3ab(a + b) = 100<super>3</super> - 3(1056)(100).",
  "= 1000000 - 316800 = 683200.",
 ],
 "why": ["Numbers summing to a round 100 beg for the cube-sum identity - no cubing required."],
 "hinglish": "88 + 12 = 100? Round number dikh te hi bridge kholo. 10⁶ - 3×1056×100 = 683200. Ek bhi cube nahi kiya!",
 "answer": "683200"}),
]
