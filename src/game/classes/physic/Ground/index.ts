import Align from '../../utils/align'

class Ground extends Phaser.GameObjects.Image {
  public ground?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    img: string = ''
  ) {
    super(scene, x, y, img);
    this.ground = scene.add.image(0, 0, "ground")
    Align.scaleToGameW(this.ground, 1) // half height of the screen
    Align.centerH(this.ground) // half height of the screen
    Align.bottom(this.ground)
  }
}

export default Ground;
