import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";

const animations = [
  "close", "open", "loop-score", "code-open", "loop-code", "code-closed", "logo", "transition"
]
class Score extends SpineContainer {
  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    loop?: boolean
  ) {
    super(scene, 0, 0, key, anim, loop);

    let scale;
    // full screen asset
    if (window.innerHeight < window.innerWidth) {
      scale = window.innerWidth / this.spineBody.width * 0.4
    } else {
      scale = window.innerHeight / this.spineBody.height * 0.5
    }
    scale += 0.05;

    this.setScale(scale); // asset size
    this.setDepth(9);

    this.x = window.innerWidth / 2 // ok
    this.y = 0;

    scene.add.existing(this)

    this.drawDebug(false)
  }

  public play() {
    this.playAnimation("Transition", false);
  }

  public deleteScoreSpine() {
    this.destroy();
  }
}

export default Score;
