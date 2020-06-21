export default class State {
  public state: any;
  protected callbacks: Array<(state: any) => any>;
  protected immuteCallbacks: Array<(state: any) => any>;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    this.callbacks = [];
    this.immuteCallbacks = [];
    this.state = {};
  }

  public subscribe(callback: (state: any) => any, immutable?: boolean) {
    if (immutable) {
      this.immuteCallbacks.push(callback);
    } else {
      this.callbacks.push(callback);
    }
  }
  public reset() {
    this.callbacks = [];
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */

  protected setState(partState: any): void {
    this.state = {
      ...this.state,
      ...partState,
    };
    this.dispatch();
  }

  private dispatch() {
    this.callbacks.forEach((callback) => callback(this.state));
    this.immuteCallbacks.forEach((callback) => callback(this.state));
  }
}
