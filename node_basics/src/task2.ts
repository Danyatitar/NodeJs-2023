// Завдання 2
// Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву. Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
// const array = [1, 2, 3, 6, 7, 9];
// const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

// IDE має розглядати змінні з прикладу так:
// item: number
// deletedElements: Array
// результат виклику:
// array = [1, 3, 7, 9]
// deletedElements = [2, 6]

// Після внесення змін треба зробити команду npm run build а щоб запустити код npm run task2

function arrayChangeDelete<T>(
  array: T[],
  deleteRule: (item: T) => boolean
): T[] {
  const deletedElements: T[] = [];
  let i = 0;
  while (i < array.length) {
    if (deleteRule(array[i])) {
      deletedElements.push(array.splice(i, 1)[0]);
    } else {
      i++;
    }
  }
  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 1);
console.log(array);
console.log(deletedElements);
