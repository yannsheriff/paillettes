import { ConfettiGenerator } from "../../helpers/Confetti";
import ScoreStateManager from "../../states/score";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";
import Canvas from "phaser3-rex-plugins/plugins/canvas.js";

class GlitterComponent {
  // private scene: Phaser.Scene;
  // private confettiManager?: ConfettiGenerator;
  // private canvas?: Phaser.GameObjects.GameObject;
  // private context?: CanvasRenderingContext2D;
  // private texture?: Phaser.Textures.CanvasTexture;
  // private freeState: FreestyleState;
  // private freestyleStateManager: FreestyleStateManager;

  // constructor(scene: Phaser.Scene) {
  constructor(scene) {
    this.scene = scene;

    this.freestyleStateManager = FreestyleStateManager.getInstance();
    ScoreStateManager.getInstance().onPerfect(this.throwConfetti);
    this.freestyleStateManager.subscribe(this.onFreeStateChange);

    this.freeState = this.freestyleStateManager.state;

    this.create();
  }

  create() {
    this.canvas = new Canvas(
      this.scene,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight
    ).setDepth(20);

    this.scene.add.existing(this.canvas);

    this.confettiManager = new ConfettiGenerator(
      this.canvas.getCanvas(),
      this.canvas.getContext(),
      false
    );
    this.confettiManager.startConfetti(500, undefined, 150);
  }

  throwConfetti = () => {
    this.confettiManager.startConfetti(500, undefined, 150);
  };

  update() {
    this.confettiManager.runAnimation();
    this.canvas.needRedraw();
  }

  onFreeStateChange = (state) => {
    if (state.isFreestyleActivated !== this.freeState.isFreestyleActivated) {
      // this.canRotate = true;
      const colors = [
        "rgba(93, 37, 218,",
        "rgba(255, 0, 125,",
        "rgba(235, 54, 126,",
        "rgba(243, 174, 224,",
        "rgba(240, 219, 75,",
        "rgba(115, 251, 245,",
      ];
      this.confettiManager.startConfetti(
        state.freestyleDuration,
        undefined,
        150,
        colors
      );
    }
    this.freeState = state;
  };
}

export default GlitterComponent;
