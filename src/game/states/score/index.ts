import MainStateManager, { MainState, DifficultyModes } from "../main";
import State from "../state";
import Arrow from "../../components/SheetMusicComponent/Arrow";

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
  private failCallbacks: Array<(gridObject: Arrow) => any>;
  private goodCallbacks: Array<(gridObject: Arrow) => any>;
  private perfectCallbacks: Array<(gridObject: Arrow) => any>;
  private successCallbacks: Array<(gridObject: Arrow) => any>;
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
    this.failCallbacks = [];
    this.goodCallbacks = [];
    this.successCallbacks = [];
    this.perfectCallbacks = [];
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
  public registerGoodArrow(arrow: Arrow) {
    this.setState({ score: this.state.score + 10 });
    this.dispatchGood(arrow);
    this.handleCombo(ComboType.good);
  }

  public registerPerfectArrow(arrow: Arrow) {
    this.setState({ score: this.state.score + 15 });
    this.dispatchPerfect(arrow);
    this.handleCombo(ComboType.perfect);
  }

  public registerFail(arrow: Arrow) {
    this.dispatchFail(arrow);
    this.handleCombo(ComboType.fail);
  }

  public registerCharactere() {
    this.setState({ score: this.state.score + 10 });
  }

  public onPerfect(callback: (arrow: Arrow) => any) {
    this.perfectCallbacks.push(callback);
  }
  public onGood(callback: (arrow: Arrow) => any) {
    this.goodCallbacks.push(callback);
  }
  public onFail(callback: (arrow: Arrow) => any) {
    this.failCallbacks.push(callback);
  }
  public onSuccess(callback: (arrow: Arrow) => any) {
    this.successCallbacks.push(callback);
  }

  private dispatchGood(arrow: Arrow) {
    this.goodCallbacks.forEach((callback) => callback(arrow));
    this.successCallbacks.forEach((callback) => callback(arrow));
  }
  private dispatchPerfect(arrow: Arrow) {
    this.perfectCallbacks.forEach((callback) => callback(arrow));
    this.successCallbacks.forEach((callback) => callback(arrow));
  }
  private dispatchFail(arrow: Arrow) {
    this.failCallbacks.forEach((callback) => callback(arrow));
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

  private incrementDifficulty = () => {
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

  private decrementDifficulty = () => {
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
