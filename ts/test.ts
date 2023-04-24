// Завдання 1
function add(num: number): Function {
  let sum: number = num;
  function addNumber(item?: number): Function | number {
    if (item === undefined) {
      return sum;
    }
    sum += item;
    return addNumber;
  }
  return addNumber;
}
console.log(add(2)(3)(4)());

// Завдання 2
function isAnagram(str1: string, str2: string): boolean {
  let y: string = str1.split("").sort().join("");
  let z: string = str2.split("").sort().join("");

  return y === z;
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("haad", "wodf"));
console.log(isAnagram("listen", "silentn"));

// Завдання 3
function deepClone<T>(obj: T): T {
  const clone: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = obj[key];
  }
  return clone;
}
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = deepClone(obj1);

console.log(obj2);

// Завдання 4
const calc: (...args: number[]) => number = (...args: number[]) =>
  args.reduce((item, result) => (result += item));

function wrapper(
  func: (...args: number[]) => number
): (...args: number[]) => number {
  const cache: { [key: string]: number } = {};
  return function (...args: number[]) {
    const key: string = args.join(",");
    if (key in cache) {
      console.log(`${cache[key]} from cache`);
      return cache[key];
    }
    const result: number = func(...args);
    cache[key] = result;
    console.log(`${result} calculated`);
    return result;
  };
}
const cachedCalc: (...args: number[]) => number = wrapper(calc);
cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
