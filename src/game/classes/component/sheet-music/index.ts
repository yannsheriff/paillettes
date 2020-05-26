import Grid from "../../physic/Grid";
import PhysicCharacter from "../../physic/CharacterBis";
import SheetVerticalBar from "../../physic/SheetVerticalBar";
import { EventEmitter } from "events";
import MusicPlayer, {
  throttle,
  NoteWithTrack,
  NOTE_DELAY,
} from "../../../../services/music";
import CharacterManager from "../../logic/CharacterManager";
import zelda from "./musics/hungup.json";
import Arrow from "../../physic/Arrow";
import { delay, promiseGenerator } from "../../../../services/stepEventEmitter";
import ScoreManager from "../../../../services/score";
import Score from "../../physic/Score";

export type Direction = "left" | "right" | "up" | "down";

class SheetMusic {
  public arrows: Array<Arrow>;
  public characterManager: CharacterManager;
  public arrowEmitter: EventEmitter;
  public promiseGenerator: promiseGenerator;
  public isPlaying: boolean;
  private scoreManager: ScoreManager;
  private score?: Score;
  private player: MusicPlayer | undefined;
  private scene: Phaser.Scene;
  private sheetWidth: number;
  private noteDelay: number;
  private scale = 0.8;
  private inputZoneWidth = 210 * this.scale;
  private inputPerfectZoneWidth = 70;
  private arrowSpeed = 350;
  private posX: number;
  private posY: number;
  private halfGoodZoneWidth: number;
  private timeToGood: number;
  private timeToPerfect: number;
  private inputAnimation?: Phaser.Physics.Arcade.Sprite;

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
    this.isPlaying = false;
    this.arrowEmitter = new EventEmitter();
    this.promiseGenerator = new promiseGenerator();
    this.scoreManager = ScoreManager.getInstance();
    this.sheetWidth = window.innerWidth - x - this.inputZoneWidth;
    this.noteDelay = Math.round((this.sheetWidth / this.arrowSpeed) * 1000);
    this.halfGoodZoneWidth =
      (this.inputZoneWidth - this.inputPerfectZoneWidth) / 2;
    this.timeToPerfect = (this.halfGoodZoneWidth / this.arrowSpeed) * 1000;
    this.timeToGood =
      ((this.halfGoodZoneWidth + this.inputPerfectZoneWidth) /
        this.arrowSpeed) *
      1000;

    this.create();
  }

  /**
   * Initialisation
   *
   * Cette fonction initiallise et ajoute tout les objets a la
   * scene, elle initialise également l'event listener des notes.
   */
  create = () => {
    new Grid(
      this.scene,
      this.posX + this.inputZoneWidth * 0.83,
      this.posY,
      this.scale
    );
    const inputZone = this.scene.add.image(
      this.posX + this.inputZoneWidth / 2,
      this.posY,
      "zoneInput"
    ) as any;

    this.scene.physics.add.existing(inputZone);
    inputZone.setScale(this.scale);
    inputZone.setDepth(11);

    this.inputAnimation = this.scene.physics.add.sprite(
      this.posX + this.inputZoneWidth / 2,
      this.posY - 3,
      "glow"
    );
    this.inputAnimation.setScale(this.scale).setDepth(11);

    new SheetVerticalBar(
      this.scene,
      window.innerWidth,
      this.posY,
      this.arrowEmitter,
      inputZone,
      this.arrowSpeed,
      this.scale
    );

    this.arrowEmitter.on("note", this.throttleArrow);

    setInterval(() => {
      this.throttleArrow();
    }, 5000);

    this.score = new Score(
      this.scene,
      this.posX - this.inputZoneWidth,
      this.posY - 50 * this.scale,
      this.scale
    );

    this.scene.physics.add.overlap(
      this.arrows,
      inputZone,
      this.handleArrowOverlap,
      () => true,
      this
    );

    /*
     * Start Music temporairement un event on click
     */
    // document.addEventListener("click", (e) => {
    //   if (!this.isPlaying) {
    //     this.isPlaying = true;
    //     this.player = new MusicPlayer(zelda, this.arrowEmitter);
    //     this.player.start();
    //   }
    // });
  };

  /**
   * Create an arrow
   *
   * Cette fonction crée une flèche et l'ajoute a la scène.
   */
  createArrow = (calls: number, note: NoteWithTrack) => {
    const nbOfArrow = calls > 1 ? 2 : 1;
    const directions = this.generateDirectionFromNotes(note.name, nbOfArrow);

    directions.forEach((direction) => {
      const { ID } = this.characterManager.getArrowID();

      // TODO ici on fait le calcule a chaque fois, on pourrais optimiser.
      const arrow = new Arrow(
        this.scene,
        ID,
        this.arrowSpeed,
        158 * this.scale,
        this.posY - (158 * this.scale) / 2,
        undefined,
        direction,
        this.scale
      );
      this.arrows.push(arrow);
    });
  };

  /**
   * A la collision
   *
   * Cette fonction fait les action suivantes lors de la premiere collison
   * - Lance une course entre la sortie de la zone d'input et l'appui sur une flèche
   * - Si on appuie sur la bonne flèche alors :
   *  * on enregistre les point
   *  * on supprime la flèche
   */
  private handleArrowOverlap = (arrow: Arrow) => {
    if (!arrow.didCollide) {
      arrow.didCollide = true;

      const timeToFail = this.calculateTimeToExit(arrow.width, arrow.scale);
      const stepPromise = this.promiseGenerator.getPromise();
      const startTime = new Date().getTime();

      Promise.race([delay(timeToFail), stepPromise]).then(
        (winningPromise: string) => {
          if (winningPromise.includes(arrow.direction)) {
            const time = new Date().getTime() - startTime;
            if (time > this.timeToPerfect && time < this.timeToGood) {
              this.scoreManager.registerPerfectArrow();
            } else {
              this.scoreManager.registerGoodArrow();
            }
            this.inputAnimation!.anims.play("glow");
            this.characterManager.registerSuccesfullArrow(arrow.id);
            arrow.destroy();
            this.score!.updateScore();
          }
        }
      );
    }
  };

  /**
   * Helper fonction
   *
   * Elle permet de caluculer le temps pour sortir de la zone d'input
   * en fonction de la taille des flèches
   */
  private calculateTimeToExit(arrowWidth: number, arrowScale: number): number {
    const halfHitboxTime = ((arrowWidth * arrowScale) / this.arrowSpeed) * 1000;
    return (this.inputZoneWidth / this.arrowSpeed) * 1000 + halfHitboxTime;
  }

  /**
   * Return directions from note.
   *
   * This function take a single note in param and a a quantity. Then it return
   * directions extraoplated from the note.
   */
  private generateDirectionFromNotes = (
    note: string,
    quantity: number
  ): Direction[] => {
    const directionTable: {
      0: Direction;
      1: Direction;
      2: Direction;
      3: Direction;
    } = {
      0: "right",
      1: "left",
      2: "down",
      3: "up",
    };

    if (this.player) {
      const direction = this.player.noteMap.get(note)!;
      if (quantity <= 1) {
        return [directionTable[direction]];
      }

      const arrayOfDirection: Array<1 | 2 | 3 | 0> = [0, 1, 2, 3];
      const arrayOfDirectionWithoutPrevious = arrayOfDirection.filter(
        (d) => d !== direction
      );
      const randomNoteDirection =
        arrayOfDirectionWithoutPrevious[Math.floor(Math.random() * 3)];

      return [directionTable[direction], directionTable[randomNoteDirection]];
    }

    return ["right"];
  };

  /**
   * Permet de gérer le delaie entre l'evenement note et l'appel
   * a la creation de la flèche
   */
  delayArrow = (calls: number, note: NoteWithTrack) => {
    const time = NOTE_DELAY - this.noteDelay;
    setTimeout(() => {
      return this.createArrow(calls, note);
    }, time);
  };

  throttleArrow = throttle(500, this.delayArrow);
}

export default SheetMusic;
