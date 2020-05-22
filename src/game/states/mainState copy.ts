export enum DifficultyModes {
  easy,
  medium,
  hard,
  hardcore,
}

interface state {
  difficulty: DifficultyModes;
}

export default class MainState {
  private static instance: MainState;
  public state: state;
  private callbacks: Array<(state: state) => any>;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.state = {
      difficulty: DifficultyModes.easy,
    };
    this.callbacks = [];
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): MainState {
    if (!this.instance) {
      this.instance = new MainState();
    }

    return this.instance;
  }

  public subscribe(callback: (state: state) => any) {
    this.callbacks.push(callback);
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public incrementDifficulty(combo: number) {
    const { difficulty } = this.state;
    // ...
    if (difficulty === DifficultyModes.easy && combo > 5) {
      this.setState({ difficulty: DifficultyModes.medium });
    }
    if (difficulty === DifficultyModes.medium && combo > 10) {
      this.setState({ difficulty: DifficultyModes.hard });
    }
    if (difficulty === DifficultyModes.hard && combo > 20) {
      this.setState({ difficulty: DifficultyModes.hardcore });
    }
  }

  public decrementDifficulty() {
    // ...
    const { difficulty } = this.state;
    this.setState({ difficulty: difficulty - 1 });
  }

  private setState(partState: Partial<state>): void {
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
