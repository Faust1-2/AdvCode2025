# Advent of Code 2025

This is my personnal repository regarding the advent of code 2025. Syntax may not always be the best everywhere 😊

## Requirements

- [NodeJs](https://nodejs.org/fr)
- [pnpm](https://pnpm.io/) (install with `npm i -g pnpm`)

## Installation

Run:

```bash
pnpm i
```

## Usage

Enter a challenge folder:

```bash
cd challenge-1
```

And run the following command:

```bash
node script.ts
```

In every file, you will have the possibility to change from the test input to the real input.
To switch between one another, edit the code as following:

> Initial code
```ts
const input = 'input.txt';
const test = 'test.txt';
fs.readFile(test, (error, data) => {
  //...
});
```

> New code:
```ts
const input = 'input.txt';
const test = 'test.txt';
fs.readFile(input, (error, data) => { // <-- changed "test" with "input"
  //...
});
```
