import Align from '../../utils/align'

// FIRST PLANE = 3
// SECOND PLANE = 2
// THIRD PLANE = 1
const mappingPlanes = [
    3, 2, 1
]

class Plane extends Phaser.GameObjects.Sprite {
  public planeBody: Phaser.Physics.Arcade.Body;
  public speed: number
  public planeNb: number

  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string = '',
    plane: number,
    globalspeed: number = 1
  ) {
    super(scene, x, y, texture);

    this.planeNb = mappingPlanes[plane]
    console.log(this.planeNb)

    this.speed = globalspeed * this.planeNb

    this.setDepth(this.planeNb)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(0.7)
    Align.left(this)
    Align.bottom(this)

    this.planeBody = this.body as Phaser.Physics.Arcade.Body;

    this.movePlane()
  }

  public movePlane() {
    this.planeBody.setVelocityX(- this.speed);
  }
}

export default Plane;
