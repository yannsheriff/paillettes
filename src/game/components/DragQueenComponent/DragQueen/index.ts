import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";

class DragQueen extends SpineContainer {
  // public SpineContainer: ISpineContainer;

  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    super(scene, 0, 0, key, anim, loop);

    this.x = window.innerWidth / 2;
    // Align.dragPosition(this, this.spine, this.scale);
    Align.charactersOnGround(this, this.spine, this.scale)
    scene.add.existing(this)

    this.setScale(0.5); // asset size
    this.drawDebug(true)
    // this.allowCollideWorldBounds(true)

    this.setDepth(15);
    this.drawDebug(false);

    // this.runVelocity(50)
  }

  public deleteDragQueen() {
    this.destroy();
  }

  // public launch() {
  //   this.SpineContainer.spineBody.setVelocityX(50)
  // }
}

export default DragQueen;
