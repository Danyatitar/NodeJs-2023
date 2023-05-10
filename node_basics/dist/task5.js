class MyEventEmitter {
    constructor() {
        this.events = {};
    }
    registerHandler(eventName, handler) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }
    removeHandler(eventName, handler) {
        const handlers = this.events[eventName];
        if (!handlers) {
            return;
        }
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
    }
    emitEvent(eventName, ...args) {
        const handlers = this.events[eventName];
        if (handlers) {
            handlers.forEach((handler) => handler(...args));
        }
    }
}
const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () => console.log("Обліковий запис користувача оновлено"));
emitter.registerHandler("userUpdated2", () => console.log("Обліковий запис користувача оновлено 2"));
emitter.emitEvent("userUpdated2"); // Обліковий запис користувача оновлено
export {};
//# sourceMappingURL=task5.js.map