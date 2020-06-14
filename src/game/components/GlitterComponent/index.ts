import MainStateManager, { MainState } from "../../states/main";
import { ConfettiGenerator } from "../../helpers/Confetti";

class GlitterComponent {
  private scene: Phaser.Scene;
  confettiManager?: ConfettiGenerator;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  texture?: Phaser.Textures.CanvasTexture;

  private mainState: MainState;
  private mainManager: MainStateManager;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    this.create();
  }

  public create() {
    this.texture = this.scene.textures.createCanvas(
      "xcvcb",
      window.innerWidth,
      window.innerHeight
    );

    this.canvas = this.texture.getCanvas();
    this.context = this.texture.getContext();
    this.confettiManager = new ConfettiGenerator(this.canvas, this.context);
    this.confettiManager.startConfetti();
    this.scene.textures.addCanvas("xcvcb", this.canvas);

    this.scene.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "xcvcb")
      .setDepth(20);
  }

  update() {
    this.confettiManager!.runAnimation();
    this.texture!.refresh();
  }

  private onMainStateChange = (state: MainState) => {
    if (state.isGameLaunch !== this.mainState.isGameLaunch) {
      // this.canRotate = true;
    }
    this.mainState = state;
  };
}

export default GlitterComponent;
