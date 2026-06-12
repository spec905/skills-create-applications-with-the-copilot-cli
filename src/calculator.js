#!/usr/bin/env node
// calculator.js
// Supported operations:
// - addition (add)
// - subtraction (subtract)
// - multiplication (multiply)
// - division (divide)

// Library functions (exported for testing)
function add(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function subtract(nums) {
  if (nums.length < 2) throw new Error('subtract requires at least two operands');
  return nums.reduce((a, b) => a - b);
}

function multiply(nums) {
  return nums.reduce((a, b) => a * b, 1);
}

function divide(nums) {
  if (nums.length < 2) throw new Error('divide requires at least two operands');
  if (nums.slice(1).some((n) => n === 0)) throw new Error('division by zero');
  return nums.reduce((a, b) => a / b);
}

// CLI behavior
if (require.main === module) {
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

  try {
    let result;
    switch (cmd) {
      case 'add':
        result = add(nums);
        break;
      case 'subtract':
        result = subtract(nums);
        break;
      case 'multiply':
        result = multiply(nums);
        break;
      case 'divide':
        result = divide(nums);
        break;
      default:
        usage();
    }
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (err.message === 'division by zero') {
      console.error('Error: division by zero');
      process.exit(3);
    }
    console.error(err.message);
    process.exit(2);
  }
}

module.exports = { add, subtract, multiply, divide };
