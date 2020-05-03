import Align from '../../../classes/utils/align'

class Background extends Phaser.GameObjects.Image {
  public background?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    img: string = ''
  ) {
    super(scene, x, y, img);
    this.background = scene.add.image(0, 0, "background")
    Align.scaleToGameH(this.background, 1)
    Align.centerV(this.background)
    Align.left(this.background)
  }

  public moveBackground () {
    if (this.background) {
      // handle extremity of screen
      // stop when background hits right
      if (this.background.x > window.innerWidth - this.background.displayWidth / 2 + 5) {
        this.background.x -= 1;
      }
    }
  }
}

export default Background;
