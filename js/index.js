// Завдання 1
function add(num) {
  let sum = num || 0;
  function addNumber(item) {
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
function isAnagram(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    if (str2.indexOf(str1[i]) === -1) {
      return false;
    }
  }
  return true;
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("haad", "wodf"));

// Завдання 3
function deepClone(obj) {
  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = obj[key];
  }
  return clone;
}
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = deepClone(obj1);

console.log(obj2);

// Завдання 4
const calc = (...args) => args.reduce((item, result) => (result += item));

function wrapper(func) {
  const cache = {};
  return function (...args) {
    const key = args.join(",");
    if (key in cache) {
      console.log(`${cache[key]} from cache`);
      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    console.log(`${result} calculated`);
    return result;
  };
}
const cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
