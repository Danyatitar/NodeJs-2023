// Завдання 5
// Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber), який поводитиметься так:
// const emitter = new MyEventEmitter();
// emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
// emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено

// Після внесення змін треба зробити команду npm run build а щоб запустити код npm run task5

type EventHandler = (...args: any[]) => void;

class MyEventEmitter {
  private events: Record<string, EventHandler[]> = {};

  registerHandler(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  removeHandler(eventName: string, handler: EventHandler): void {
    const handlers = this.events[eventName];
    if (!handlers) {
      return;
    }
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  emitEvent(eventName: string, ...args: any[]): void {
    const handlers = this.events[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler(...args));
    }
  }
}

const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () =>
  console.log("Обліковий запис користувача оновлено")
);
emitter.registerHandler("userUpdated2", () =>
  console.log("Обліковий запис користувача оновлено 2")
);
emitter.emitEvent("userUpdated2"); // Обліковий запис користувача оновлено
