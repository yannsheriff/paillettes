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
    const interval = setInterval(this.characterPassCallback, 1000);

    setTimeout(() => {
      clearInterval(interval);
      this.onEndCallBack();
    }, 3000);
  }
}

export default ScoreCrowdComponent;
