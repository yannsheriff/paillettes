import config from "./config";

import CharacterManager from "../../managers/CharacterManager";
import GroundComponent from "../../components/GroundComponent";
import SheetMusicComponent from "../../components/SheetMusicComponent";
import CharactersComponent from "../../components/CharactersComponent";
import BackgroundComponent from "../../components/BackgroundComponent";
import GodMotherComponent from "../../components/GodMotherComponent";
import ScoreState from "../../states/score";
import AnimationManager from "../../helpers/Animations";
import AssetsManager from "../../helpers/Assets";
import { mainAnimations } from "../../assets/animations";
import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../assets/assets";
import DragQueenComponent from "../../components/DragQueenComponent";
import MainGameManager from "../../managers/MainGameManager";
import MainStateManager from "../../states/main";
import GlitterComponent from "../../components/GlitterComponent";

export class GameScene extends Phaser.Scene {
  private text?: Phaser.GameObjects.Text;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private ground?: GroundComponent;
  private animationManager: AnimationManager;
  private assetsManager: AssetsManager;
  public isDebug?: boolean = false;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.scoreManager = ScoreState.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
    this.assetsManager = new AssetsManager(
      this,
      mainImages,
      mainSpritesheets,
      mainSpines,
      mainMusic
    );
    MainGameManager.getInstance();
  }

  public preload(): void {
    this.load.once("start", this.loadStart);
    this.load.scene.load.on("progress", this.loadProgress);
    this.load.once("complete", this.startGame);

    this.animationManager.preload();
    this.assetsManager.preload();
  }

  public create() {}

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
    MainStateManager.getInstance().gameIsReady();
    this.text!.destroy();

    setTimeout(() => {
      this.animationManager.register();
      new BackgroundComponent(this);
      new CharactersComponent(this);
      this.ground = new GroundComponent(this);
      new SheetMusicComponent(this, this.CharacterManager);
      new DragQueenComponent(this);
      new GodMotherComponent(this);
      new GlitterComponent(this);

      // @ts-ignore
      this.isDebug = this.game.config.physics.arcade.debug;

      // test number of items displayed in scene
      if (this.isDebug) {
        window.setInterval(() => {
          // @ts-ignore
          console.log(this.add.displayList.list);
        }, 5000);
      }
    }, 500);
  };

  public update() {
    this.ground?.update();
  }
}

export default GameScene;
