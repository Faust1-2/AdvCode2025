import * as fs from 'fs';

function countAccessibleRolls(table: string[][]): number {
  let result = 0;
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[y].length; x++) {
      if (table[y][x] === '@' && isAccessible(x, y, table)) {
        result++;
      }
    }
  }
  return result;
}

function isAccessible(x: number, y: number, table: string[][], max = 4) {
  let count = 0;
  let compY = y - 1;
  do {
    for (let i = x - 1; i <= x + 1; i++) {
      if ((i !== x || compY !== y) && (table[compY] && table[compY][i] === '@')) {
        count++;
      }
    }
    compY++;
  } while(count < max && compY !== y + 2);
  return count < max;
}

function getAccessibleRolls(table: string[][]): number[][] {
  let positions: number[][] = [];
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[y].length; x++) {
      if (table[y][x] === '@' && isAccessible(x, y, table)) {
        positions.push([y, x]);
      }
    }
  }
  return positions;
}

function countAllAccessibleRolls(table: string[][]): number {
  let positions: number[][] = [];
  let result = 0;
  do {
    positions = getAccessibleRolls(table);
    for (const position of positions) {
      table[position[0]][position[1]] = '.';
    }
    result += positions.length;
  } while(positions.length !== 0);
  return result;
}


const test = 'test.txt';
const input = 'input.txt';
fs.readFile(input, (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    const table: string[][] = data.toString().split('\n').map((line) => line.split(''));
    const result1 = countAccessibleRolls(table);
    const result2 = countAllAccessibleRolls(table);
    console.log('Result1:', result1);
    console.log('Result2:', result2);
  }
});

// Time for 1: ~30 min
// Time for 2: ~10 min