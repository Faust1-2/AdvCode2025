import * as fs from 'fs';

function getBankJoltage(bank: string): number {
  const result: string[] = [bank[0], bank[1]];
  for (let i = 1; i < bank.length; i++) {
    const currentJolt = result.join('');
    const testJolt = result[0] + bank[i];
    const test2 = result[1] + bank[i];
    if (testJolt > currentJolt && testJolt > test2) {
      result[1] = bank[i];
    } else if (test2 > currentJolt) {
      result[0] = result[1]
      result[1] = bank[i];
    }
  }
  return Number(result.join(''));
}

function compute(banks: string[]) {
  let result = 0;
  for (const bank of banks) {
    result += getBankJoltage(bank);
  }
  return result;
}

function getBankJoltage12(bank: string): number {
  let result = bank.substring(0, 12).split('');
  for (let i = 12; i < bank.length; i++) {
    let copy: string[] = [];
    let j = 0;
    let smaller = true;
    do {
      copy = result.filter((_, y) => y !== j);
      copy.push(bank[i]);
      smaller = copy.join('') < result.join('');
      j++;
    } while (smaller && j < result.length);
    if (!smaller) {
      result = copy;
    }
  }
  return Number(result.join(''));
}

function compute2(banks: string[]): number {
  let result = 0;
  for (const bank of banks) {
    const r = getBankJoltage12(bank);
    result += r;
  }
  return result;
}

const input = 'input.txt';
const test = 'test.txt';
fs.readFile(input, (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    const banks = data.toString().split('\n');
    const result1 = compute(banks);
    const result2 = compute2(banks);
    console.log('result 1:', result1);
    console.log('result 2:', result2);
  }
})

// Time for 1: ~30min
// Time for 2: ~30min