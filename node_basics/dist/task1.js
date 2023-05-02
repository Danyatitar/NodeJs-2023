async function runSequent(array, callback) {
    const results = [];
    for (let i = 0; i < array.length; i++) {
        const { item, index } = await callback(array[i], i);
        results.push({ item, index });
    }
    return results;
}
const array = ["one", "two", "three"];
const results = await runSequent(array, (item, index) => Promise.resolve({
    item,
    index,
}));
console.log(results);
export {};
//# sourceMappingURL=task1.js.map