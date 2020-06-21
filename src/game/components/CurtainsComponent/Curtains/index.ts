import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

// const animations = [
//   "close", "open", "loop-score", "code-open", "loop-code", "code-closed", "logo", "transition"
// ]

class Curtains extends SpineContainer {
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
      scale = window.innerWidth / this.spineBody.width
    } else {
      scale = window.innerHeight / this.spineBody.height
    }
    scale += 0.05;

    this.setScale(scale); // asset size
    this.setDepth(20);

    // placer son x en fonction de la moitié de la largeur
    // placer son y en fonction du bas
    // this.spineBody.width = valeur reelle

    this.x = window.innerWidth / 2 // ok
    this.y = 0;
    // this.y = this.spineBody.height * scale + 300

    // Align.centerV(this)
    // Align.centerH(this)
    scene.add.existing(this)

    this.drawDebug(false)
    // this.allowCollideWorldBounds(true)

    // this.runVelocity(50)
  }

  public play() {
    this.playAnimation("Transition", false);
  }

  public deleteScoreSpine() {
    this.destroy();
  }
}

export default Curtains;
