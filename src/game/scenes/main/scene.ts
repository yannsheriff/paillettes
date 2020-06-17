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
import MainStateManager, { MainState, GameStatus } from "../../states/main";
import GlitterComponent from "../../components/GlitterComponent";
import CurtainsComponent from "../../components/CurtainsComponent";
import LogoComponent from "../../components/LogoComponent";
import ConfettiScene from "../test/confetti/conffeti";
import ConfettiConfig from "../test/confetti/config";

export class GameScene extends Phaser.Scene {
  private text?: Phaser.GameObjects.Text;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private mainStateManager: MainStateManager;
  private mainState: MainState;
  private ground?: GroundComponent;
  private glitter?: GlitterComponent;
  private animationManager: AnimationManager;
  private assetsManager: AssetsManager;
  public isDebug?: boolean = false;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.mainStateManager = MainStateManager.getInstance();
    this.mainState = MainStateManager.getInstance().state;
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

    this.mainStateManager.subscribe(this.onMainStateChange);
  }

  public preload(): void {
    this.load.once("start", this.loadStart);
    this.load.scene.load.on("progress", this.loadProgress);
    this.load.once("complete", this.startGame);

    this.load.plugin(
      "rexcanvasplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js",
      true
    );

    // this.scene.add("Confetti", ConfettiScene, true);
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
    this.mainStateManager.gameIsReady();
    this.text!.destroy();

    setTimeout(() => {
      this.animationManager.register();
      new BackgroundComponent(this);
      new CharactersComponent(this);
      this.ground = new GroundComponent(this);
      new SheetMusicComponent(this, this.CharacterManager);
      new DragQueenComponent(this);
      new GodMotherComponent(this);
      new CurtainsComponent(this);
      new LogoComponent(this);
      this.glitter = new GlitterComponent(this);

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
    this.glitter?.update();
  }

  private onMainStateChange = (state: MainState) => {
    console.log("THE END", state.gameStatus);
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.isGameOver
    ) {
      setTimeout(() => {
        this.scene.start("ScoreScene");
        console.log("EEEEND");
      }, 5000);
    }
  };
}

export default GameScene;
