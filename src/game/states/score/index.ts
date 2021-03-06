import MainStateManager, {
  MainState,
  DifficultyModes,
  GameStatus,
} from "../main";
import State from "../state";
import { GridObject } from "../../components/SheetMusicComponent";

export interface ScoreState {
  score: number;
  combo: number;
  charactersUnlocked: string[];
  achievementsUnlocked: AchievementType[];
}

export enum AchievementType {
  characters10 = "characters10", // badge1
  characters20 = "characters20", // badge2
  characters30 = "characters30", // badge3
  freestyle1 = "freestyle1", // badge4
  freestyle2 = "freestyle2", // badge5
  world1 = "world1", // badge6
  world2 = "world2", // badge7
  world3 = "world3", // badge8
  world4 = "world4", // badge9
  worldall = "worldall", // badge10
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
  private failCallbacks: Array<(gridObject: GridObject) => unknown>;
  private failImmuteCallbacks: Array<(gridObject: GridObject) => unknown>;
  private goodCallbacks: Array<(gridObject: GridObject) => unknown>;
  private perfectImmuteCallbacks: Array<(gridObject: GridObject) => unknown>;
  private goodImmuteCallbacks: Array<(gridObject: GridObject) => unknown>;
  private perfectCallbacks: Array<(gridObject: GridObject) => unknown>;
  private successCallbacks: Array<(gridObject: GridObject) => unknown>;
  private successImmuteCallbacks: Array<(gridObject: GridObject) => unknown>;
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
      charactersUnlocked: [],
      achievementsUnlocked: [],
    };
    this.failImmuteCallbacks = [];
    this.failCallbacks = [];
    this.goodCallbacks = [];
    this.successCallbacks = [];
    this.successImmuteCallbacks = [];
    this.perfectImmuteCallbacks = [];
    this.goodImmuteCallbacks = [];
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
  public registerGoodArrow(arrow: GridObject) {
    this.setState({ score: this.state.score + 10 });
    this.dispatchGood(arrow);
    this.handleCombo(ComboType.good);
  }

  public registerPerfectArrow(arrow: GridObject) {
    this.setState({ score: this.state.score + 15 });
    this.dispatchPerfect(arrow);
    this.handleCombo(ComboType.perfect);
  }

  public registerFail(arrow: GridObject) {
    this.dispatchFail(arrow);
    this.handleCombo(ComboType.fail);
  }
  public registerCharactere() {
    this.setState({ score: this.state.score + 10 });
  }
  public onPerfect(callback: (arrow: GridObject) => any, immutable?: boolean) {
    if (immutable) {
      this.perfectImmuteCallbacks.push(callback);
    } else {
      this.perfectCallbacks.push(callback);
    }
  }
  public onGood(callback: (arrow: GridObject) => any, immutable?: boolean) {
    if (immutable) {
      this.goodImmuteCallbacks.push(callback);
    } else {
      this.goodCallbacks.push(callback);
    }
  }
  public onFail(callback: (arrow: GridObject) => any, immutable?: boolean) {
    if (immutable) {
      this.failImmuteCallbacks.push(callback);
    } else {
      this.failCallbacks.push(callback);
    }
  }
  public onSuccess(callback: (arrow: GridObject) => any, immutable?: boolean) {
    if (immutable) {
      this.successImmuteCallbacks.push(callback);
    } else {
      this.successCallbacks.push(callback);
    }
  }
  public registrerUnlockedCharacter(assetName: string) {
    this.setState({
      charactersUnlocked: [...this.state.charactersUnlocked, assetName],
    });
  }
  public registerUnlockedAchievement(achievement: AchievementType) {
    // this.achievementsUnlocked.push(achievement) // non immuable

    this.setState({
      achievementsUnlocked: [...this.state.achievementsUnlocked, achievement], // immuable
    });
  }
  private dispatchGood(arrow: GridObject) {
    this.goodCallbacks.forEach((callback) => callback(arrow));
    this.goodImmuteCallbacks.forEach((callback) => callback(arrow));
    this.successCallbacks.forEach((callback) => callback(arrow));
    this.successImmuteCallbacks.forEach((callback) => callback(arrow));
  }
  private dispatchPerfect(arrow: GridObject) {
    this.perfectCallbacks.forEach((callback) => callback(arrow));
    this.perfectImmuteCallbacks.forEach((callback) => callback(arrow));
    this.successCallbacks.forEach((callback) => callback(arrow));
    this.successImmuteCallbacks.forEach((callback) => callback(arrow));
  }
  private dispatchFail(arrow: GridObject) {
    this.failCallbacks.forEach((callback) => callback(arrow));
    this.failImmuteCallbacks.forEach((callback) => callback(arrow));
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

    if (difficulty === DifficultyModes.easy && combo > 6) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.medium && combo > 6) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
    if (difficulty === DifficultyModes.hard && combo > 10) {
      this.setState({ combo: 0 });
      this.mainStateManager.incrementDifficulty();
    }
  };

  private decrementDifficulty = () => {
    const { difficulty } = this.mainState;
    const { combo } = this.state;

    if (difficulty === DifficultyModes.medium && combo < -10) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
    if (difficulty === DifficultyModes.hard && combo < -4) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
    if (difficulty === DifficultyModes.hardcore && combo < 0) {
      this.setState({ combo: 0 });
      this.mainStateManager.decrementDifficulty();
    }
  };

  reset() {
    this.callbacks = [];
    this.successCallbacks = [];
    this.failCallbacks = [];
    this.goodCallbacks = [];
    this.perfectCallbacks = [];
  }

  resetUnlocked() {
    this.setState({
      charactersUnlocked: [],
      achievementsUnlocked: [],
      score: 0,
      combo: 0,
    });
  }
}
