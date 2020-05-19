import Align from '../../utils/align'

export enum PlaneDepth { 'first' = 1, 'second' = 2, 'third' = 3 }

class Plane extends Phaser.GameObjects.Sprite {
  private planeBody: Phaser.Physics.Arcade.Body;
  private plane: PlaneDepth
  private speed: number

  // FIRST PLANE = 3
  // SECOND PLANE = 2
  // THIRD PLANE = 1
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string = '',
    plane: PlaneDepth,
    speed: number = 1
  ) {
    super(scene, x, y, texture);

    let { width, height } = scene.sys.game.canvas;

    this.plane = plane
    this.speed = speed

    this.setDepth(plane)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(0.7)
    Align.left(this)
    Align.bottom(this)

    this.planeBody = this.body as Phaser.Physics.Arcade.Body;

    const timeToExitCanvas = this.calculateTimeToExit(this.width, this.scale, 3 * this.speed, width)
    // console.log((timeToExitCanvas))
    setTimeout(() => {
      console.log('destroy')
      this.destroy(true)
    }, timeToExitCanvas)

    this.movePlane()
  }

  public movePlane() {
    this.planeBody.setVelocityX(this.plane * (- this.speed));
  }

  /**
   * Helper fonction
   *
   * Permet de calculer en sec combien de temps met
   * le plan à sortir du canvas
   */
  public calculateTimeToExit(
    planeWidth: number,
    planeScale: number,
    planeSpeed: number,
    canvasWidth: number
  ): number {
    const v = planeSpeed
    const d = canvasWidth + (planeWidth * planeScale) - ((planeWidth * planeScale) / 2)
    return (d / v) * 1000
  }
}

export default Plane;
