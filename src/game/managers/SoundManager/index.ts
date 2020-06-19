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
  scene: Phaser.Scene;
  fail: Phaser.Sound.BaseSound;
  freestyle: Phaser.Sound.BaseSound;
  perfect: Phaser.Sound.BaseSound;
  good: Phaser.Sound.BaseSound;
  home: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fail = this.scene.sound.add("failSound", soundConfig);
    this.freestyle = this.scene.sound.add("freestyleSound", {
      ...soundConfig,
      volume: 0.7,
    });
    this.perfect = this.scene.sound.add("perfectSound", soundConfig);
    this.good = this.scene.sound.add("goodSound", soundConfig);
    this.home = this.scene.sound.add("home", {
      ...soundConfig,
      volume: 0.3,
    });

    const scoreManager = ScoreStateManager.getInstance();
    scoreManager.onFail(this.playFail);
    scoreManager.onGood(this.playGood);
    scoreManager.onPerfect(this.playPerfect);
    FreestyleStateManager.getInstance().subscribe(this.checkFreestyle);

    const mainStateManager = MainStateManager.getInstance();
    mainStateManager.onGameStatusChange(this.gameStatusChange);
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
