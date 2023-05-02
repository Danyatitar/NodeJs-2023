function arrayChangeDelete(array, deleteRule) {
    const deletedElements = [];
    let i = 0;
    while (i < array.length) {
        if (deleteRule(array[i])) {
            deletedElements.push(array.splice(i, 1)[0]);
        }
        else {
            i++;
        }
    }
    return deletedElements;
}
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 1);
console.log(array);
console.log(deletedElements);
export {};
//# sourceMappingURL=task2.js.map