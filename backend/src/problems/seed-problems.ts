import { DataSource } from 'typeorm';
import { Problem } from './problem.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'problems.db',
  entities: [Problem],
  synchronize: true,
});

const problems: Partial<Problem>[] = [
  // Algebra
  { topic: 'algebra', question: 'Solve x + 2 = 5', answer: 'x = 3', difficulty: 'easy' },
  { topic: 'algebra', question: 'Factor x^2 - 4', answer: '(x - 2)(x + 2)', difficulty: 'easy' },
  { topic: 'algebra', question: 'Solve 2x = 10', answer: 'x = 5', difficulty: 'easy' },
  { topic: 'algebra', question: 'Simplify 3x + 2x', answer: '5x', difficulty: 'easy' },
  { topic: 'algebra', question: 'Solve x^2 = 9', answer: 'x = 3 or x = -3', difficulty: 'medium' },
  { topic: 'algebra', question: 'Expand (x + 1)^2', answer: 'x^2 + 2x + 1', difficulty: 'easy' },
  { topic: 'algebra', question: 'Solve x/2 = 4', answer: 'x = 8', difficulty: 'easy' },
  { topic: 'algebra', question: 'Solve x^2 - x = 0', answer: 'x = 0 or x = 1', difficulty: 'medium' },
  { topic: 'algebra', question: 'Factor x^2 + 2x + 1', answer: '(x + 1)^2', difficulty: 'easy' },
  { topic: 'algebra', question: 'Solve 5x = 20', answer: 'x = 4', difficulty: 'easy' },
  // Trigonometry
  { topic: 'trigonometry', question: 'Find sin(30°)', answer: '0.5', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find cos(60°)', answer: '0.5', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find tan(45°)', answer: '1', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find sin(90°)', answer: '1', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find cos(0°)', answer: '1', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find tan(0°)', answer: '0', difficulty: 'easy' },
  { topic: 'trigonometry', question: 'Find sin(45°)', answer: '0.707', difficulty: 'medium' },
  { topic: 'trigonometry', question: 'Find cos(45°)', answer: '0.707', difficulty: 'medium' },
  { topic: 'trigonometry', question: 'Find tan(30°)', answer: '0.577', difficulty: 'medium' },
  { topic: 'trigonometry', question: 'Find sin(60°)', answer: '0.866', difficulty: 'medium' },
  // Geometry
  { topic: 'geometry', question: 'Calculate the area of a circle with radius 2', answer: '12.57', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the perimeter of a square with side 4', answer: '16', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the area of a triangle with base 3 and height 4', answer: '6', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the volume of a cube with side 2', answer: '8', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the area of a rectangle 5x3', answer: '15', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the circumference of a circle with radius 1', answer: '6.28', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the area of a square with side 5', answer: '25', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the volume of a sphere with radius 1', answer: '4.19', difficulty: 'medium' },
  { topic: 'geometry', question: 'Calculate the area of a triangle with base 5 and height 2', answer: '5', difficulty: 'easy' },
  { topic: 'geometry', question: 'Calculate the perimeter of a rectangle 6x2', answer: '16', difficulty: 'easy' },
  // Statistics
  { topic: 'statistics', question: 'Calculate the mean of [2, 4, 6]', answer: '4', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the median of [1, 3, 5]', answer: '3', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the mode of [2, 2, 3, 4]', answer: '2', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the range of [5, 10, 15]', answer: '10', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the mean of [10, 20, 30]', answer: '20', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the median of [2, 4, 8]', answer: '4', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the mode of [1, 1, 2, 3]', answer: '1', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the range of [1, 5, 9]', answer: '8', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the mean of [5, 7, 9]', answer: '7', difficulty: 'easy' },
  { topic: 'statistics', question: 'Calculate the median of [6, 8, 10]', answer: '8', difficulty: 'easy' },
];

async function seed() {
  await dataSource.initialize();
  for (const p of problems) {
    await dataSource.getRepository(Problem).save(p);
  }
  await dataSource.destroy();
  console.log('Seeded problems!');
}

seed();
