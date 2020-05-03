import '../../../class/SpineContainer/SpineContainer'

class DragQueen {
  public dragQueen: any;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    this.dragQueen = scene.add.spineContainer(x, y, key, anim, loop)
    this.dragQueen.setScale(0.6)
    const body = this.dragQueen.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.dragQueen.setPhysicsSize(body.width * 0.5, body.height * 0.9)
    this.dragQueen.playAnimation('run', true)
  }
}

export default DragQueen;
