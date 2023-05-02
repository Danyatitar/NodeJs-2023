// Завдання 1
function add2(num: number): Function {
  let sum: number = num || 0;
  function addNumber(item?: number): Function | number {
    if (item === undefined) {
      return sum;
    }
    sum += item;
    return addNumber;
  }
  return addNumber;
}
console.log(add2(2)(3)(4)());
