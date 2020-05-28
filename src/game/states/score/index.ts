import MainStateManager, { MainState, DifficultyModes } from "../main";
import State from "../state";

export interface ScoreState {
  score: number;
  combo: number;
}
enum ComboType {
  good,
  perfect,
  fail,
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
    this.handleCombo(ComboType.good);
  }

  public registerPerfectArrow() {
    this.setState({ score: this.state.score + 15 });
    this.handleCombo(ComboType.perfect);
  }

  public registerFail() {
    this.handleCombo(ComboType.fail);
  }

  public registerCharactere() {
    this.setState({ score: this.state.score + 10 });
  }

  private handleCombo(comboType: ComboType) {
    switch (comboType) {
      case ComboType.good:
        this.setState({ combo: this.state.combo + 1 });
        break;

      case ComboType.perfect:
        this.setState({ combo: this.state.combo + 2 });
        break;

      case ComboType.fail:
        if (this.state.combo > 1) {
          this.setState({ combo: 0 });
        } else {
          this.setState({ combo: this.state.combo - 1 });
        }
        break;
    }

    if (this.state.combo <= 0) {
      this.decrementDifficulty();
    }

    if (this.state.combo < -5) {
      console.log("pause ?");
    }

    if (this.state.combo > 5) {
      this.incrementDifficulty();
    }
  }

  incrementDifficulty = () => {
    const { difficulty } = this.mainState;
    const { combo } = this.state;

    if (difficulty === DifficultyModes.easy && combo > 10) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.medium && combo > 40) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.hard && combo > 100) {
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
