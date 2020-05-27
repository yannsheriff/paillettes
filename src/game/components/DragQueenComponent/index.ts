import SpineContainer from "../../Helpers/SpineContainer/SpineContainer";

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
    super(scene, x, y, key, anim, loop);
    this.SpineContainer = scene.add.spineContainer(x, y, key, anim, loop);
    this.setScale(0.8); // container and hitbox size
    this.SpineContainer.setScale(0.8); // asset size
    // this.SpineContainer.allowCollideWorldBounds(true)

    this.SpineContainer.setDepth(15);
    this.SpineContainer.drawDebug(false);

    // this.SpineContainer.runVelocity(50)

    const body = this.SpineContainer.body as Phaser.Physics.Arcade.Body;
    this.SpineContainer.setPhysicsSize(body.width * 0.5, body.height * 0.9);
  }

  // public launch() {
  //   this.SpineContainer.spineBody.setVelocityX(50)
  // }
}

export default DragQueen;
