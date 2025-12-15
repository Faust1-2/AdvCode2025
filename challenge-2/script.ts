import * as fs from 'fs';

function compute(ranges: string[]): number {
  const result: number[] = [];
  for (const range of ranges) {
    const split = range.split('-');
    const upper = Number(split[1]);
    for (let i = Number(split[0]); i <= upper; i++) {
      const stringed = i.toString();
      const midLength = stringed.length / 2;
      if (midLength % 1 === 0) {
        if (stringed.substring(0, midLength) === stringed.substring(midLength, stringed.length)) {
          result.push(i);
        }
      }
    }
  }
  return result.reduce((acc, curr) => acc + curr, 0);
}


function findNumberPattern(num: number) {
  const numToString = num.toString();
  for (let size = 1; size <= Math.floor(numToString.length / 2); size++) {
    const subs = [];
    for (let i = 0; i < numToString.length; i += size) {
      subs.push(numToString.substring(i, i + size));
    }
    let i = 1;
    let isSame = true;
    let prev = subs[0];
    do {
      const curr = subs[i];
      isSame = prev === curr;
      i += 1;
      prev = curr;
    } while(i < subs.length && isSame);
    if (isSame) {
      return true;
    }
  }
  return false;
}

function compute2(ranges: string[]): number {
  const result: number[] = [];
  for (const range of ranges) {
    const split = range.split('-');
    const upper = Number(split[1]);
    for (let i = Number(split[0]); i <= upper; i++) {
      const isSame = findNumberPattern(i);
      if (isSame) {
        result.push(i);
      }
    }
  }
  return result.reduce((acc, curr) => acc + curr, 0);
}

const input = './challenge-2.input.txt'
const test = './test-2.txt';
fs.readFile(input, (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    const ranges = data.toString().split(',');
    const result = compute(ranges);
    const result2 = compute2(ranges);
    console.log(result);
    console.log(result2);
  }
});


// Time for 1: ~20min
// Time for 2: ~30min