import ScoreStateManager, { ScoreState } from "../../states/score";
import MainStateManager, { MainState } from "../../states/main";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";

export default class MainGameManager {
  private static instance: MainGameManager;
  private scoreState: ScoreState;
  private scoreManager: ScoreStateManager;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private freeState: FreestyleState;
  private freeManager: FreestyleStateManager;
  private nextWorldChange: number;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.scoreManager = ScoreStateManager.getInstance();
    this.scoreState = this.scoreManager.state;
    this.scoreManager.subscribe(this.scoreChange);
    this.nextWorldChange = 800;

    this.mainManager = MainStateManager.getInstance();
    this.mainState = this.mainManager.state;
    this.mainManager.subscribe((main) => (this.mainState = main));

    this.freeManager = FreestyleStateManager.getInstance();
    this.freeState = this.freeManager.state;
    this.freeManager.subscribe(this.freeChange);
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
    if (scoreState.score > this.nextWorldChange) {
      this.nextWorldChange += 800;

      if (this.nextWorldChange > 3199) {
        this.nextWorldChange = 30000;
      }

      this.mainManager.changeWorld();
    }
    this.scoreState = scoreState;
  };

  private freeChange = (freeState: FreestyleState) => {
    if (freeState.remainingLetters.length === 0) {
      this.freeManager.activateFreeMode();
    }
    this.freeState = freeState;
  };
}
