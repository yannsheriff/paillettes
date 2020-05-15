import Align from '../../utils/align'

export enum PlaneDepth { 'first' = 1, 'second' = 2, 'third' = 3 }

class Plane extends Phaser.GameObjects.Sprite {
  private planeBody: Phaser.Physics.Arcade.Body;

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
      
      this.setDepth(plane)

      scene.add.existing(this)
      scene.physics.add.existing(this)

      this.setScale(0.7)
      Align.left(this)
      Align.bottom(this)

      this.planeBody = this.body as Phaser.Physics.Arcade.Body;
      // this.planeBody.setVelocityX(plane * (-40));
  }  
}

export default Plane;
