import ScoreStateManager from "../../states/score";

const duration = 10000;

class ScoreCrowdComponent {
  private scene: Phaser.Scene;
  private scale: number;
  private characterPassCallback: () => unknown;
  private onEndCallBack: () => unknown;

  constructor(
    scene: Phaser.Scene,
    scale: number,
    characterPassCallback: () => unknown,
    onEndCallBack: () => unknown
  ) {
    this.scene = scene;
    this.scale = scale;
    this.characterPassCallback = characterPassCallback;
    this.onEndCallBack = onEndCallBack;

    this.create();
  }

  create() {
    const unlockedCherLength = ScoreStateManager.getInstance().state
      .characterWon.length;

    const intervalDuration = duration / unlockedCherLength;
    const interval = setInterval(this.characterPassCallback, intervalDuration);

    setTimeout(() => {
      clearInterval(interval);
      this.onEndCallBack();
    }, duration);
  }
}

export default ScoreCrowdComponent;
