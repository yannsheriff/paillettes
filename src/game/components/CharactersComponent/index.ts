import PhysicCharacter from "./Character";
import CharacterManager from "../../managers/CharacterManager";
import MainStateManager, {
  MainState,
  Worlds,
  GameStatus,
} from "../../states/main";
import ScoreStateManager, { AchievementType } from "../../states/score";
import Align from "../../helpers/Align/align";
import FreestyleStateManager, { FreestyleState } from "../../states/freestyle";

import { GameStep } from "../../states/main";


// const animations = ["Dance", "Fail", "NBidle", "Run", "Transition"];

class PhysicCharacterManager {
  private scene: Phaser.Scene;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private scoreManager: ScoreStateManager;
  private freestyleState: FreestyleState;
  private freestyleManager: FreestyleStateManager;
  private colliderZone: Phaser.GameObjects.Rectangle;
  private colliders: Array<Phaser.Physics.Arcade.Collider> = [];
  private prevAsset: number = 1;

  public crowd: Array<PhysicCharacter>; // physic characters in crowd
  public totalCrowd: number = 0; // number of unlocked characters
  public maxCrowdLenght: number = 12;
  public world: Worlds;
  private charactersBW: Map<string, PhysicCharacter> = new Map();
  public testX: number = 0;
  public nextUnlocked: string = "";
  public oldScore: number = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.crowd = [];
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainManager.onGameStatusChange(this.gameStatusChange);
    this.scoreManager = ScoreStateManager.getInstance();
    this.scoreManager.onSuccess(this.playAllDanseThenRun);
    this.freestyleManager = FreestyleStateManager.getInstance();
    this.freestyleState = this.freestyleManager.state;
    this.freestyleManager.subscribe(this.onFreestyleStateChange);
    this.mainState = this.mainManager.state;
    this.world = this.mainManager.state.world;

    const characterManager = CharacterManager.getInstance();

    this.colliderZone = this.scene.add.rectangle(0, 0, 60, window.innerHeight);

    Align.centerV(this.colliderZone);
    Align.centerH(this.colliderZone);
    Align.scaleToGameH(this.colliderZone, 1);

    this.colliderZone.x = window.innerWidth / 2 - 60;

    this.scene.physics.add.existing(this.colliderZone);

    characterManager.onNewCharacter((id) => {
      this.generateNewPhysicCharacter(id);
    });

    characterManager.isCharacterUnlocked((id, isUnlocked) => {
      if (isUnlocked) {
        this.charactersBW.get(id)?.unlock();
      }
    });
  }

  public generateNewPhysicCharacter(id: string) {
    let gender = Math.round(Math.random()) === 0 ? "man" : "woman";
    let nb = this.prevAsset;
    // let nb = Math.floor(Math.random() * 2) + 1;

    // console.log("world_" + this.world + "_" + gender + "_" + nb)

    let charObj = new PhysicCharacter(
      this.scene,
      "world_" + this.world + "_" + gender + "_" + nb,
      "NBidle",
      id,
      this.mainState.objectSpeed,
      this.callbackCharacterDeleted,
      GameStep.game
    );

    if (this.prevAsset === 1) {
      this.prevAsset = 2;
    } else {
      this.prevAsset = 1;
    }

    this.charactersBW.set(id, charObj);

    this.addCollision(charObj);
  }

  public addCollision(character: PhysicCharacter) {
    let newCollider = this.scene.physics.add.overlap(
      character,
      this.colliderZone,
      () => {
        this.checkIfUnlocked(character);
      },
      () => true,
      this
    );

    // every character has its collider
    this.colliders.push(newCollider);
  }

  public checkIfUnlocked(character: PhysicCharacter) {
    // first we destroy the collision to avoid endless loop
    // correspond to the collision with the current character
    this.scene.physics.world.removeCollider(this.colliders[0]);
    this.colliders.shift();

    if (character.isUnlock) {
      this.updateCrowd(character);
    } else {
      character.failAndDestroy();
    }

    this.charactersBW.delete(character.id);
  }

  public updateCrowd(character: PhysicCharacter) {
    this.totalCrowd += 1;

    this.crowd.push(character);
    character.joinCrowd(this.crowd.length);
    this.scoreManager.registrerUnlockedCharacter(character.name);

    // debug
    // if (this.totalCrowd === 1) {
    //   this.scoreManager.registerUnlockedAchievement(AchievementType.characters10)
    // }

    switch (this.totalCrowd) {
      case 10:
        this.scoreManager.registerUnlockedAchievement(
          AchievementType.characters10
        );
        break;
      case 20:
        this.scoreManager.registerUnlockedAchievement(
          AchievementType.characters20
        );
        break;
      case 30:
        this.scoreManager.registerUnlockedAchievement(
          AchievementType.characters30
        );
        break;
      default:
        break;
    }

    if (this.crowd.length > this.maxCrowdLenght) {
      this.crowd.forEach((character) => {
        character.shiftCharacter(); // make character run outside screen
      });
      this.crowd.shift(); // remove first character of array
    }
  }

  // this callback remove characters from crowd array
  // when they are deleted from scene
  public callbackCharacterDeleted = (id: string) => {
    this.crowd = this.crowd.filter((character) => character.id !== id);
  };

  public playTransformation() {
    this.crowd.forEach((character) => {
      character.playTransformationAnimation();
    });
  }

  public playAllDance(isFreestyle: boolean) {
    this.crowd.forEach((character) => {
      if (!character.isDestroyed) {
        character.playDanceAnimation(isFreestyle);
      }
    });
  }

  public playAllDanseThenRun = () => {
    let delay = 0.05;
    this.crowd
      .slice()
      .reverse()
      .forEach((character) => {
        if (!character.isDestroyed) {
          character.playDanceThenRunAnimation(delay);
          delay += 0.05;
        }
      });
  };

  public playAllRun() {
    this.crowd.forEach((character) => {
      if (!character.isDestroyed) {
        character.playRunAnimation();
      }
    });
  }

  // DEBUG PURPOSE FOR CROWD
  public generateTestPhysicCharacter(assets: string[]) {
    // random character
    let rand = Math.floor(Math.floor(Math.random() * assets.length + 1));

    let charObj = new PhysicCharacter(
      this.scene,
      assets[rand - 1],
      "NBidle",
      "",
      this.mainState.objectSpeed,
      this.callbackCharacterDeleted,
      GameStep.debug
    );

    charObj.x -= this.testX;
    this.testX += 50;

    this.crowd.push(charObj);
  }

  private flushCharacters = () => {
    this.crowd = [];
  };

  private startWorldTransition(world: Worlds) {
    this.world = world;
    // console.log("PhysicCharacterManager", world);
  }

  private endWolrdTransition() {
    // console.log("End World Transition");
  }

  private onMainStateChange = (state: MainState) => {
    if (state.world !== this.mainState.world) {
      this.startWorldTransition(state.world);
    }
    if (
      state.isInTransition !== this.mainState.isInTransition &&
      !state.isInTransition
    ) {
      this.endWolrdTransition();
    }

    this.mainState = state;
  };

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isGameOver:
        this.flushCharacters();
        break;

      default:
        break;
    }
  };

  private onFreestyleStateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.playAllDance(true);
      } else {
        this.playAllDanseThenRun();
      }
    }

    this.freestyleState = state;
  };
}

export default PhysicCharacterManager;
