import config from "./config";
import {
  char,
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
  verticalLine,
} from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharacterManager from "../../classes/logic/CharacterManager";
import PhysicCharacter from "../../classes/physic/Character";
import SheetMusic from "../../classes/component/sheet-music";
import ScoreManager from "../../../services/score";
import AnimationManager from "../../../services/animations";
import { mainAnimations } from "../../assets/animations";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private scoreManager: ScoreManager;
  private animationManager: AnimationManager;
  private grid?: Phaser.GameObjects.Image;

  constructor() {
    super(config);
    this.CharacterManager = new CharacterManager();
    this.scoreManager = ScoreManager.getInstance();
    this.animationManager = new AnimationManager(this, mainAnimations);
  }

  public preload(): void {
    this.animationManager.preload();
    this.load.image("char", char);
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("grid", grid);
    this.load.image("down", arrowD);
    this.load.image("zoneInput", zoneInput);
    this.load.image("verticalLine", verticalLine);
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
      this.scoreManager.registerCharactere();
      this.score += 1;
    }
  };

  public create() {
    this.animationManager.register();
    const sheetX = window.innerWidth / 4;
    const sheetY = (window.innerHeight / 6) * 4.5;
    new SheetMusic(this, this.CharacterManager, sheetX, sheetY);

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
  }
}

export default GameScene;