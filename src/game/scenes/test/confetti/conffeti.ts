import config from "./config";
import { ConfettiManager } from "./confettiManager";

export default class TestSceneBlob extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {}

  public create() {
    const circle = document.createElement("canvas");
    const ctx = circle.getContext("2d");
    ctx!.beginPath();
    ctx!.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx!.stroke();
    this.textures.addCanvas("circle", circle);
    const circleImage = this.add.image(200, 200, "circle");
  }

  update() {
    // ConfettiManager.
  }
}
