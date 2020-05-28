import PhysicCharacter from "./CharacterBis";
import CharacterManager from "../../managers/CharacterManager";

const charactersWorld1 = [
  "world_1_man_1",
  "world_1_man_2",
  "world_1_woman_1",
  "world_1_woman_2",
];
const animations = ["Dance", "Fail", "NBidle", "Run", "Transition"];

class PhysicCharacterManager {
  private scene: Phaser.Scene;
  public characters: Array<PhysicCharacter>;
  public actualCharacter: Array<PhysicCharacter>;
  public testY: number = 200;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.characters = [];
    this.actualCharacter = [];

    const characterManager = CharacterManager.getInstance();

    characterManager.onNewCharacter((id) => {
      console.log("new character", id);
      this.generateNewPhysicCharacter(id)
    });

    characterManager.isCharacterUnlocked((id, isUnlocked) => {
      console.log("isCharacterUnlocked", id, isUnlocked);
    });

    /*
     *
     * Création des colliders
     * temporairement visible
     *
     */
    const characterOverlap = scene.add.rectangle(
      window.innerWidth / 4 + window.innerWidth / 12 / 2,
      window.innerHeight / 2,
      window.innerWidth / 12,
      window.innerHeight
    ) as any;

    scene.physics.add.existing(characterOverlap);

    // scene.physics.add.overlap(
    //     this.characters,
    //     characterOverlap,
    //     this.handleCharacterOverlap,
    //     () => true,
    //     this
    // );
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
}

export default PhysicCharacterManager;
