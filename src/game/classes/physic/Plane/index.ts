import Align from '../../utils/align'

export enum PlaneDepth { 'first' = 1, 'second' = 2, 'third' = 3 }

class Plane extends Phaser.GameObjects.Sprite {
  private planeBody: Phaser.Physics.Arcade.Body;
  private plane: PlaneDepth

  // FIRST PLANE = 3
  // SECOND PLANE = 2
  // THIRD PLANE = 1
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string = '',
    plane: PlaneDepth,
  ) {
      super(scene, x, y, texture);

      this.plane = plane
      
      this.setDepth(plane)

      scene.add.existing(this)
      scene.physics.add.existing(this)

      this.setScale(0.7)
      Align.left(this)
      Align.bottom(this)
      
      this.planeBody = this.body as Phaser.Physics.Arcade.Body;
      
      this.planeBody.world.on('worldbounds', function(body: any) {
        // Check if the body's game object is the sprite you are listening for
        // if (body.gameObject === this) {
        //   // Stop physics and render updates for this object
        //   this.setActive(false);
        //   this.setVisible(false);
        // }
      }, this.planeBody);

      this.movePlane()
  }

  public movePlane() {
    this.planeBody.setVelocityX(this.plane * (-30));
  }
}

export default Plane;
