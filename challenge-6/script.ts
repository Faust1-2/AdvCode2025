import * as fs from 'fs';

function calc(operation: '*' | '+', ...numbers: number[]) {
  if (operation === '*') {
    let result = 1;
    for (const num of numbers) {
      result *= num; 
    }
    return result;
  } else {
    let result = 0;
    for (const num of numbers) {
      result += num;
    }
    return result;
  }
}

function turnTables(table: string[][], operationLength: number) {
  const flippedTable: string[][] = [];
  for (let y = 0; y < operationLength; y++) {
    const line = [];
    for (let i = 0; i < table.length; i++) {
      line.push(table[i][y])
    }
    flippedTable.push(line);
  }
  return flippedTable;
}

function doTheMath(table: string[][], operations: string[]) {
  const flippedTable = turnTables(table, operations.length).map(line => line.map(value => Number(value)));
  let result = 0;
  for (const [index, numbers] of flippedTable.entries()) {
    const operation = operations[index] as '*' | '+';
    result += calc(operation, ...numbers);
  }
  return result;
}

/// PART 2 FUNCTIONS

function splitOps(operations: string[]) {
  let index = -1;
  const splitted = [];
  for (const operation of operations) {
    if (operation !== '') {
      index++;
      splitted.push([operation]);
    } else {
      splitted[index].push(operation);
    }
  }
  return splitted;
}

function createTableWithBlank(splitOps: string[][], data: string[]) {
  const table = [];
  for (const line of data) {
    let previous = 0;
    const newLine = [];
    for(const [index, operation] of splitOps.entries()) {
      let value = line.substring(previous, previous + operation.length + 1);
      if (index !== operation.length && value.at(-1) === ' ') {
        value = value.substring(0, value.length - 1);
      }
      newLine.push(value);
      previous = previous + operation.length + 1;
    }
    table.push(newLine);
  }
  return table;
}

function doWhateverItIsSupposedToDo(table: string[][], operations: string[][]) {
  const flippedTable: string[][] = [];
  for (let y = 0; y < operations.length; y++) {
    const cols: string[][] = [];
    for (let i = 0; i < table.length; i++) {
      const operation = operations[y];
      let t = 0;
      for (let j = operation.length - 1; j >= 0; j--) {
        if (cols[t]) {
          cols[t].push(table[i][y][j]);
        } else {
          cols.push([table[i][y][j]]);
        }
        t++;
      }
    }
    flippedTable.push(cols.map(d => d.join('')));
  }
  return flippedTable;
}

function doTheMathAgain(table: string[][], operations: string[][]) {
  const flippedTable = doWhateverItIsSupposedToDo(table, operations);
  let result = 0;
  for (const [index, numbers] of flippedTable.entries()) {
    const operation = operations[index][0] as '*' | '+';
    const r = calc(operation, ...numbers.map(v => Number(v)));
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
    const fullData = data.toString().split('\n').map(d => d.split(/\s+/g).filter(d => d !== ''));
    const table = fullData.slice(0, fullData.length - 1);
    const operations = fullData[fullData.length - 1];

    const result1 = doTheMath(table, operations);
    console.log('Result 1:', result1);

    const simpleSplit = data.toString().split('\n').map(l => l.split(' '));
    const ops = simpleSplit[simpleSplit.length - 1];
    const sOps = splitOps(ops);
    const table2 = createTableWithBlank(sOps, data.toString().split('\n').slice(0, fullData.length - 1));
    const result2 = doTheMathAgain(table2, sOps);
    console.log('Result2:', result2);
  }
});

// Time for 1 ~20min
// Time for 2 ~2hs (input part was terrifying)