import { ConfettiGenerator } from "../../helpers/Confetti";
import ScoreStateManager from "../../states/score";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";

class GlitterComponent {
  private scene: Phaser.Scene;
  private confettiManager?: ConfettiGenerator;
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;
  private texture?: Phaser.Textures.CanvasTexture;
  private freeState: FreestyleState;
  private freestyleStateManager: FreestyleStateManager;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.freestyleStateManager = FreestyleStateManager.getInstance();
    ScoreStateManager.getInstance().onPerfect(this.throwConfetti);
    this.freestyleStateManager.subscribe(this.onFreeStateChange);

    this.freeState = this.freestyleStateManager.state;

    this.create();
  }

  private create() {
    this.texture = this.scene.textures.createCanvas(
      "glitter",
      window.innerWidth,
      window.innerHeight
    );

    this.canvas = this.texture.getCanvas();
    this.context = this.texture.getContext();
    this.confettiManager = new ConfettiGenerator(
      this.canvas,
      this.context,
      false
    );

    this.scene.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "glitter")
      .setDepth(20);
  }

  private throwConfetti = () => {
    this.confettiManager?.startConfetti(500, undefined, 150);
  };

  public update() {
    this.confettiManager!.runAnimation();
    this.texture!.refresh();
  }

  private onFreeStateChange = (state: FreestyleState) => {
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
      this.confettiManager?.startConfetti(
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
