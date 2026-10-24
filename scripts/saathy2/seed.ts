// Seed: demo Class 9-A (CBSE) with Physics "Motion" + Maths "Coordinate Geometry",
// concept-tagged teacher notes (grounding), mastery states spanning the 4 internal
// bands (VS-22), and a few evidence records (AI-08) that justify those states.
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // Wipe old app tables from previous projects, then seed fresh
  await db.evidenceRecord.deleteMany();
  await db.teacherNote.deleteMany();
  await db.masteryState.deleteMany();
  await db.message.deleteMany();
  await db.conversation.deleteMany();
  await db.concept.deleteMany();
  await db.chapter.deleteMany();
  await db.subject.deleteMany();
  await db.studentProfile.deleteMany();
  await db.appSettings.deleteMany();

  // ---------- Student profile ----------
  await db.studentProfile.create({
    data: {
      id: 'main',
      name: 'Aarav',
      className: 'Class 9',
      section: 'A',
      board: 'CBSE',
      schoolName: 'Demo Public School',
      tone: 'friendly',
      style: 'steps',
      length: 'balanced',
      language: 'english',
      socratic: true,
      animations: true,
      sounds: false,
    },
  });

  // ---------- Physics — Motion ----------
  const physics = await db.subject.create({ data: { name: 'Physics', order: 1 } });
  const motion = await db.chapter.create({
    data: { subjectId: physics.id, number: 8, name: 'Motion', order: 1 },
  });

  const cDist = await db.concept.create({
    data: { chapterId: motion.id, name: 'Distance and Displacement', order: 1, prerequisites: '[]' },
  });
  const cSpeed = await db.concept.create({
    data: { chapterId: motion.id, name: 'Speed and Velocity', order: 2, prerequisites: JSON.stringify([cDist.id]) },
  });
  const cAccel = await db.concept.create({
    data: { chapterId: motion.id, name: 'Acceleration', order: 3, prerequisites: JSON.stringify([cSpeed.id]) },
  });
  const cEq = await db.concept.create({
    data: { chapterId: motion.id, name: 'Equations of Motion', order: 4, prerequisites: JSON.stringify([cAccel.id]) },
  });
  const cGraph = await db.concept.create({
    data: { chapterId: motion.id, name: 'Graphs of Motion', order: 5, prerequisites: JSON.stringify([cSpeed.id]) },
  });

  // Mastery spanning all 4 internal bands (never shown to students as numbers)
  await db.masteryState.createMany({
    data: [
      { conceptId: cDist.id, score: 0.86, attempts: 9, correct: 8 }, // band 3 — Mastered
      { conceptId: cSpeed.id, score: 0.68, attempts: 8, correct: 6 }, // band 2 — Almost there
      { conceptId: cAccel.id, score: 0.22, attempts: 7, correct: 2 }, // band 0 — Let's fix this
      { conceptId: cEq.id, score: 0.46, attempts: 6, correct: 3 }, // band 1 — Building up
      { conceptId: cGraph.id, score: 0.14, attempts: 4, correct: 1 }, // band 0 — Let's fix this
    ],
  });

  // Teacher notes (concept-tagged, VS-11) — real NCERT Class 9 level content
  await db.teacherNote.createMany({
    data: [
      {
        conceptId: cDist.id,
        title: 'Distance vs Displacement — class notes',
        sourceRef: "Teacher's notes — Motion, Slide 3",
        content:
          'Distance is the total length of the path travelled by an object. It is a scalar quantity and is always positive. Displacement is the shortest straight-line distance from the initial position to the final position, with a direction. It is a vector quantity and can be positive, negative or zero. SI unit of both: metre (m). Example: a boy walks 4 m east, then 3 m north. Distance = 4 + 3 = 7 m. Displacement = sqrt(4^2 + 3^2) = 5 m, towards north-east. If the boy returns to the start, displacement = 0 but distance is not zero.',
      },
      {
        conceptId: cSpeed.id,
        title: 'Speed and Velocity — class notes',
        sourceRef: "Teacher's notes — Motion, Slide 6",
        content:
          'Speed is the distance travelled per unit time: speed = distance / time. It is a scalar. Velocity is displacement per unit time: velocity = displacement / time. It is a vector, so direction matters. SI unit: m/s. Average speed = total distance / total time. Average velocity = total displacement / total time. Uniform motion: equal distances in equal intervals of time. Example: a car covers 100 m in 10 s, so average speed = 10 m/s. If the car returns to the starting point, average velocity = 0 even though average speed is not.',
      },
      {
        conceptId: cAccel.id,
        title: 'Acceleration — class notes',
        sourceRef: "Teacher's notes — Motion, Slide 9",
        content:
          'Acceleration is the rate of change of velocity: a = (v - u) / t, where u = initial velocity, v = final velocity, t = time taken. SI unit: m/s^2. It is a vector quantity. If velocity increases, acceleration is positive; if velocity decreases, acceleration is negative (also called retardation or deceleration). Uniform acceleration: velocity changes by equal amounts in equal times, e.g. a ball released from a roof gains about 9.8 m/s of speed every second. Example: a scooter goes from 0 to 6 m/s in 3 s, so a = (6 - 0)/3 = 2 m/s^2. Common mistake: students think zero velocity means zero acceleration — not true; a ball at the top of its throw has zero velocity but acceleration is still 9.8 m/s^2 downward.',
      },
      {
        conceptId: cEq.id,
        title: 'Three Equations of Motion — class notes',
        sourceRef: "Teacher's notes — Motion, Slide 12",
        content:
          'For uniformly accelerated motion: 1) v = u + at (no s in it). 2) s = ut + (1/2)at^2 (no v in it). 3) v^2 = u^2 + 2as (no t in it). Here u = initial velocity, v = final velocity, a = uniform acceleration, t = time, s = displacement. Trick to choose: read the question, list the known quantities, and pick the equation that does NOT contain the quantity you do not know and do not need. Example: a bus moving at 5 m/s accelerates at 2 m/s^2 for 4 s. v = 5 + 2x4 = 13 m/s; s = 5x4 + (1/2)(2)(16) = 20 + 16 = 36 m.',
      },
      {
        conceptId: cGraph.id,
        title: 'Distance-Time and Velocity-Time Graphs — class notes',
        sourceRef: "Teacher's notes — Motion, Slide 15",
        content:
          'Distance-time graph: slope gives speed. A straight slanting line means uniform speed; a curved line means changing speed; a horizontal line means the object is at rest. Velocity-time graph: slope gives acceleration; a horizontal line means uniform velocity. The area under a velocity-time graph gives displacement. Example: a velocity-time graph that rises as a straight line from 0 to 8 m/s in 4 s shows a = 2 m/s^2, and the area (triangle) = (1/2)(4)(8) = 16 m of displacement. Reading axes carefully is the first step in every graph question.',
      },
    ],
  });

  // A few evidence records that justify the mastery states (AI-08)
  await db.evidenceRecord.createMany({
    data: [
      { conceptId: cAccel.id, correct: false, difficulty: 2, source: 'quiz' },
      { conceptId: cAccel.id, correct: true, difficulty: 1, source: 'quiz' },
      { conceptId: cAccel.id, correct: false, difficulty: 2, source: 'quiz' },
      { conceptId: cAccel.id, correct: false, difficulty: 1, source: 'practice' },
      { conceptId: cGraph.id, correct: false, difficulty: 1, source: 'quiz' },
      { conceptId: cGraph.id, correct: false, difficulty: 2, source: 'quiz' },
      { conceptId: cDist.id, correct: true, difficulty: 2, source: 'quiz' },
      { conceptId: cDist.id, correct: true, difficulty: 3, source: 'practice' },
      { conceptId: cEq.id, correct: true, difficulty: 1, source: 'quiz' },
      { conceptId: cEq.id, correct: false, difficulty: 2, source: 'quiz' },
      { conceptId: cSpeed.id, correct: true, difficulty: 2, source: 'quiz' },
    ],
  });

  // ---------- Mathematics — Coordinate Geometry ----------
  const maths = await db.subject.create({ data: { name: 'Mathematics', order: 2 } });
  const coord = await db.chapter.create({
    data: { subjectId: maths.id, number: 3, name: 'Coordinate Geometry', order: 1 },
  });
  const cPlane = await db.concept.create({
    data: { chapterId: coord.id, name: 'The Cartesian Plane', order: 1, prerequisites: '[]' },
  });
  const cPlot = await db.concept.create({
    data: { chapterId: coord.id, name: 'Plotting Points', order: 2, prerequisites: JSON.stringify([cPlane.id]) },
  });
  const cQuad = await db.concept.create({
    data: { chapterId: coord.id, name: 'Quadrants and Signs', order: 3, prerequisites: JSON.stringify([cPlane.id]) },
  });

  await db.masteryState.createMany({
    data: [
      { conceptId: cPlane.id, score: 0.78, attempts: 7, correct: 6 },
      { conceptId: cPlot.id, score: 0.62, attempts: 6, correct: 4 },
      { conceptId: cQuad.id, score: 0.34, attempts: 5, correct: 2 },
    ],
  });

  await db.teacherNote.createMany({
    data: [
      {
        conceptId: cPlane.id,
        title: 'The Cartesian Plane — class notes',
        sourceRef: "Teacher's notes — Coordinate Geometry, Slide 2",
        content:
          'The Cartesian plane has two perpendicular number lines: the x-axis (horizontal) and the y-axis (vertical), meeting at the origin O (0, 0). The plane is divided into four quadrants numbered anticlockwise: I (top-right), II (top-left), III (bottom-left), IV (bottom-right). Every point is written as an ordered pair (x, y): x is the abscissa (perpendicular distance from the y-axis) and y is the ordinate (perpendicular distance from the x-axis).',
      },
      {
        conceptId: cPlot.id,
        title: 'Plotting Points — class notes',
        sourceRef: "Teacher's notes — Coordinate Geometry, Slide 5",
        content:
          'To plot a point A(3, 2): start at the origin, move 3 units right along the x-axis, then 2 units up parallel to the y-axis. Mark the point and label it. To plot (-2, 4): move 2 units left, then 4 units up. Golden rule: x first, y second — never swap the order, because (3, 2) and (2, 3) are different points.',
      },
      {
        conceptId: cQuad.id,
        title: 'Quadrants and Signs — class notes',
        sourceRef: "Teacher's notes — Coordinate Geometry, Slide 7",
        content:
          'Signs of coordinates in each quadrant: Quadrant I (+, +), Quadrant II (-, +), Quadrant III (-, -), Quadrant IV (+, -). Points on the x-axis have y = 0; points on the y-axis have x = 0. The origin is (0, 0). Quick check: the point (-3, -5) lies in Quadrant III because both coordinates are negative.',
      },
    ],
  });

  // ---------- App settings (founder PIN default 2405) ----------
  await db.appSettings.create({
    data: { id: 'main', founderPin: '2405', provider: 'builtin', builtinModelId: 'glm-4-plus' },
  });

  console.log('Seed complete: Class 9-A CBSE — Physics/Motion + Maths/Coordinate Geometry');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
