// Завдання 1
// Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, який викликається для кожного елемента масиву послідовно. Результатом виклику має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:

// const array: Array<string> = ["one", "two", "three"];
// const results = await runSequent(array, (item, index) =>
//     Promise.resolve({
//         item,
//         index,
//     })
// );

// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

// Після внесення змін треба зробити команду npm run build а щоб запустити код npm run task1

async function runSequent<T>(
  array: T[],
  callback: (item: T, index: number) => Promise<{ item: T; index: number }>
): Promise<Array<{ item: T; index: number }>> {
  const results: Array<{ item: T; index: number }> = [];
  for (let i = 0; i < array.length; i++) {
    const { item, index } = await callback(array[i], i);
    results.push({ item, index });
  }
  return results;
}

const array: Array<string> = ["one", "two", "three"];
const results = await runSequent(array, (item, index) =>
  Promise.resolve({
    item,
    index,
  })
);

console.log(results);
