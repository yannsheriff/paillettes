import config from "./config";
import {
  background,
  ground,
  char,
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
} from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharacterManager from "../../classes/logic/CharacterManager";
import PhysicCharacter from "../../classes/physic/Character";
import Background from "../../classes/physic/Background";
import DragQueen from "../../classes/physic/DragQueen";
import Ground from "../../classes/physic/Ground";
import SheetMusic from "../../classes/component/sheet-music";
import gameConfig from "../../config";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private background?: Background;
  private ground?: Phaser.GameObjects.Image;
  private grid?: Phaser.GameObjects.Image;
  private dragQueen: any; // to do

  constructor() {
    super(config);
    this.CharacterManager = new CharacterManager();
  }

  public preload(): void {
    this.load.image("background", background);
    this.load.image("ground", ground);
    this.load.image("char", char);
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("grid", grid);
    this.load.image("down", arrowD);
    this.load.image("zoneInput", zoneInput);
    this.load.setPath("assets/spine/spineboy/");
    this.load.setPath("assets/spine/spineboy/");
    this.load.spine("spineboy", "spineboy.json", "spineboy.atlas");
  }

  /*
   *
   * handleCharacterOverlap
   * Do something with character if is valid
   *
   */
  handleCharacterOverlap = (character: Arrow) => {
    if (this.CharacterManager.isCharacterSuccesfull(character.id)) {
      character.setVelocity(0);
      character.setAcceleration(0);
      character.setPosition(this.score * 50 + 50, 50);
      this.score += 1;
    }
  };

  public create() {
    const sheetX = window.innerWidth / 3;
    const sheetY = (window.innerHeight / 5) * 4;
    this.background = new Background(this, 0, 0, "background");
    this.ground = new Ground(this, 0, 0, "ground");
    new SheetMusic(this, this.CharacterManager, sheetX, sheetY);

    this.dragQueen = new DragQueen(
      this,
      400,
      550,
      "spineboy",
      "animation",
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
    if (this.background) {
      this.background.moveBackground();
    }
  }
}

export default GameScene;
