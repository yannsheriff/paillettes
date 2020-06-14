import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";

class DragQueen extends SpineContainer {
  // public SpineContainer: ISpineContainer;

  constructor(
    scene: Phaser.Scene,
    key: string,
    anim?: string,
    loop?: boolean
  ) {
    super(scene, 0, 0, key, anim, loop); // anim, loop

    this.x = window.innerWidth / 2;
    // Align.dragPosition(this, this.spine, this.scale);
    Align.charactersOnGround(this, this.spine, this.scale)
    scene.add.existing(this)

    this.setScale(0.5); // asset size    
    this.setDepth(15);
    this.drawDebug(false);

    this.mixAnimation("Start", "Run")
  }

  public deleteDragQueen() {
    this.destroy();
  }
}

export default DragQueen;
