import ScoreStateManager, { ScoreState } from "../../states/score";
import MainStateManager, { MainState } from "../../states/main";

export default class MainGameManager {
  private static instance: MainGameManager;
  private scoreState: ScoreState;
  private scoreManager: ScoreStateManager;
  private mainState: MainState;
  private mainManager: MainStateManager;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.scoreManager = ScoreStateManager.getInstance();
    this.scoreManager.subscribe(this.scoreChange);
    this.scoreState = this.scoreManager.state;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe((main) => (this.mainState = main));
    this.mainState = this.mainManager.state;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): MainGameManager {
    if (!this.instance) {
      this.instance = new MainGameManager();
    }
    return this.instance;
  }

  private scoreChange = (scoreState: ScoreState) => {
    if (scoreState.score > 100 && !this.mainState.didChangeWorld) {
      this.mainManager.changeWorld();
    }
    this.scoreState = scoreState;
  };
}
