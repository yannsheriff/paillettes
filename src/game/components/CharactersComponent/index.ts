import PhysicCharacter from "./CharacterBis";
import CharacterManager from "../../managers/CharacterManager";
import MainStateManager, { MainState, Worlds } from "../../states/main";

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

  public characters: Array<PhysicCharacter>;
  public actualCharacter: Array<PhysicCharacter>;
  public testY: number = 200;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.characters = [];
    this.actualCharacter = [];
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    const characterManager = CharacterManager.getInstance();

    characterManager.onNewCharacter((id) => {
      console.log("new character", id);
      this.generateNewPhysicCharacter(id)
    });

    characterManager.isCharacterUnlocked((id, isUnlocked) => {
      console.log("isCharacterUnlocked", id, isUnlocked);
    });
  }

  public generateNewPhysicCharacter(id: string) {
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
    this.characters.push(charObj);
    this.testY += 120;
  }

  public playTransformation(id: string) {
    this.characters.forEach((character) => {
      character.playTransformationAnimation();
    });
  }

  public playAllDance() {
    this.characters.forEach((character) => {
      character.playDanceAnimation();
    });
  }

  public playDanseThenRun() {
    let delay = 0.08;
    this.characters.forEach((character) => {
      character.playDanceThenRunAnimation(delay);
      delay += 0.08;
    });
  }

  public playAllRun() {
    this.characters.forEach((character) => {
      character.playRunAnimation();
    });
  }

  // DEBUG PURPOSE
  public playAllAnimations() {}

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
