import State from "./state";

export enum DifficultyModes {
  easy,
  medium,
  hard,
  hardcore,
}

export interface MainState {
  difficulty: DifficultyModes;
}

export default class MainStateManager extends State {
  private static instance: MainStateManager;
  public state: MainState;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    this.state = {
      difficulty: DifficultyModes.easy,
    };
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): MainStateManager {
    if (!this.instance) {
      this.instance = new MainStateManager();
    }

    return this.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public incrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({ difficulty: difficulty > 2 ? 3 : difficulty + 1 });
  }

  public decrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({ difficulty: difficulty < 1 ? 0 : difficulty - 1 });
  }
}
