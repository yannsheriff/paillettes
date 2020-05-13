import Grid from "../../physic/Grid";
import PhysicCharacter from "../../physic/Character";
import { EventEmitter } from "events";
import MusicPlayer, { throttle, noteDelay } from "../../../../services/music";
import CharacterManager from "../../logic/CharacterManager";
import zelda from "./zelda.json";
import Arrow from "../../physic/Arrow";
import { delay, promiseGenerator } from "../../../../services/stepEventEmitter";

export type Direction = "left" | "right" | "up" | "down";

class SheetMusic {
  public arrows: Array<Arrow>;
  public characters: Array<PhysicCharacter>;
  public characterManager: CharacterManager;
  public arrowEmitter: EventEmitter;
  public promiseGenerator: promiseGenerator;
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;

  constructor(
    scene: Phaser.Scene,
    characterManager: CharacterManager,
    x: number,
    y: number
  ) {
    this.arrows = [];
    this.posX = x;
    this.posY = y;
    this.scene = scene;
    this.characterManager = characterManager;
    this.characters = [];
    this.arrowEmitter = new EventEmitter();
    this.promiseGenerator = new promiseGenerator();
    // new Grid(scene, this.posX, this.posY);
    this.create();
  }

  /*
   * Initialisation des handler
   * utilisation des fonctions overlap
   */
  create = () => {
    this.arrowEmitter.on("note", this.throttleArrow);

    const goodArrowCollider = this.scene.add.image(
      this.posX + 60,
      this.posY,
      "zoneInput"
    ) as any;
    this.scene.physics.add.existing(goodArrowCollider);

    this.scene.physics.add.overlap(
      this.arrows,
      goodArrowCollider,
      this.handleArrowOverlap,
      () => true,
      this
    );

    /*
     * Start Music
     * temporairement un event on click
     */
    document.addEventListener("click", (e) => {
      const player = new MusicPlayer(zelda, this.arrowEmitter);
      player.start();
    });
  };

  /*
   *
   * handleArrowOverlap
   * register arrow if succesfull
   *
   */
  handleArrowOverlap = (arrow: Arrow) => {
    if (!arrow.didCollide) {
      arrow.didCollide = true;
      const stepPromise = this.promiseGenerator.getPromise();
      Promise.race([delay(700), stepPromise]).then((winningPromise: string) => {
        console.log(
          "SheetMusic -> handleArrowOverlap -> winningPromise",
          winningPromise
        );
        if (winningPromise.includes(arrow.direction)) {
          this.characterManager.registerSuccesfullArrow(arrow.id);
          arrow.destroy();
        }
      });
    }
  };

  /*
   *
   * Event loop (trigger arrows)
   * Lors d'un evenement "note" on crée une flèche
   *
   */
  createArrow = (calls: number) => {
    const nbOfArrow = calls > 1 ? 2 : 1;

    for (let index = 0; index < nbOfArrow; index++) {
      const { shouldLaunchCharacter, ID } = this.characterManager.getArrowID();
      const element = new Arrow(this.scene, ID);
      this.arrows.push(element);
      if (shouldLaunchCharacter) {
        const char = new PhysicCharacter(this.scene, ID);
        this.characters.push(char);
      }
    }
  };

  delayArrow = noteDelay(4700, this.createArrow);

  throttleArrow = throttle(200, this.delayArrow);
}

export default SheetMusic;
