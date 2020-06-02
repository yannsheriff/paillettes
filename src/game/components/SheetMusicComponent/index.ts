import Grid from "./Grid";
import { EventEmitter } from "events";
import MusicPlayer, { NoteWithTrack, NOTE_DELAY } from "../../helpers/Music";
import CharacterManager from "../../managers/CharacterManager";
import Arrow from "./Arrow";
import { delay, promiseGenerator } from "../../helpers/StepEventEmitter";
import ScoreState from "../../states/score";
import Score from "./Score";
import MainStateManager, { MainState } from "../../states/main";
import { DifficultyModes } from "../../states/main";
import Subtitle from "./Subtitle";
import { Musics } from "../../helpers/Music/musics";
import { Direction } from "./GridObject";
import Letter, { directionMatchRemaingLetters } from "./Letter";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";
import FreeLights from "./FreeLights";

const heightBetweenSheetHBar = 158;
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

export type GridObject = Arrow | Letter;
class SheetMusic {
  public gridObjects: Array<GridObject>;
  public characterManager: CharacterManager;
  public arrowEmitter: EventEmitter;
  public promiseGenerator: promiseGenerator;
  private scoreManager: ScoreState;
  private freestyleManager: FreestyleStateManager;
  private mainState: MainState;
  private freestyleState: FreestyleState;
  public isPlaying: boolean;
  private score?: Score;
  private player: MusicPlayer | undefined;
  private scene: Phaser.Scene;
  private sheetWidth: number;
  private gridTop: number;
  private noteDelay: number;
  private timeToFail: number;
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
  private throttleValue: number;
  private requestCount: number;
  private lastCall: number;
  private subtitle?: Subtitle;
  private called: boolean;
  private arrowUntilLetter: number;

  constructor(
    scene: Phaser.Scene,
    characterManager: CharacterManager,
    x: number,
    y: number
  ) {
    this.gridObjects = [];
    this.posX = x;
    this.posY = y;
    this.scene = scene;
    this.lastCall = 0;
    this.requestCount = 1;
    this.arrowUntilLetter = 4;
    this.called = true;
    this.characterManager = characterManager;
    this.throttleValue = 1000;
    this.isPlaying = false;
    this.arrowEmitter = new EventEmitter();
    this.promiseGenerator = new promiseGenerator();
    this.scoreManager = ScoreState.getInstance();
    this.freestyleManager = FreestyleStateManager.getInstance();
    this.freestyleState = FreestyleStateManager.getInstance().state;
    this.mainState = MainStateManager.getInstance().state;
    this.sheetWidth = window.innerWidth - x - this.inputZoneWidth;
    this.noteDelay =
      NOTE_DELAY - Math.round((this.sheetWidth / this.arrowSpeed) * 1000);
    this.halfGoodZoneWidth =
      (this.inputZoneWidth - this.inputPerfectZoneWidth) / 2;
    this.timeToPerfect = (this.halfGoodZoneWidth / this.arrowSpeed) * 1000;
    this.timeToGood =
      ((this.halfGoodZoneWidth + this.inputPerfectZoneWidth) /
        this.arrowSpeed) *
      1000;
    this.gridTop = this.posY - (heightBetweenSheetHBar * this.scale) / 2;
    this.timeToFail = this.calculateTimeToExit();

    MainStateManager.getInstance().subscribe(this.onStateChange);
    this.freestyleManager.subscribe((state) => (this.freestyleState = state));

    this.scoreManager.onFail(this.failedArrow);
    this.scoreManager.onSuccess(this.successArrow);

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

    new FreeLights(
      this.scene,
      this.posX + this.inputZoneWidth / 2,
      this.posY,
      this.inputZoneWidth,
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

    this.arrowEmitter.on("note", this.throttleArrow);

    this.score = new Score(
      this.scene,
      this.posX - this.inputZoneWidth,
      this.posY - 50 * this.scale,
      this.scale
    );

    this.scene.physics.add.overlap(
      this.gridObjects,
      inputZone,
      this.handleArrowOverlap,
      () => true,
      this
    );

    this.subtitle = new Subtitle(this.scene);

    /*
     * Start Music temporairement un event on click
     */
    document.addEventListener("click", (e) => {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.player = new MusicPlayer(Musics.badRomance, this.arrowEmitter);
        this.player.start();
      }
      // this.throttleArrow({
      //   name: "E4",
      //   duration: 3,
      //   durationTicks: 3,
      //   track: 1,
      //   velocity: 1,
      //   ticks: 1,
      //   time: 1,
      //   midi: 1,
      // });
    });
  };

  private onStateChange = (state: MainState) => {
    this.mainState = state;
    switch (state.difficulty) {
      case DifficultyModes.easy:
        this.throttleValue = 1000;
        break;
      case DifficultyModes.medium:
        this.throttleValue = 700;
        break;
      case DifficultyModes.hard:
        this.throttleValue = 500;
        break;
      case DifficultyModes.hardcore:
        this.throttleValue = 200;
        break;
    }
  };

  /**
   * Create an arrow
   *
   * Cette fonction crée une flèche et l'ajoute a la scène.
   */
  createArrow = (calls: number, note: NoteWithTrack) => {
    let nbOfArrow =
      this.mainState.difficulty !== DifficultyModes.easy ? calls : 1;
    const directions = this.generateDirectionFromNotes(note.name, nbOfArrow);

    directions.forEach((direction) => {
      const gridObject = this.generateGridObject(direction);
      this.gridObjects.push(gridObject);
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
  private handleArrowOverlap = (gridObject: GridObject) => {
    if (!gridObject.didCollide) {
      gridObject.didCollide = true;

      const stepPromise = this.promiseGenerator.getPromise();
      const startTime = new Date().getTime();

      Promise.race([delay(this.timeToFail), stepPromise]).then(
        (winningPromise: string) => {
          if (winningPromise.includes(gridObject.direction)) {
            const time = new Date().getTime() - startTime;
            if (time > this.timeToPerfect && time < this.timeToGood) {
              this.scoreManager.registerPerfectArrow(gridObject);
            } else {
              this.scoreManager.registerGoodArrow(gridObject);
            }
          } else {
            this.scoreManager.registerFail(gridObject);
          }
        }
      );
    }
  };

  private successArrow = (gridObject: GridObject) => {
    if (gridObject instanceof Letter) {
      this.freestyleManager.validateLetter(gridObject.letter);
    }

    this.inputAnimation!.anims.play("glow");
    gridObject.destroy();
  };

  private failedArrow = (gridObject: GridObject) => {
    if (gridObject instanceof Letter) {
      this.freestyleManager.failLetter();
    }
    setTimeout(() => gridObject.destroy, 1000);
  };

  /**
   * Helper fonction
   *
   * Elle permet de caluculer le temps pour sortir de la zone d'input
   * en fonction de la taille des flèches
   */
  private calculateTimeToExit(): number {
    const arrow = new Arrow(
      this.scene,
      "a",
      0,
      heightBetweenSheetHBar * this.scale,
      0,
      undefined,
      "left",
      this.scale
    );
    const halfHitboxTime =
      ((arrow.width * arrow.scale) / this.arrowSpeed) * 1000;
    arrow.destroy();
    return (this.inputZoneWidth / this.arrowSpeed) * 1000 + halfHitboxTime;
  }

  /**
   * Helper fonction
   *
   * Generation d'une flèche ou d'une lettre
   * selon le besoin
   */
  private generateGridObject = (direction: Direction): Arrow | Letter => {
    const { ID } = this.characterManager.getArrowID();
    if (
      this.arrowUntilLetter < 1 &&
      directionMatchRemaingLetters(
        direction,
        this.freestyleState.remainingLetters
      )
    ) {
      this.arrowUntilLetter = 4;
      return new Letter(
        this.scene,
        ID,
        this.arrowSpeed,
        heightBetweenSheetHBar * this.scale,
        this.gridTop,
        undefined,
        direction,
        this.scale
      );
    }

    this.arrowUntilLetter -= 1;
    return new Arrow(
      this.scene,
      ID,
      this.arrowSpeed,
      heightBetweenSheetHBar * this.scale,
      this.gridTop,
      undefined,
      direction,
      this.scale
    );
  };

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
  private delayArrow = (calls: number, note: NoteWithTrack) => {
    setTimeout(() => {
      return this.createArrow(calls, note);
    }, this.noteDelay);
  };

  // throttleArrow = throttle(this.throttleValue, this.delayArrow);
  private throttleArrow = (note: NoteWithTrack) => {
    const now = new Date().getTime();
    this.requestCount += 1;
    this.requestCount = this.called ? 1 : this.requestCount;
    if (now - this.lastCall < this.throttleValue) {
      this.called = false;
      return;
    }
    this.lastCall = now;
    this.called = true;
    this.delayArrow(this.requestCount, note);
  };
}

export default SheetMusic;
