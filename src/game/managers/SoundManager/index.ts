import ScoreStateManager from "../../states/score";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";
import MainStateManager, { GameStatus } from "../../states/main";

const soundConfig = {
  mute: false,
  volume: 0.1,
  rate: 1,
  detune: 0,
  seek: 0,
  loop: false,
  delay: 0,
};

export default class SoundManager {
  private static instance: SoundManager;
  private scene: Phaser.Scene;
  private fail: Phaser.Sound.BaseSound;
  private freestyle: Phaser.Sound.BaseSound;
  private perfect: Phaser.Sound.BaseSound;
  private good: Phaser.Sound.BaseSound;
  private applause: Phaser.Sound.BaseSound;
  private score: Phaser.Sound.BaseSound;
  private home: Phaser.Sound.BaseSound;

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(scene: Phaser.Scene): SoundManager {
    if (!this.instance) {
      this.instance = new SoundManager(scene);
    }
    return this.instance;
  }

  private constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fail = this.scene.sound.add("failSound", soundConfig);
    this.freestyle = this.scene.sound.add("freestyleSound", {
      ...soundConfig,
      volume: 0.7,
    });
    this.perfect = this.scene.sound.add("perfectSound", soundConfig);
    this.good = this.scene.sound.add("goodSound", soundConfig);
    this.score = this.scene.sound.add("scoreSound", soundConfig);
    this.applause = this.scene.sound.add("applauseSound", {
      ...soundConfig,
      volume: 0.2,
    });
    this.home = this.scene.sound.add("home", {
      ...soundConfig,
      volume: 0.3,
    });

    const scoreManager = ScoreStateManager.getInstance();
    scoreManager.onFail(this.playFail, true);
    scoreManager.onGood(this.playGood, true);
    scoreManager.onPerfect(this.playPerfect, true);
    FreestyleStateManager.getInstance().subscribe(this.checkFreestyle, true);

    const mainStateManager = MainStateManager.getInstance();
    mainStateManager.onGameStatusChange(this.gameStatusChange, true);
  }

  public playFail = () => {
    this.fail.play();
  };
  public playHome = () => {
    this.home.play();
  };
  public playGood = () => {
    this.good.play();
  };
  public playPerfect = () => {
    this.perfect.play();
  };
  public playFreestyle = () => {
    this.freestyle.play();
  };
  public playScore = () => {
    console.log("playscore sound");

    this.score.play();
  };

  private checkFreestyle = (state: FreestyleState) => {
    if (state.isFreestyleActivated) {
      this.playFreestyle();
    }
  };

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isReady:
        this.home.play();
        break;
      case GameStatus.willLaunch:
        this.scene.tweens.add({
          targets: this.home,
          volume: 0,
          duration: 1000,
          onComplete: () => this.home.stop(),
        });
        break;
      case GameStatus.isGameOver:
        setTimeout(() => this.applause.play(), 4000);
        break;

      default:
        break;
    }
  };

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
}
