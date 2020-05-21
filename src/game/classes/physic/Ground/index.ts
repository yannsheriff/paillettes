import Align from "../../utils/align";

class Ground extends Phaser.GameObjects.Image {
  public ground?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    img: string = ""
  ) {
    super(scene, x, y, img);

    scene.add.existing(this)

    Align.bottom(this)
    Align.centerH(this)
    Align.scaleToGameW(this, 1.1)
  }
}

export default Ground;
