export default class ScoreManager {
  private static instance: ScoreManager;
  public score: number;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.score = 0;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ScoreManager {
    if (!this.instance) {
      this.instance = new ScoreManager();
    }

    return this.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public registerGoodArrow() {
    // ...
    this.score += 10;
  }
  public registerPerfectArrow() {
    // ...
    this.score += 15;
  }
  public registerCharactere() {
    this.score += 10;
    // ...
  }
}
