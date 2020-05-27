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
import Arrow from "../../components/SheetMusicComponent/Arrow";
import CharacterManager from "../../managers/CharacterManager";
import Ground from "../../classes/physic/Ground";
import PhysicCharacter from "../../classes/physic/CharacterBis";
import SheetMusicComponent from "../../components/SheetMusicComponent";
import CharactersComponent from "../../components/CharactersComponent";
import BackgroundComponent from "../../components/BackgroundComponent";
import ScoreState from "../../states/scoreState";
import AnimationManager from "../../services/animations";
import { mainAnimations } from "../../assets/animations";
import DragQueen from "../../classes/physic/DragQueen";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreState;
  private ground?: Ground;
  private animationManager: AnimationManager;
  private grid?: Phaser.GameObjects.Image;
  private dragQueen?: DragQueen;

  constructor() {
    super(config);
    this.CharacterManager = CharacterManager.getInstance();
    this.scoreManager = ScoreState.getInstance();
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
    new BackgroundComponent(this);
    new CharactersComponent(this);
    const sheetX = window.innerWidth / 4;
    const sheetY = (window.innerHeight / 6) * 4.5;
    this.ground = new Ground(this);
    new SheetMusicComponent(this, this.CharacterManager, sheetX, sheetY);
    this.dragQueen = new DragQueen(
      this,
      window.innerWidth / 3,
      window.innerHeight / 1.5,
      "dragqueen",
      "Run",
      true
    );

    const characters: Array<PhysicCharacter> = [];

    /*
     *
     * Création des colliders
     * temporairement visible
     *
     */
    const goodArrowCollider = this.add.rectangle(
      sheetX + window.innerWidth / 12 / 2,
      window.innerHeight / 2,
      window.innerWidth / 12,
      window.innerHeight
    ) as any;

    this.physics.add.existing(goodArrowCollider);

    this.physics.add.overlap(
      characters,
      goodArrowCollider,
      this.handleCharacterOverlap,
      () => true,
      this
    );
  }

  public update() {
    this.ground?.update();
  }
}

export default GameScene;
