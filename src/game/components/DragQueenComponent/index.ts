import SpineContainer from "../../helpers/SpineContainer/SpineContainer";

class DragQueen extends SpineContainer {
  // public SpineContainer: ISpineContainer;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, anim, loop);
    scene.add.existing(this)

    this.setScale(0.8); // asset size
    this.drawDebug(true)
    // this.allowCollideWorldBounds(true)

    this.setDepth(15);
    this.drawDebug(false);

    // this.runVelocity(50)

    const body = this.body as Phaser.Physics.Arcade.Body;
    this.setPhysicsSize(body.width * 0.5, body.height * 0.9);
  }

  // public launch() {
  //   this.SpineContainer.spineBody.setVelocityX(50)
  // }
}

export default DragQueen;
