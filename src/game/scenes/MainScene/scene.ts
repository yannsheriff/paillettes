import config from "./config";

import AnimationManager from "../../helpers/Animations";
import AssetsManager from "../../helpers/Assets";
import GameScene from "./../GameScene";
import { mainAnimations } from "../../assets/animations";
import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../assets/assets";

import SoundManager from "../../managers/SoundManager";
import MainStateManager, { GameStatus } from "../../states/main";
import ScoreScene from "../ScoreScene";

export class MainScene extends Phaser.Scene {
  private text?: Phaser.GameObjects.Text;
  private animationManager: AnimationManager;
  private assetsManager: AssetsManager;
  private mainStateManager: MainStateManager;

  constructor() {
    super(config);
    this.mainStateManager = MainStateManager.getInstance();
    this.mainStateManager.onGameStatusChange(this.gameStatusChange, true);
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

  private gameStatusChange = (status: GameStatus) => {
    console.log("GameStatus : ", status);
    switch (status) {
      case GameStatus.isGameOver:
        setTimeout(() => {
          this.scene.stop("Game");
          this.scene.remove("Game");
          this.scene.add("ScoreScene", ScoreScene, true);
        }, 5000);
        break;
      case GameStatus.requestReload:
        console.log("REQUEST RELOAD");
        setTimeout(() => {
          this.scene.stop("ScoreScene");
          this.scene.remove("ScoreScene");
          this.scene.add("Game", GameScene, true);
        }, 1000);
        break;

      default:
        break;
    }
  };
}

export default MainScene;
