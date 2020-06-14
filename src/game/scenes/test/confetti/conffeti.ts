import config from "./config";
import { ConfettiGenerator } from "./confettiManager";

export default class TestSceneBlob extends Phaser.Scene {
  confettiManager?: ConfettiGenerator;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  texture?: Phaser.Textures.CanvasTexture;

  constructor() {
    super(config);
  }

  public preload(): void {}

  public create() {
    this.texture = this.textures.createCanvas(
      "canvas",
      window.innerWidth,
      window.innerHeight
    );
    this.canvas = this.texture.getCanvas();
    this.context = this.texture.getContext();
    this.confettiManager = new ConfettiGenerator(this.canvas, this.context);
    this.confettiManager.startConfetti();
    this.textures.addCanvas("canvas", this.canvas);

    const circleImage = this.add.image(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "canvas"
    );
  }

  update() {
    this.confettiManager!.runAnimation();
    this.texture!.refresh();
  }
}
