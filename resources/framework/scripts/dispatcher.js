

export default class Dispatcher
{
  constructor() {
    this.events = {};
  }

  on(event, handler) {
    (this.events[event] ??= []).push(handler);
  }

  off(event, handler) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => handler(...args));
  }
}
