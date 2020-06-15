import Align from "../../helpers/Align/align";

const BarWidth = 1236;

class BarComponent {
  private scene: Phaser.Scene;
  private scale: number;
  private bar?: Phaser.GameObjects.Image;
  private progress?: Phaser.GameObjects.Rectangle;
  private progressTip?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, scale: number) {
    this.scene = scene;
    this.scale = scale;

    this.create();
  }

  create() {
    this.bar = this.scene.add
      .image(0, window.innerHeight * 0.8, "Bar")
      .setScale(this.scale)
      .setDepth(13);
    Align.centerH(this.bar);
    const progress = 20;

    const progressWidth = ((BarWidth * this.scale - 40) / 100) * progress;
    this.progress = this.scene.add
      .rectangle(
        window.innerWidth / 2 -
          (BarWidth * this.scale) / 2 +
          progressWidth / 2 +
          20,
        window.innerHeight * 0.8,
        progressWidth,
        20,
        Phaser.Display.Color.GetColor(255, 255, 255)
      )
      .setDepth(13);

    this.progressTip = this.scene.add
      .image(
        window.innerWidth / 2 -
          (BarWidth * this.scale) / 2 +
          progressWidth +
          20,
        window.innerHeight * 0.8,
        "BarLoaderTip"
      )
      .setScale(this.scale)
      .setDepth(13);
  }
}

export default BarComponent;
