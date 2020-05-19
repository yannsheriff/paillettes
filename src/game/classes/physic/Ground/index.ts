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
    this.ground = scene.add.image(
      window.innerWidth / 2 - 100,
      window.innerHeight - 250,
      "ground"
    );
    this.ground.setScale(0.8);
  }
}

export default Ground;
