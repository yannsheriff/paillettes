import config from "./config";

import {
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
  sol,
  F,
  R,
  E1,
  E2,
  FREEStar,
  starDown,
  starLeft,
  starUp,
  starRight,
  chrono,
} from "../../assets";
import CharacterManager from "../../managers/CharacterManager";
import GroundComponent from "../../components/GroundComponent";
import SheetMusicComponent from "../../components/SheetMusicComponent";
import CharactersComponent from "../../components/CharactersComponent";
import BackgroundComponent from "../../components/BackgroundComponent";
import ScoreState from "../../states/score";
import AnimationManager from "../../helpers/Animations";
import { mainAnimations } from "../../assets/animations";
import DragQueen from "../../components/DragQueenComponent";
import MainGameManager from "../../managers/MainGameManager";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private ground?: GroundComponent;
  private animationManager: AnimationManager;
  private dragQueen?: DragQueen;
  public isDebug?: boolean = false;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.scoreManager = ScoreState.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
    MainGameManager.getInstance();
  }

  public preload(): void {
    this.animationManager.preload();
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("F", F);
    this.load.image("R", R);
    this.load.image("E1", E1);
    this.load.image("E2", E2);
    this.load.image("star-down", starDown);
    this.load.image("star-left", starLeft);
    this.load.image("star-up", starUp);
    this.load.image("star-right", starRight);
    this.load.image("freeStar", FREEStar);
    this.load.image("grid", grid);
    this.load.image("down", arrowD);
    this.load.image("zoneInput", zoneInput);
    this.load.image("chrono", chrono);

    this.load.image("sol", sol);

    this.load.setPath("assets/spritesheets/world1/");
    this.load.multiatlas("world1", "world1_spritesheet.json");

    this.load.setPath("assets/spritesheets/world2/");
    this.load.multiatlas("world2", "world2_spritesheet.json");

    this.load.setPath("assets/spritesheets/world3/");
    this.load.multiatlas("world3", "world3_spritesheet.json");

    this.load.setPath("assets/spritesheets/world4/");
    this.load.multiatlas("world4", "world4_spritesheet.json");

    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");

    for (let world = 1; world <= 4; world++) {
      for (let spine = 1; spine <= 2; spine++) {
        this.load.setPath("assets/spine/world" + world + "/man" + spine + "/");
        this.load.spine(
          "world_" + world + "_man_" + spine,
          "world_" + world + "_man_" + spine + ".json",
          "world_" + world + "_man_" + spine + ".atlas"
        );

        this.load.setPath(
          "assets/spine/world" + world + "/woman" + spine + "/"
        );
        this.load.spine(
          "world_" + world + "_woman_" + spine,
          "world_" + world + "_woman_" + spine + ".json",
          "world_" + world + "_woman_" + spine + ".atlas"
        );
      }
    }
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
