import * as fs from 'fs';

function countFreshIngredients(ids: string[], ranges: string[]) {
  const freshIngredients = [];
  for (const id of ids) {
    if (isFresh(Number(id), ranges)) {
      freshIngredients.push(id);
    }
  }
  return freshIngredients.length;
}

function isFresh(id: number, ranges: string[], index = 0): boolean {
  if (ranges[index]) {
    return isInRange(id, ranges[index]) ? true : isFresh(id, ranges, index + 1);
  }
  return false;
}

function isInRange(id: number, range: string) {
  const splitted = range.split('-');
  const bottom = Number(splitted[0]);
  const top = Number(splitted[1]);
  return bottom <= id && id <= top;
}

// It works but the set is too big for Node :P (I was sure of it, the solution just looked funny)
function countAllAvailableIds(ranges: string[]): number {
  const set = new Set<number>();
  for (const range of ranges) {
    const splitted = range.split('-');
    for (let i = Number(splitted[0]); i <= Number(splitted[1]); i++) {
      set.add(i);
    }
  }
  return set.size;
}

function mergeOverlappingRanges(ranges: string[]): string[] {
 return ranges
  .sort((a, b) => {
    const first = Number(a.split('-')[0]);
    const second = Number(b.split('-')[0]);
    return first - second;
  })
  .reduce((accumulator, current) => {
    const lastElem = accumulator.at(-1)?.split('-');
    const curr = current.split('-');
    if (lastElem && Number(curr[0]) <= Number(lastElem[1])) {
      accumulator[accumulator.length - 1] = lastElem[0] + '-' + (curr[1] > lastElem[1] ? curr[1] : lastElem[1]);
    } else {
      accumulator.push(current);
    }
    return accumulator;
  }, [] as string[]);
}

function getAllAvailableIds(ranges: string[]): number {
  const sortedRanges = mergeOverlappingRanges(ranges);
  let result = 0;
  for (const range of sortedRanges) {
    const splitted = range.split('-');
    result += Number(splitted[1]) - Number(splitted[0]) + 1;
  }
  return result;
}

const test = 'test.txt';
const input = 'input.txt';
fs.readFile(input, (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    const splitted = data.toString().split('\n\n');
    const ranges = splitted[0].split('\n');
    const ids = splitted[1].split('\n');
    
    const result1 = countFreshIngredients(ids, ranges);
    console.log(result1);

    const result2 = getAllAvailableIds(ranges);
    console.log(result2);
  }
})

// Time for 1: ~12min
// Time for 2: ~1h15