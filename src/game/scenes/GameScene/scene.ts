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
import Align from "../../helpers/Align/align";

export class GameScene extends Phaser.Scene {
  private scoretext?: Phaser.GameObjects.Text;
  private camera?: Phaser.Cameras.Scene2D.Camera;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private mainStateManager: MainStateManager;
  private freeManager: FreestyleStateManager;
  private mainState: MainState;
  private ground?: GroundComponent;
  private sheetMusicComponent?: SheetMusicComponent;
  private glitter?: GlitterComponent;
  private animationManager?: AnimationManager;
  private nextButton?: Phaser.GameObjects.Image;

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
    this.camera = this.cameras.add(
      0,
      0,
      this.sys.scale.width,
      this.sys.scale.height
    );

    // if (this.mainState.gameStatus !== GameStatus.requestReload) {
    // } else {
    // }
  }

  startGame = () => {
    setTimeout(() => {
      this.animationManager?.register();
      new CurtainsComponent(this);
      new LogoComponent(this);
      new AchievementComponent(this);
      new BackgroundComponent(this);
      new CharactersComponent(this);
      this.ground = new GroundComponent(this);
      this.sheetMusicComponent = new SheetMusicComponent(
        this,
        this.CharacterManager
      );
      new DragQueenComponent(this);
      new GodMotherComponent(this);

      this.scoretext = this.add
        .text(window.innerWidth - 20, 20, "Score", { fill: "#ffffff" })
        .setOrigin(1, 0)
        .setInteractive()
        .setAlpha(0)
        .setDepth(90)
        .on("pointerdown", () => {
          if (!this.isGoingScore) {
            this.isGoingScore = true;
            this.mainStateManager.endGame();
          }
        });

      this.glitter = new GlitterComponent(this);

      this.camera?.setBackgroundColor("e3e3e3");

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

    if (this.mainState.gameStatus === GameStatus.requestReload) {
      setTimeout(() => {
        this.sheetMusicComponent?.initMusic();
      }, 3000);
    } else {
      this.addIndication()
      document.addEventListener("keydown", this.initMusic);
    }

    this.mainStateManager.needMusicLoading();
  };

  private initMusic = () => {
    this.removeIndication()
    this.sheetMusicComponent!.initMusic();
    document.removeEventListener("keydown", this.initMusic);

  };


  private addIndication() {
    this.nextButton = this.add
      .image(0, 0, "scoreNext")
      .setAlpha(0)
      .setDepth(52);
    Align.right(this.nextButton);
    Align.bottom(this.nextButton);

    setTimeout(() => {
      this.tweens.add({
        targets: this.nextButton,
        alpha: 1,
        duration: 300,
        ease: "Power2",
      });
    }, 3000);
  }

  private removeIndication() {
    if (this.mainState.gameStatus !== GameStatus.requestReload) {
      this.tweens.add({
        targets: this.nextButton,
        alpha: 0,
        duration: 300,
        ease: "Power2",
        onComplete: () => {
          this.nextButton!.destroy()
        }
      });
    }
  }

  private triggerGlitter = () => {
    this.glitter?.throwConfetti();
    this.camera?.zoomTo(1.02, 150);
    setTimeout(() => {
      this.camera?.zoomTo(1, 150);
    }, 210);
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
      case GameStatus.isRunning:
        this.scoretext?.setAlpha(0.5)
        break;

      default:
        break;
    }
  };
}

export default GameScene;
