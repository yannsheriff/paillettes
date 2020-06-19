import config from "./config";

import AnimationManager from "../../helpers/Animations";
import AssetsManager from "../../helpers/Assets";
import { mainAnimations } from "../../assets/animations";
import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../assets/assets";

import SoundManager from "../../managers/SoundManager";

export class GameScene extends Phaser.Scene {
  private text?: Phaser.GameObjects.Text;
  private animationManager: AnimationManager;
  private assetsManager: AssetsManager;

  constructor() {
    super(config);
    this.animationManager = new AnimationManager(this, mainAnimations);
    this.assetsManager = new AssetsManager(
      this,
      mainImages,
      mainSpritesheets,
      mainSpines,
      mainMusic
    );
  }

  public preload(): void {
    this.load.once("start", this.loadStart);
    this.load.scene.load.on("progress", this.loadProgress);
    this.load.once("complete", this.startGame);
    this.animationManager.preload();
    this.assetsManager.preload();
  }

  loadStart = () => {
    this.text = this.add
      .text(window.innerWidth / 2 - 70 * 2, window.innerHeight / 2, "", {
        fontFamily: "LondrinaSolid",
        fontSize: "70px",
        fontStyle: "",
        color: "#34364c",
        fixedWidth: 300,
        align: "center",
      })
      .setDepth(11)
      .setText("Start loading");
  };

  loadProgress = (progress: any) => {
    this.text!.setText(Math.round(progress * 100).toString() + "%");
  };

  startGame = () => {
    this.text!.destroy();
    console.log("instance SoundManager");

    SoundManager.getInstance(this);
    this.scene.launch("Game");
  };
}

export default GameScene;
