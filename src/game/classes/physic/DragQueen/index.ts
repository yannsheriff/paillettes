import SpineContainer from '../../../class/SpineContainer/SpineContainer';

class DragQueen extends SpineContainer {
  public SpineContainer: ISpineContainer;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, anim, loop)
    this.SpineContainer = scene.add.spineContainer(x, y, key, anim, loop)
    this.SpineContainer.setScale(0.6)
    this.SpineContainer.allowCollideWorldBounds(true)

    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9)
    this.SpineContainer.playAnimation('run', true)

    // this.launch()
  }

  public run() {
    this.SpineContainer.x += 5
  }

  public launch() {
    this.SpineContainer.spineBody.setVelocityX(50)
  }
}

export default DragQueen;
