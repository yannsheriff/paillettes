import Align from '../../../classes/utils/align'

class Background extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0
  ) {
    super(scene, x, y);
    scene.add.container(x, y)
    let sprite = scene.add.sprite(200, 400, "background")
    this.add(sprite)
    
    // Align.scaleToGameH(sprite, 1)
    // Align.centerV(sprite)
    // Align.left(sprite)
    // console.log(sprite)
  }

  public addToContainer (thing: any) {
    this.add(thing)
  }

  public moveBackground () {
    // if (this.background) {
      // handle extremity of screen
      // stop when background hits right
      // if (this.background.x > window.innerWidth - this.background.displayWidth / 2 + 5) {
        // this.background.x -= 1;
      // }
    // }
  }
}

export default Background;
