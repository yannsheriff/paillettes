import config from "./config";

import {
  char,
  ground,
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
  verticalLine,
  sol,
  word_1_plane_1_1,
  word_1_plane_1_2,
  word_1_plane_1_3,
  word_1_plane_1_4,
  word_1_plane_2_1,
  word_1_plane_2_2,
  word_1_plane_2_3,
  word_1_plane_2_4,
  word_1_plane_2_5,
  word_1_plane_2_6,
  word_1_plane_3_1,
  word_1_plane_3_2,
  word_1_plane_3_3,
  word_1_plane_3_4,
  word_1_plane_3_5,
  word_1_plane_3_6,
  mask,
} from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharacterManager from "../../classes/logic/CharacterManager";
import Ground from "../../classes/physic/Ground";
import PhysicCharacter from "../../classes/physic/CharacterBis";
import SheetMusic from "../../classes/component/sheet-music";
import BackgroundManager from "../../classes/logic/BackgroundManager";
import PhysicCharacterManager from "../../classes/logic/PhysicCharacterManager";
import ScoreManager from "../../../services/score";
import AnimationManager from "../../../services/animations";
import { mainAnimations } from "../../assets/animations";
import DragQueen from "../../classes/physic/DragQueen";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private characterManager: CharacterManager;
  private scoreManager: ScoreManager;
  private ground?: Ground;
  private animationManager: AnimationManager;
  private grid?: Phaser.GameObjects.Image;
  private dragQueen?: DragQueen;

  constructor() {
    super(config);
    this.characterManager = CharacterManager.getInstance();
    this.scoreManager = ScoreManager.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
  }

  public preload(): void {
    this.animationManager.preload();
    this.load.image("char", char);
    this.load.image("ground", ground);
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
    this.load.image("word_1_plane_1_1", word_1_plane_1_1);
    this.load.image("word_1_plane_1_2", word_1_plane_1_2);
    this.load.image("word_1_plane_1_3", word_1_plane_1_3);
    this.load.image("word_1_plane_1_4", word_1_plane_1_4);

    this.load.image("word_1_plane_2_1", word_1_plane_2_1);
    this.load.image("word_1_plane_2_2", word_1_plane_2_2);
    this.load.image("word_1_plane_2_3", word_1_plane_2_3);
    this.load.image("word_1_plane_2_4", word_1_plane_2_4);
    this.load.image("word_1_plane_2_5", word_1_plane_2_5);
    this.load.image("word_1_plane_2_6", word_1_plane_2_6);

    this.load.image("word_1_plane_3_1", word_1_plane_3_1);
    this.load.image("word_1_plane_3_2", word_1_plane_3_2);
    this.load.image("word_1_plane_3_3", word_1_plane_3_3);
    this.load.image("word_1_plane_3_4", word_1_plane_3_4);
    this.load.image("word_1_plane_3_5", word_1_plane_3_5);
    this.load.image("word_1_plane_3_6", word_1_plane_3_6);

    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");
    // drag queen
    this.load.setPath("assets/spine/world1/man1");
    this.load.spine(
      "world_1_man_1",
      "world_1_man_1.json",
      "world_1_man_1.atlas"
    );
  }

  /*
   *
   * handleCharacterOverlap
   * Do something with character if is valid
   *
   */
  handleCharacterOverlap = (character: Arrow) => {
    console.log("test");
    // if (this.characterManager.isCharacterSuccesfull(character.id)) {
    //   character.setVelocity(0);
    //   character.setAcceleration(0);
    //   character.setPosition(this.score * 50 + 50, 50);
    //   this.scoreManager.registerCharactere();
    //   this.score += 1;
    // }
  };

  public create() {
    this.animationManager.register();
    new BackgroundManager(this);
    new PhysicCharacterManager(this);
    const sheetX = window.innerWidth / 4;
    const sheetY = (window.innerHeight / 6) * 4.5;
    this.ground = new Ground(this);
    new SheetMusic(this, this.characterManager, sheetX, sheetY);
    this.dragQueen = new DragQueen(
      this,
      window.innerWidth / 3,
      window.innerHeight / 1.5,
      "dragqueen",
      "Run",
      true
    );
  }

  public update() {
    this.ground?.update();
  }
}

export default GameScene;
