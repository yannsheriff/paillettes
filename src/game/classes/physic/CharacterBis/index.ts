import SpineContainer from '../SpineContainer/SpineContainer'

class PhysicCharacter extends SpineContainer {
  public SpineContainer: ISpineContainer;
  public planeY: number = 0;
  public id: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    id: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, anim, loop)
    this.id = id;

    this.SpineContainer = scene.add.spineContainer(x, y, key, anim, loop)
    // this.SpineContainer.allowCollideWorldBounds(true)

    // apply default skin to character
    this.SpineContainer.applyDefaultSkin(false)
    
    this.setScale(0.5) // container and hitbox size
    this.SpineContainer.setScale(0.5) // asset size
    this.SpineContainer.setDepth(10)
    
    this.SpineContainer.drawDebug(false)

    // this.launch()
    
    this.SpineContainer.faceDirection(-1)
    this.SpineContainer.runVelocity(-70)

    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9)
  }

  // public launch() {
  //   this.SpineContainer.spineBody.setVelocityX(-50)
  // }

  /**
   * deleteCharacter 
   */
  public deleteCharacter () {
    this.destroy()
    this.SpineContainer.delete()
  }
}

export default PhysicCharacter;
