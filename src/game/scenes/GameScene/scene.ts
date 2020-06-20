import config from "./config";

import CharacterManager from "../../managers/CharacterManager";
import GroundComponent from "../../components/GroundComponent";
import SheetMusicComponent from "../../components/SheetMusicComponent";
import CharactersComponent from "../../components/CharactersComponent";
import BackgroundComponent from "../../components/BackgroundComponent";
import GodMotherComponent from "../../components/GodMotherComponent";
import AchievementComponent from "../../components/AchievementComponent";
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
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";

export class GameScene extends Phaser.Scene {
  private text?: Phaser.GameObjects.Text;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private mainStateManager: MainStateManager;
  private freeManager: FreestyleStateManager;
  private mainState: MainState;
  private ground?: GroundComponent;
  private glitter?: GlitterComponent;
  private animationManager?: AnimationManager;

  public isDebug?: boolean = false;
  private isGoingScore: boolean = false;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.mainStateManager = MainStateManager.getInstance();
    this.mainState = MainStateManager.getInstance().state;
    this.scoreManager = ScoreState.getInstance();
    this.freeManager = FreestyleStateManager.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
    MainGameManager.getInstance();
  }

  create() {
    this.freeManager.subscribe(this.updateFreeGlitter);
    this.scoreManager.onPerfect(this.triggerGlitter);
    this.mainStateManager.onGameStatusChange(this.gameStatusChange);
    this.startGame();
    // if (this.mainState.gameStatus !== GameStatus.requestReload) {
    // } else {
    // }
  }

  startGame = () => {
    this.mainStateManager.needMusicLoading();
    setTimeout(() => {
      this.animationManager?.register();
      new CurtainsComponent(this);
      new LogoComponent(this);
      new AchievementComponent(this);
      new BackgroundComponent(this);
      new CharactersComponent(this);
      this.ground = new GroundComponent(this);
      new SheetMusicComponent(this, this.CharacterManager);
      new DragQueenComponent(this);
      new GodMotherComponent(this);

      this.glitter = new GlitterComponent(this);

      // @ts-ignore
      this.isDebug = this.game.config.physics.arcade.debug;

      this.add
        .text(20, 20, "Score", { fill: "red" })
        .setInteractive()
        .setDepth(99)
        .on("pointerdown", () => {
          if (!this.isGoingScore) {
            alert("going score");
            this.mainStateManager.endGame();
            this.isGoingScore = true;
          }
        });

      // test number of items displayed in scene
      if (this.isDebug) {
        window.setInterval(() => {
          // @ts-ignore
          console.log(this.add.displayList.list);
        }, 5000);
      }
    }, 500);
  };

  private triggerGlitter = () => {
    this.glitter?.throwConfetti();
  };

  private updateFreeGlitter = (state: FreestyleState) => {
    this.glitter?.onFreeStateChange(state);
  };

  public update() {
    this.ground?.update();
    this.glitter?.update();
  }

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isReady:
        this.glitter?.playHome();
        break;
      case GameStatus.willLaunch:
        this.glitter?.stopHome();
        break;

      default:
        break;
    }
  };
}

export default GameScene;
