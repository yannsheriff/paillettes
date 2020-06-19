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

    // setTimeout(() => {
    //   this.scene.start("ScoreScene");
    //   this.scene.stop("Game");
    //   setTimeout(() => {
    //     this.scene.remove("Game");
    //   }, 500);

    //   setTimeout(() => {
    //     // this.scene.add("Game", GameScene, true);
    //     // this.scene.start("Game");
    //     this.scene.stop("ScoreScene");
    //     setTimeout(() => {
    //       // this.scene.remove("ScoreScene");
    //       this.mainStateManager.restart();
    //       this.scene.add("Game", GameScene, true);
    //     }, 500);
    //   }, 3500);
    // }, 5000);
  };

  private gameStatusChange = (status: GameStatus) => {
    console.log("GameStatus : ", status);
    switch (status) {
      case GameStatus.isGameOver:
        setTimeout(() => {
          this.scene.start("ScoreScene");
          this.scene.stop("Game");
          setTimeout(() => {
            this.scene.remove("Game");
          }, 500);
        }, 5000);
        break;
      case GameStatus.requestReload:
        console.log("REQUEST RELOAD");
        this.scene.stop("ScoreScene");
        setTimeout(() => {
          this.scene.remove("ScoreScene");
          this.scene.add("Game", GameScene, true);
        }, 500);
        break;

      default:
        break;
    }
  };
}

export default MainScene;
