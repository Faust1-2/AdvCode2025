import * as fs from 'fs';

function compute(currentPosition: number, lines: string[]): number {
  let occurences = 0;
  for (const line of lines) {
    const shift = Number(line.substring(1));
    if (line[0] === 'L') {
      currentPosition = (currentPosition - shift) % 100;
      if (currentPosition < 0) {
        currentPosition = 100 + currentPosition;
      }
    } else {
      currentPosition = (currentPosition + shift) % 100;
    }
    if (currentPosition === 0) {
      occurences++;
    }
  }
  return occurences;
}

function compute2(currentPosition: number, lines: string[]): number {
  let occurences = 0;
  for (const line of lines) {
    const shift = Number(line.substring(1));
    for (let i = 0; i < shift; i++) {
      currentPosition = (line[0] === 'L' ? currentPosition - 1 : currentPosition + 1) % 100;
      if (currentPosition === 0) {
        occurences++;
      }
    }
  }
  return occurences;
}

const input = './challenge-1.input.txt';
const test = './test.txt';
fs.readFile(input, (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    const lines = data.toString().split('\n');
    const result = compute(50, lines);
    const result2 = compute2(50, lines);
    console.log("Result is:", result);
    console.log("Result for 2 is:", result2);
  }
});

// Time for 1: ~15min
// Time for 2: ~40min + needed help (Adv of code Reddit)