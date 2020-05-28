import PhysicCharacter from "./CharacterBis";
import CharacterManager from "../../managers/CharacterManager";
import MainStateManager, { MainState, Worlds } from "../../states/main";
import Align from "../../helpers/Align/align"

const charactersWorld1 = [
  "world_1_man_1",
  "world_1_man_2",
  "world_1_woman_1",
  "world_1_woman_2",
];
const animations = ["Dance", "Fail", "NBidle", "Run", "Transition"];

class PhysicCharacterManager {
  private scene: Phaser.Scene;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private colliderZone: Phaser.GameObjects.Rectangle;
  private collider?: Phaser.Physics.Arcade.Collider;
  private overlapTrigger: boolean = false;

  public crowd: Array<PhysicCharacter>;
  public actualCharacter: Array<PhysicCharacter>;
  public testY: number = 200;
  public nextUnlocked: string = ''

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.crowd = [];
    this.actualCharacter = [];
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

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
      console.log("generateNewPhysicCharacter", id);
      this.generateNewPhysicCharacter(id)
    });

    characterManager.isCharacterUnlocked((id, isUnlocked) => {
      console.log("isCharacterUnlocked", id, isUnlocked);
      if (isUnlocked) {
        this.nextUnlocked = id
      }
    });
  }

  public generateNewPhysicCharacter(id: string) {
    // random character
    let rand = Math.floor(Math.floor(Math.random() * charactersWorld1.length));

    let charObj = new PhysicCharacter(
      this.scene,
      window.innerWidth + 500,
      window.innerHeight / 1.5,
      charactersWorld1[rand],
      "NBidle",
      id,
      false
    );
    this.actualCharacter.push(charObj);

    this.testY += 120;

    this.addCollision(charObj)
  }

  public addCollision(character: PhysicCharacter) {
    this.collider = this.scene.physics.add.overlap(
      character.SpineContainer,
      this.colliderZone,
      () => { this.checkIfUnlocked(character) },
      () => true,
      this
    );
  }

  public checkIfUnlocked(character: PhysicCharacter) {
    // first we destroy the collision to avoid endless loop
    if (this.collider) {
      this.scene.physics.world.removeCollider(this.collider);
    };

    if (this.nextUnlocked === character.id) {
      // character.stop()
      // character.playTransformationAnimation()
      // character.playRunAnimation()
    } else {
      character.failAndDestroy()
    }
    this.actualCharacter = []
  }

  public transformAndJoinCrowd() {
    this.actualCharacter[0].playTransformationAnimation();
    this.crowd.push(this.actualCharacter[0]);
  }

  public playTransformation(id: string) {
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
    this.crowd.forEach((character) => {
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
  public playAllAnimations() { }

  private startWolrdTransition(world: Worlds) {
    console.log("PhysicCharacterManager", world);
  }

  private endWolrdTransition() {
    console.log("End World Transition");
  }

  private onMainStateChange = (state: MainState) => {
    if (state.world !== this.mainState.world) {
      this.startWolrdTransition(state.world);
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
