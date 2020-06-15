import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";

class Achievement extends SpineContainer {
  // public SpineContainer: ISpineContainer;

  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    super(scene, 0, 0, key, anim, loop);

    // full screen asset
    let scale = window.innerWidth / this.spineBody.width
    this.setScale(scale); // asset size
    
    this.y = window.innerHeight / 2 + (this.spineBody.height / 2 * this.scale)
    // Align.centerV(this)
    Align.centerH(this)
    scene.add.existing(this)

    this.drawDebug(false)
    // this.allowCollideWorldBounds(true)

    this.setDepth(20);

    // this.runVelocity(50)
  }

  public deleteAchievement() {
    this.destroy();
  }
}

export default Achievement;
