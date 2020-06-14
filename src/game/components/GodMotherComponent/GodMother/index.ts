import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";

class GodMother extends SpineContainer {
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
    Align.top(this)
    scene.add.existing(this)

    this.setScale(1); // asset size
    this.drawDebug(true)
    // this.allowCollideWorldBounds(true)

    this.setDepth(15);
    this.drawDebug(false);

    // this.runVelocity(50)
  }

  public deleteGodMother() {
    this.destroy();
  }
}

export default GodMother;
