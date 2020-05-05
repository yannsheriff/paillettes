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
} from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharacterManager from "../../classes/logic/CharacterManager";
import PhysicCharacter from "../../classes/physic/Character";
import Background from "../../classes/physic/Background";
import DragQueen from "../../classes/physic/DragQueen";
import Ground from "../../classes/physic/Ground";
import '../../class/SpineContainer/SpineContainer'
import zelda from "./zelda.json";

import {
  delay,
  stepEventPromise as stepEvent,
} from "../../../services/stepEventEmitter";
import { EventEmitter } from "events";
import MusicPlayer, { throttle, noteDelay } from "../../../services/music";
import Grid from "../../classes/physic/Grid";

export class GameScene extends Phaser.Scene {
  private score: number = 0;
  private CharacterManager: CharacterManager;
  private background?: Background;
  private ground?: Phaser.GameObjects.Image;
  private dragQueen?: DragQueen // to do

  // test this.width pour stocker la valeur de l'écran
  private grid?: Phaser.GameObjects.Image;

  constructor() {
    super(config);
    this.CharacterManager = new CharacterManager();
  }

  public preload(): void {
    this.load.image("background", background);
    this.load.image("ground", ground);
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("grid", grid);
    this.load.image("down", arrowD);
    this.load.setPath('assets/spine/spineboy/')
    this.load.spine('spineboy', 'spineboy.json', 'spineboy.atlas')
    this.load.setPath('assets/spine/character/')
    this.load.spine('character', 'character.json', 'character.atlas')
  }

  /*
   *
   * handleArrowOverlap
   * register arrow if succesfull
   *
   */
  handleArrowOverlap = (arrow: Arrow) => {
    if (!arrow.didCollide) {
      arrow.didCollide = true;
      Promise.race([delay(700), stepEvent()]).then((winningPromise: string) => {
        if (winningPromise.includes(arrow.direction)) {
          this.CharacterManager.registerSuccesfullArrow(arrow.id);
          arrow.destroy();
        }
      });
    }
  };

  handleOverlapTest = () => {
    console.log('test')
  };

  /*
   *
   * handleCharacterOverlap
   * Do something with character if is valid
   *
   */
  handleCharacterOverlap = (character: ISpineContainer) => {
    if (character.id) {
      if (this.CharacterManager.isCharacterSuccesfull(character.id)) {
        character.spineBody.setVelocity(0);
        character.spineBody.setAcceleration(0, 0);
        character.setPosition(undefined, this.score * 50 + 50);
        this.score += 1;
      }
    }
  };

  public create() {
    this.background = new Background(this, 0, 0, "background")
    this.ground = new Ground(this, 0, 0, "ground")
    this.dragQueen = new DragQueen(this, 400, 550, 'spineboy', 'run', true)
    
    const arrows: Array<Arrow> = [];
    const characters: Array<ISpineContainer> = [];
    this.background = new Background(this, 0, 0, "background");
    this.ground = new Ground(this, 0, 0, "ground");
    new Grid(this);

    const arrowEmitter = new EventEmitter();

    /*
     *
     * Start Music
     * temporairement un event on click
     *
     */
    document.addEventListener("click", (e) => {
      const player = new MusicPlayer(zelda, arrowEmitter);
      player.start();
    });

    /*
     *
     * Event loop (trigger arrows)
     * Lors d'un evenement "note" on crée une flèche
     *
     */
    const createArrow = () => {
      const { shouldLaunchCharacter, ID } = this.CharacterManager.getArrowID();
      const element = new Arrow(this, ID);
      arrows.push(element);

      if (shouldLaunchCharacter) {
       const char = new PhysicCharacter(ID, this, 1000, 150, 'character', 'animation', false);
          //TODO Improve this
          characters.push(char.SpineContainer);
      }
    };
    const delayArrow = noteDelay(4700, createArrow);
    const throttleArrow = throttle(200, delayArrow);
    arrowEmitter.on("note", throttleArrow);

    /*
     *
     * Création des colliders
     * temporairement visible
     *
     */
    const goodArrowCollider = this.add.rectangle(
      window.innerWidth / 3,
      window.innerHeight / 2,
      window.innerWidth / 12,
      window.innerHeight
    ) as any;
    this.physics.add.existing(goodArrowCollider);

    /*
     *
     * Initialisation des handler
     * utilisation des fonctions overlap
     */

    this.physics.add.overlap(
      arrows,
      goodArrowCollider,
      this.handleArrowOverlap,
      () => true,
      this
    );
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
    if (this.dragQueen) {
      // this.dragQueen.run()
    }
  }
}

export default GameScene;
