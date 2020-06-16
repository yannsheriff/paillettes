import ScoreStateManager from "../../states/score";

const duration = 10000;

class ScoreCrowdComponent {
  private scene: Phaser.Scene;
  private characterPassCallback: () => unknown;
  private onEndCallBack: () => unknown;

  constructor(
    scene: Phaser.Scene,
    scale: number,
    characterPassCallback: () => unknown,
    onEndCallBack: () => unknown
  ) {
    this.scene = scene;
    this.characterPassCallback = characterPassCallback;
    this.onEndCallBack = onEndCallBack;

    this.create();
  }

  create() {
    const unlockedCharLength = ScoreStateManager.getInstance().state
      .charactersUnlocked.length;

    const intervalDuration = duration / unlockedCharLength;
    const interval = setInterval(this.characterPassCallback, intervalDuration);

    setTimeout(() => {
      clearInterval(interval);
      this.onEndCallBack();
    }, duration);
  }
}

export default ScoreCrowdComponent;
