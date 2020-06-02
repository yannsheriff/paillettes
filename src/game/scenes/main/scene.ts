import config from "./config";

import {
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
  verticalLine,
  sol,
  world_1_plane_1_1,
  world_1_plane_1_2,
  world_1_plane_1_3,
  world_1_plane_1_4,
  world_1_plane_2_1,
  world_1_plane_2_2,
  world_1_plane_2_3,
  world_1_plane_2_4,
  world_1_plane_2_5,
  world_1_plane_2_6,
  world_1_plane_3_1,
  world_1_plane_3_2,
  world_1_plane_3_3,
  world_1_plane_3_4,
  world_1_plane_3_5,
  world_1_plane_3_6,
  world_3_plane_1_1,
  world_3_plane_2_1,
  world_3_plane_2_2,
  world_3_plane_2_3,
  world_3_plane_2_4,
  world_3_plane_3_1,
  world_3_plane_3_2,
  world_3_plane_3_3,
  world_3_plane_3_4,
  mask,
} from "../../assets";
import Arrow from "../../components/SheetMusicComponent/Arrow";
import CharacterManager from "../../managers/CharacterManager";
import GroundComponent from "../../components/GroundComponent";
import PhysicCharacter from "../../components/CharactersComponent/CharacterBis";
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
  private grid?: Phaser.GameObjects.Image;
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
    this.load.image("grid", grid);
    this.load.image("down", arrowD);
    this.load.image("zoneInput", zoneInput);
    this.load.image("verticalLine", verticalLine);

    this.load.image("sol", sol);

    this.load.image("mask", mask);

    // preload background
    // world 1
    this.load.image("world_1_plane_1_1", world_1_plane_1_1);
    this.load.image("world_1_plane_1_2", world_1_plane_1_2);
    this.load.image("world_1_plane_1_3", world_1_plane_1_3);
    this.load.image("world_1_plane_1_4", world_1_plane_1_4);

    this.load.image("world_1_plane_2_1", world_1_plane_2_1);
    this.load.image("world_1_plane_2_2", world_1_plane_2_2);
    this.load.image("world_1_plane_2_3", world_1_plane_2_3);
    this.load.image("world_1_plane_2_4", world_1_plane_2_4);
    this.load.image("world_1_plane_2_5", world_1_plane_2_5);
    this.load.image("world_1_plane_2_6", world_1_plane_2_6);

    this.load.image("world_1_plane_3_1", world_1_plane_3_1);
    this.load.image("world_1_plane_3_2", world_1_plane_3_2);
    this.load.image("world_1_plane_3_3", world_1_plane_3_3);
    this.load.image("world_1_plane_3_4", world_1_plane_3_4);
    this.load.image("world_1_plane_3_5", world_1_plane_3_5);
    this.load.image("world_1_plane_3_6", world_1_plane_3_6);

    // world 3
    this.load.image("world_3_plane_1_1", world_3_plane_1_1);

    this.load.image("world_3_plane_2_1", world_3_plane_2_1);
    this.load.image("world_3_plane_2_2", world_3_plane_2_2);
    this.load.image("world_3_plane_2_3", world_3_plane_2_3);
    this.load.image("world_3_plane_2_4", world_3_plane_2_4);
    
    this.load.image("world_3_plane_3_1", world_3_plane_3_1);
    this.load.image("world_3_plane_3_2", world_3_plane_3_2);
    this.load.image("world_3_plane_3_3", world_3_plane_3_3);
    this.load.image("world_3_plane_3_4", world_3_plane_3_4);

    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");

    // man 1
    this.load.setPath("assets/spine/world1/man1/");
    this.load.spine(
      "world_1_man_1",
      "world_1_man_1.json",
      "world_1_man_1.atlas"
    );
    // man 2
    this.load.setPath("assets/spine/world1/man2/");
    this.load.spine(
      "world_1_man_2",
      "world_1_man_2.json",
      "world_1_man_2.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman1/");
    this.load.spine(
      "world_1_woman_1",
      "world_1_woman_1.json",
      "world_1_woman_1.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman2/");
    this.load.spine(
      "world_1_woman_2",
      "world_1_woman_2.json",
      "world_1_woman_2.atlas"
    );
  }

  public create() {
    this.animationManager.register();
    new BackgroundComponent(this);
    new CharactersComponent(this);
    this.ground = new GroundComponent(this);
    const sheetX = window.innerWidth / 4;
    const sheetY = (window.innerHeight / 6) * 4.5;
    new SheetMusicComponent(this, this.CharacterManager, sheetX, sheetY);
    this.dragQueen = new DragQueen(
      this,
      window.innerWidth / 3,
      window.innerHeight / 1.5,
      "dragqueen",
      "Run",
      true
    );

    // @ts-ignore
    this.isDebug = this.game.config.physics.arcade.debug

    // test number of items displayed in scene
    if (this.isDebug) {
      window.setInterval(() => {
        // @ts-ignore
        console.log(this.add.displayList.list)
      }, 5000);
    }    
    
  }

  public update() {
    this.ground?.update();
  }
}

export default GameScene;
