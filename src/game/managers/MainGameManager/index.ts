import ScoreStateManager, { ScoreState } from "../../states/score";
import MainStateManager, { MainState, GameStatus } from "../../states/main";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";
import CharacterManager from "../CharacterManager";

export default class MainGameManager {
  private static instance: MainGameManager;
  private scoreState: ScoreState;
  private scoreManager: ScoreStateManager;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private freeState: FreestyleState;
  private freeManager: FreestyleStateManager;
  private nextWorldChange: number;
  private characterManager: CharacterManager;
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
    this.mainManager.onGameStatusChange(this.gameStatusChange, true);

    this.freeManager = FreestyleStateManager.getInstance();
    this.freeState = this.freeManager.state;
    this.freeManager.subscribe(this.freeChange, true);

    this.characterManager = CharacterManager.getInstance();
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
      this.nextWorldChange += 500;

      if (this.nextWorldChange > 1999) {
        this.nextWorldChange = 300000;
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

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isGameOver:
        this.characterManager.reset();
        this.scoreManager.reset();
        this.freeManager.reset();
        this.mainManager.reset();
        break;
      case GameStatus.requestReload:
        this.scoreManager.resetUnlocked();
        break;

      default:
        break;
    }
  };
}
