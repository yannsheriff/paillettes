import config from "./config";

import CharacterManager from "../../managers/CharacterManager";
import GroundComponent from "../../components/GroundComponent";
import SheetMusicComponent from "../../components/SheetMusicComponent";
import CharactersComponent from "../../components/CharactersComponent";
import BackgroundComponent from "../../components/BackgroundComponent";
import ScoreState from "../../states/score";
import AnimationManager from "../../helpers/Animations";
import AssetsManager from "../../helpers/Assets";
import { mainAnimations } from "../../assets/animations";
import { mainImages, mainSpritesheets, mainSpines } from "../../assets/assets";
import DragQueen from "../../components/DragQueenComponent";
import MainGameManager from "../../managers/MainGameManager";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private ground?: GroundComponent;
  private animationManager: AnimationManager;
  private assetsManager: AssetsManager;
  private dragQueen?: DragQueen;
  public isDebug?: boolean = false;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.scoreManager = ScoreState.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
    this.assetsManager = new AssetsManager(this, mainImages, mainSpritesheets, mainSpines);
    MainGameManager.getInstance();
  }

  public preload(): void {
    this.animationManager.preload();
    this.assetsManager.preload();
  }

  public create() {
    this.animationManager.register();
    new BackgroundComponent(this);
    new CharactersComponent(this);
    this.ground = new GroundComponent(this);
    const sheetX = window.innerWidth / 4;
    const sheetY = (window.innerHeight / 6) * 4;
    new SheetMusicComponent(this, this.CharacterManager, sheetX, sheetY);
    this.dragQueen = new DragQueen(
      this,
      "dragqueen",
      "Run",
      true
    );

    // @ts-ignore
    this.isDebug = this.game.config.physics.arcade.debug;

    // test number of items displayed in scene
    if (this.isDebug) {
      window.setInterval(() => {
        // @ts-ignore
        console.log(this.add.displayList.list);
      }, 5000);
    }
  }

  public update() {
    this.ground?.update();
  }
}

export default GameScene;
