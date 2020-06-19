export default class State {
  public state: any;
  protected callbacks: Array<(state: any) => any>;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    this.callbacks = [];
    this.state = {};
  }

  public subscribe(callback: (state: any) => any) {
    this.callbacks.push(callback);
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
  }
}
