import MainStateManager, { MainState, DifficultyModes } from "./mainState";
import State from "./state";

export interface ScoreState {
  score: number;
  combo: number;
}

export default class ScoreStateManager extends State {
  private static instance: ScoreStateManager;
  private mainState: MainState;
  private mainStateManager: MainStateManager;
  public state: ScoreState;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    this.state = {
      score: 0,
      combo: 0,
    };
    this.mainStateManager = MainStateManager.getInstance();
    this.mainState = this.mainStateManager.state;
    this.mainStateManager.subscribe((state) => (this.mainState = state));
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ScoreStateManager {
    if (!this.instance) {
      this.instance = new ScoreStateManager();
    }

    return this.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public registerGoodArrow() {
    this.setState({ score: this.state.score + 10 });
    this.handleCombo(1);
  }

  public registerPerfectArrow() {
    this.setState({ score: this.state.score + 15 });
    this.handleCombo(2);
  }

  public registerFail() {
    this.handleCombo(-1);
  }

  public registerCharactere() {
    this.setState({ score: this.state.score + 10 });
  }

  private handleCombo(input: 1 | 2 | -1) {
    switch (input) {
      case 1:
        this.setState({ combo: this.state.combo + 1 });
        break;

      case 2:
        this.setState({ combo: this.state.combo + 2 });
        break;

      case -1:
        if (this.state.combo > 1) {
          this.setState({ combo: 0 });
        } else {
          this.setState({ combo: this.state.combo - 1 });
        }
        break;
    }

    if (this.state.combo < -3) {
      this.decrementDifficulty();
    }

    if (this.state.combo < -20) {
      console.log("pause ?");
    }

    if (this.state.combo > 5) {
      this.incrementDifficulty();
    }
  }

  // ...

  incrementDifficulty = () => {
    const { difficulty } = this.mainState;
    const { combo } = this.state;

    if (difficulty === DifficultyModes.easy && combo > 10) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.medium && combo > 20) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.hard && combo > 50) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
  };

  decrementDifficulty = () => {
    const { difficulty } = this.mainState;
    const { combo } = this.state;

    if (difficulty === DifficultyModes.easy && combo < -5) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
    if (difficulty === DifficultyModes.medium && combo < -3) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
    if (difficulty === DifficultyModes.hard && combo < 0) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
  };
}
