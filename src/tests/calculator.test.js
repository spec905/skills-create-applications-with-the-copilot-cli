const { add, subtract, multiply, divide } = require('../calculator');

describe('calculator basic operations', () => {
  test('add 2 + 3 = 5', () => {
    expect(add([2, 3])).toBe(5);
  });

  test('subtract 10 - 4 = 6', () => {
    expect(subtract([10, 4])).toBe(6);
  });

  test('multiply 45 * 2 = 90', () => {
    expect(multiply([45, 2])).toBe(90);
  });

  test('divide 20 / 5 = 4', () => {
    expect(divide([20, 5])).toBe(4);
  });

  test('addition with multiple operands', () => {
    expect(add([1, 2, 3, 4])).toBe(10);
  });

  test('division by zero throws', () => {
    expect(() => divide([4, 0])).toThrow('division by zero');
  });

  test('subtract requires at least two operands', () => {
    expect(() => subtract([5])).toThrow('subtract requires at least two operands');
  });

  test('divide requires at least two operands', () => {
    expect(() => divide([5])).toThrow('divide requires at least two operands');
  });

  test('handles floating point numbers', () => {
    expect(add([0.1, 0.2])).toBeCloseTo(0.30000000000000004);
  });
});
