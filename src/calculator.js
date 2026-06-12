#!/usr/bin/env node
// calculator.js
// Supported operations:
// - addition (add)
// - subtraction (subtract)
// - multiplication (multiply)
// - division (divide)

const [,, cmd, ...args] = process.argv;

function usage() {
  console.error('Usage: node src/calculator.js <add|subtract|multiply|divide> num1 [num2 ...]');
  process.exit(1);
}

if (!cmd) usage();

const nums = args.map((n) => {
  const v = Number(n);
  if (Number.isNaN(v)) {
    console.error(`Invalid number: ${n}`);
    process.exit(2);
  }
  return v;
});

if (nums.length === 0) {
  console.error('At least one numeric argument is required.');
  process.exit(2);
}

let result;
switch (cmd) {
  case 'add':
    // addition: sum all operands
    result = nums.reduce((a, b) => a + b, 0);
    break;

  case 'subtract':
    // subtraction: subtract subsequent operands from the first
    if (nums.length < 2) {
      console.error('subtract requires at least two operands');
      process.exit(2);
    }
    result = nums.reduce((a, b) => a - b);
    break;

  case 'multiply':
    // multiplication: multiply all operands
    result = nums.reduce((a, b) => a * b, 1);
    break;

  case 'divide':
    // division: divide the first by each subsequent operand in order
    if (nums.length < 2) {
      console.error('divide requires at least two operands');
      process.exit(2);
    }
    if (nums.slice(1).some((n) => n === 0)) {
      console.error('Error: division by zero');
      process.exit(3);
    }
    result = nums.reduce((a, b) => a / b);
    break;

  default:
    usage();
}

// Print result to stdout and exit successfully
console.log(result);
process.exit(0);
