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

    this.setScale(0.5); // asset size
  
    Align.dragPosition(this, this.spine, this.scale);
    Align.charactersOnGround(this, this.spine, this.scale)
    
    scene.add.existing(this)

    this.setDepth(15);
    this.drawDebug(false);

    this.mixAnimation("Start", "Run")
    this.mixAnimation("Dance-left", "Dance-right")
    this.mixAnimation("Dance-left", "Dance-up")
    this.mixAnimation("Dance-left", "Dance-down")
    this.mixAnimation("Dance-right", "Dance-left")
    this.mixAnimation("Dance-right", "Dance-down")
    this.mixAnimation("Dance-right", "Dance-down")
    this.mixAnimation("Dance-down", "Dance-up")
    this.mixAnimation("Dance-down", "Dance-right")
    this.mixAnimation("Dance-down", "Dance-left")
    this.mixAnimation("Dance-up", "Dance-down")
    this.mixAnimation("Dance-up", "Dance-left")
    this.mixAnimation("Dance-up", "Dance-right")
  }

  public deleteDragQueen() {
    this.destroy();
  }
}

export default DragQueen;
