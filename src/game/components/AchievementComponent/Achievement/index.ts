import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";
import Align from "../../../helpers/Align/align";
import { Scene } from "phaser";
import { GameStep } from "../../../states/main";

class Achievement extends SpineContainer {
  // public SpineContainer: ISpineContainer;
  public scene: Phaser.Scene;
  private background?: Phaser.GameObjects.Rectangle;
  private achievementType: GameStep;
  
  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    achievementType: GameStep,
    loop?: boolean
  ) {
    super(scene, 0, 0, key, anim, loop);

    // full screen asset
    this.scene = scene;
    this.achievementType = achievementType;
    let scale;

    switch (this.achievementType) {
      case GameStep.game:
        scale = window.innerWidth / this.spineBody.width
        this.setScale(scale); // asset size
        this.y = window.innerHeight / 2 + (this.spineBody.height / 2 * this.scale)
        Align.centerH(this)
        break;
      case GameStep.score:
        scale = (window.innerWidth / this.spineBody.width) * 0.1
        this.setScale(scale); // asset size
        this.y = window.innerHeight - 50
        break;
      default:
        break;
    }
    scene.add.existing(this)

    this.drawDebug(false)
    // this.allowCollideWorldBounds(true)

    this.setDepth(20);

    this.darkBackground()
  }

  public darkBackground() {
    this.background = this.scene.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight, 
      0x000000
    ).setDepth(19).setAlpha(0)

    Align.centerH(this.background)
    Align.centerV(this.background)

    this.scene.tweens.add({
      targets: this.background,
      alpha: 0.3,
      duration: 1200,
      repeat: 0,
      yoyo: true,
    });
  }

  public deleteAchievement() {
    this.destroy();
  }
}

export default Achievement;
