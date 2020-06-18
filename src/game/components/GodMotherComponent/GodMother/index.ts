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

    // full screen asset
    let scale = window.innerWidth / this.spineBody.width
    scale = scale * 0.8
    this.setScale(scale); // asset size

    // placer son x en fonction de la moitié de la largeur
    // placer son y en fonction du bas
    // this.spineBody.width = valeur reelle
    
    this.x = window.innerWidth / 2 // ok
    this.y = -5;
    // this.y = this.spineBody.height * scale + 300

    // Align.centerV(this)
    // Align.centerH(this)
    scene.add.existing(this)

    this.drawDebug(false)
    // this.allowCollideWorldBounds(true)

    this.setDepth(15);

    // this.runVelocity(50)
  }

  public deleteGodMother() {
    this.destroy();
  }
}

export default GodMother;
