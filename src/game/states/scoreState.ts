import MainState from "./mainState";

export default class ScoreState {
  private static instance: ScoreState;
  private mainState: MainState;
  public combo: number;
  public score: number;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.score = 0;
    this.combo = 0;
    this.mainState = MainState.getInstance();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ScoreState {
    if (!this.instance) {
      this.instance = new ScoreState();
    }

    return this.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public registerGoodArrow() {
    this.score += 10;
    this.handleCombo(1);
  }

  public registerPerfectArrow() {
    this.score += 15;
    this.handleCombo(2);
  }

  public registerFail() {
    this.handleCombo(-1);
  }

  public registerCharactere() {
    this.score += 10;
    // ...
  }

  private handleCombo(input: 1 | 2 | -1) {
    switch (input) {
      case 1:
        this.combo += 1;
        break;

      case 2:
        this.combo += 2;
        break;

      case -1:
        if (this.combo > 1) {
          this.combo = 0;
        } else {
          this.combo -= 1;
        }
        break;
    }

    if (this.combo < -5) {
      this.mainState.decrementDifficulty();
    }

    if (this.combo < -20) {
      console.log("pause ?");
    }

    if (this.combo > 5) {
      this.mainState.incrementDifficulty(this.combo);
    }
    console.log(this.combo);
  }
}
