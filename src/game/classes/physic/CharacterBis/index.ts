import SpineContainer from '../../../class/SpineContainer/SpineContainer';

class CharacterBis extends SpineContainer {
  public SpineContainer: ISpineContainer;
  public planeY: number = 0;

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

    // apply default skin to character
    this.SpineContainer.applyDefaultSkin(false)

    this.setScale(1) // container and hitbox size
    this.SpineContainer.setScale(1) // asset size
    this.SpineContainer.allowCollideWorldBounds(true)

    this.SpineContainer.drawDebug(true)

    // this.SpineContainer.changeSlotColor("COLOR HEAD", 255, 0, 0)

    this.playAnimation('idle', true)

    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9)
  }
}

export default CharacterBis;
