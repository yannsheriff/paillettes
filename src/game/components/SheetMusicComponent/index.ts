import Grid from "./Grid";
import { EventEmitter } from "events";
import MusicPlayer, { NoteWithTrack, NOTE_DELAY } from "../../helpers/Music";
import CharacterManager from "../../managers/CharacterManager";
import Arrow from "./Arrow";
import { delay, promiseGenerator } from "../../helpers/StepEventEmitter";
import ScoreState from "../../states/score";
import Score from "./Score";
import MainStateManager, { MainState, GameStatus } from "../../states/main";
import { DifficultyModes } from "../../states/main";
import Subtitle from "./Subtitle";
import muscisFile, { Musics } from "../../helpers/Music/musics";
import { Direction } from "./GridObject";
import Letter, { directionMatchRemaingLetters } from "./Letter";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";
import FreeLights from "./FreeLights";
import FreeArrow from "./FreeArrow";
import Chrono from "./Chrono";
import InputZone, { inputZoneAssetWidth } from "./InputZone";

export const heightBetweenSheetHBar = 239;
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
  private music?: Musics;
  private freestyleManager: FreestyleStateManager;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private freestyleState: FreestyleState;
  public isPlaying: boolean;
  private player: MusicPlayer | undefined;
  private scene: Phaser.Scene;
  private sheetWidth: number;
  private gridTop: number;
  private noteDelay: number;
  private timeToFail: number;
  private scale = 0.8;
  private inputZoneWidth = inputZoneAssetWidth * this.scale + 60 * 2;
  private inputPerfectZoneWidth = 82;
  private arrowSpeed: number;
  private posX: number;
  private posY: number;
  private halfGoodZoneWidth: number;
  private timeToGood: number;
  private timeToPerfect: number;
  private inputAnimation?: Phaser.Physics.Arcade.Sprite;
  private throttleValue: number;
  private requestCount: number;
  private lastCall: number;
  private called: boolean;
  private arrowUntilLetter: number;
  private freeInterval?: NodeJS.Timeout;
  private isMusicComplete: boolean = false;
  private playingMusic?: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, characterManager: CharacterManager) {
    this.scene = scene;
    this.lastCall = 0;
    this.requestCount = 1;
    this.arrowUntilLetter = 4;
    this.called = true;
    this.characterManager = characterManager;
    this.throttleValue = 1000;
    this.isPlaying = false;
    this.gridObjects = [];

    // SHEET MUSIC SIZE AND POSITION
    this.posX = window.innerWidth / 2 + this.inputZoneWidth / 2 - 60;
    this.posY = window.innerHeight + 10 - heightBetweenSheetHBar * this.scale;
    this.sheetWidth = window.innerWidth - this.posX;
    this.gridTop = this.posY - (heightBetweenSheetHBar * this.scale) / 2;

    // INIT MANAGERS
    this.arrowEmitter = new EventEmitter();
    this.promiseGenerator = new promiseGenerator();
    this.scoreManager = ScoreState.getInstance();
    this.freestyleManager = FreestyleStateManager.getInstance();
    this.freestyleState = FreestyleStateManager.getInstance().state;
    this.mainState = MainStateManager.getInstance().state;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onStateChange);
    this.freestyleManager.subscribe(this.onFreeStateChange);
    this.scoreManager.onFail(this.failedArrow);
    this.scoreManager.onSuccess(this.successArrow);
    this.mainManager.onGameStatusChange(this.gameStatusChange);

    // TIME HELPERS
    this.arrowSpeed = this.mainState.objectSpeed;
    this.noteDelay =
      NOTE_DELAY - Math.round((this.sheetWidth / this.arrowSpeed) * 1000);
    this.halfGoodZoneWidth =
      (this.inputZoneWidth - this.inputPerfectZoneWidth) / 2;
    this.timeToPerfect = (this.halfGoodZoneWidth / this.arrowSpeed) * 1000;
    this.timeToGood =
      ((this.halfGoodZoneWidth + this.inputPerfectZoneWidth) /
        this.arrowSpeed) *
      1000;
    this.timeToFail = this.calculateTimeToExit();
    this.create();
  }

  /**
   * Initialisation
   *
   * Cette fonction initiallise et ajoute tout les objets a la
   * scene, elle initialise également l'event listener des notes.
   */
  create = () => {
    new Grid(this.scene, this.posX, this.gridTop, this.scale);

    new FreeLights(
      this.scene,
      this.posX - 250,
      this.posY + 30,
      this.inputZoneWidth,
      this.scale
    );

    new Chrono(this.scene, this.posX - 220, this.posY + 80, this.scale);

    new Score(this.scene, this.posX - 235, this.posY - 70, this.scale);

    new Subtitle(this.scene);

    const collider = new InputZone(
      this.scene,
      this.posX,
      this.gridTop,
      heightBetweenSheetHBar * this.scale,
      this.scale
    ).collider;

    this.arrowEmitter.on("note", this.throttleArrow);

    this.scene.physics.add.overlap(
      this.gridObjects,
      collider,
      this.handleArrowOverlap,
      () => true,
      this
    );

    // this.createArrow(2, {
    //   name: "E4",
    //   duration: 3,
    //   durationTicks: 3,
    //   track: 1,
    //   velocity: 1,
    //   ticks: 1,
    //   time: 1,
    //   midi: 1,
    // });
  };

  public initMusic = () => {
    console.log("initMusic");
    if (!this.player) {
      this.music = Musics.hungup;
      this.player = new MusicPlayer(this.music, this.arrowEmitter);
      document.removeEventListener("keydown", this.initMusic);
      this.mainManager.gameIsReady();
    }
  };

  private initSheetMusic() {
    this.isPlaying = true;
    this.player?.start();
    const time = muscisFile.get(this.music!)["header"]["bc-delay-sync"];
    setTimeout(() => {
      // const music = this.scene.sound.add("musictest");
      this.playingMusic = this.scene.sound.add("hungup");
      this.playingMusic.play();

      this.playingMusic.once("complete", () => {
        if (!this.isMusicComplete) {
          console.log("music completed so end game");
          this.mainManager.endGame();
          this.isMusicComplete = true;
        }
      });
    }, time);
  }

  private generateNbOfArrow() {
    if (this.mainState.difficulty > DifficultyModes.easy) {
      const chance = [false, false, false, false, false, true];
      return chance[Math.floor(Math.random() * chance.length)] ? 2 : 1;
    }
    if (this.mainState.difficulty > DifficultyModes.medium) {
      const chance = [false, true];
      return chance[Math.floor(Math.random() * chance.length)] ? 2 : 1;
    }

    return 1;
  }

  /**
   * Create an arrow
   *
   * Cette fonction crée une flèche et l'ajoute a la scène.
   */
  private createArrow = (calls: number, note: NoteWithTrack) => {
    let nbOfArrow = this.generateNbOfArrow();
    const directions = this.generateDirectionFromNotes(note.name, nbOfArrow);
    this.characterManager.generateNewCharacter(nbOfArrow);

    directions.forEach((direction) => {
      const gridObject = this.generateGridObject(direction);
      this.gridObjects.push(gridObject);
    });
  };

  /**
   * Create column of free arrow
   *
   * Cette fonction crée une colonne de fleche free.
   */
  createFreeArrowColumn = () => {
    const directions: Direction[] = ["down", "left", "right", "up"];
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

    gridObject.delete();
  };

  private failedArrow = (gridObject: GridObject) => {
    if (gridObject instanceof Letter) {
      this.freestyleManager.failLetter();
    }
    gridObject.fadeOut();
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
    arrow.deleteArrow();
    return (this.inputZoneWidth / this.arrowSpeed) * 1000 + halfHitboxTime;
  }

  /**
   * Helper fonction
   *
   * Generation d'une flèche ou d'une lettre
   * selon le besoin
   */
  private generateGridObject = (direction: Direction): Arrow | Letter => {
    if (this.freestyleState.isFreestyleActivated) {
      // @ts-ignore
      return new FreeArrow(
        this.scene,
        this.arrowSpeed,
        heightBetweenSheetHBar * this.scale,
        this.gridTop,
        undefined,
        direction,
        this.scale
      );
    }

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

  //TODO : refacto this function can be put outside
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

    return quantity === 1 ? ["right"] : ["right", "left"];
  };

  /**
   * Permet de gérer le delaie entre l'evenement note et l'appel
   * a la creation de la flèche
   */
  private delayArrow = (calls: number, note: NoteWithTrack) => {
    setTimeout(() => {
      if (!this.freestyleState.isFreestyleActivated) {
        return this.createArrow(calls, note);
      }
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

  private destroySheetMusic() {
    this.arrowEmitter.removeAllListeners("note");
    if (this.freeInterval !== undefined) {
      clearInterval(this.freeInterval);
    }
    this.scene.tweens.add({
      targets: this.playingMusic,
      volume: 0,
      duration: 2000,
      onComplete: () => this.playingMusic?.stop(),
    });
    // this.playingMusic?.stop();
    this.player?.stop();
  }

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isLaunch:
        this.initSheetMusic();
        break;
      case GameStatus.isGameOver:
        this.destroySheetMusic();
        break;

      default:
        break;
    }
  };

  private onStateChange = (state: MainState) => {
    if (state.difficulty !== this.mainState.difficulty) {
      switch (state.difficulty) {
        case DifficultyModes.easy:
          this.throttleValue = 1000;
          break;
        case DifficultyModes.medium:
          this.throttleValue = 800;
          break;
        case DifficultyModes.hard:
          this.throttleValue = 700;
          break;
        case DifficultyModes.hardcore:
          this.throttleValue = 500;
          break;
      }
    }
    this.mainState = state;
  };

  private onFreeStateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.freeInterval = setInterval(() => {
          this.createFreeArrowColumn();
        }, 500);

        setTimeout(() => {
          clearInterval(this.freeInterval!);
        }, state.freestyleDuration - Math.round((this.sheetWidth / this.arrowSpeed) * 1000));
      }
    }
    this.freestyleState = state;
  };
}

export default SheetMusic;
