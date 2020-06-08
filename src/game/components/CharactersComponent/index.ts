import PhysicCharacter from "./CharacterBis";
import CharacterManager from "../../managers/CharacterManager";
import MainStateManager, { MainState, Worlds } from "../../states/main";
import Align from "../../helpers/Align/align"

const characters = [
  "world__man_1", // world_1_man_1
  "world__man_2",
  "world__woman_1",
  "world__woman_2"
];
const animations = ["Dance", "Fail", "NBidle", "Run", "Transition"];

class PhysicCharacterManager {
  private scene: Phaser.Scene;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private colliderZone: Phaser.GameObjects.Rectangle;
  private colliders: Array<Phaser.Physics.Arcade.Collider> = [];
  private overlapTrigger: boolean = false;

  public crowd: Array<PhysicCharacter>;
  public world: Worlds;
  private charactersBW: Map<string, PhysicCharacter> = new Map();
  public testX: number = 0;
  public nextUnlocked: string = ''

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.crowd = [];
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;
    this.world = this.mainManager.state.world;

    const characterManager = CharacterManager.getInstance();

    this.colliderZone = this.scene.add.rectangle(
      200,
      200,
      200,
      window.innerHeight
    );

    Align.centerV(this.colliderZone)
    Align.centerH(this.colliderZone)
    Align.scaleToGameH(this.colliderZone, 1)

    this.scene.physics.add.existing(this.colliderZone);

    characterManager.onNewCharacter((id) => {
      this.generateNewPhysicCharacter(id)
    });

    characterManager.isCharacterUnlocked((id, isUnlocked) => {
      if (isUnlocked) {
        this.charactersBW.get(id)?.unlock()
      }
    });
  }

  public generateNewPhysicCharacter(id: string) {
    let gender = Math.round(Math.random()) === 0 ? 'man' : 'woman'
    let nb = Math.floor(Math.random() * 2) + 1;;

    // console.log("world_" + this.world + "_" + gender + "_" + nb)

    let charObj = new PhysicCharacter(
      this.scene,
      "world_" + this.world + "_" + gender + "_" + nb,
      "NBidle",
      id,
      false,
      true,
      false,
      this.crowd.length
    );

    this.charactersBW.set(id, charObj);

    this.addCollision(charObj)
  }

  public addCollision(character: PhysicCharacter) {
    let newCollider = this.scene.physics.add.overlap(
      character,
      this.colliderZone,
      () => { this.checkIfUnlocked(character) },
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
      this.crowd.push(character)
      character.joinCrowd(this.crowd.length + 1)
    } else {
      character.failAndDestroy()
    }
    
    this.charactersBW.delete(character.id)
  }

  public playTransformation() {
    this.crowd.forEach((character) => {
      character.playTransformationAnimation();
    });
  }

  public playAllDance() {
    this.crowd.forEach((character) => {
      character.playDanceAnimation();
    });
  }

  public playDanseThenRun() {
    let delay = 0.08;
    this.crowd.slice().reverse().forEach((character) => {
      character.playDanceThenRunAnimation(delay);
      delay += 0.08;
    });
  }

  public playAllRun() {
    this.crowd.forEach((character) => {
      character.playRunAnimation();
    });
  }

  // DEBUG PURPOSE

  public generateTestPhysicCharacter(assets: string[]) {
    // random character
    let rand = Math.floor(Math.floor(Math.random() * assets.length + 1));

    let charObj = new PhysicCharacter(
      this.scene,
      assets[rand - 1],
      "NBidle",
      '',
      false,
      false,
      true
    );

    charObj.x -= this.testX;
    this.testX += 50;

    this.crowd.push(charObj)
  }

  private startWorldTransition(world: Worlds) {
    this.world = world;
    console.log("PhysicCharacterManager", world);
  }

  private endWolrdTransition() {
    console.log("End World Transition");
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
}

export default PhysicCharacterManager;
