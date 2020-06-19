import ScoreStateManager from "../../states/score";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";

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
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fail = this.scene.sound.add("failSound", soundConfig);
    this.freestyle = this.scene.sound.add("freestyleSound", {
      ...soundConfig,
      volume: 0.7,
    });
    this.perfect = this.scene.sound.add("perfectSound", soundConfig);
    this.good = this.scene.sound.add("goodSound", soundConfig);

    // this.perfect.play();

    const scoreManager = ScoreStateManager.getInstance();
    scoreManager.onFail(this.playFail);
    scoreManager.onGood(this.playGood);
    scoreManager.onPerfect(this.playPerfect);
    FreestyleStateManager.getInstance().subscribe(this.checkFreestyle);
  }

  public playFail = () => {
    this.fail.play();
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
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
}
