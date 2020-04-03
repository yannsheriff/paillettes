import config from "./config";
import { test, char, arrowD, arrowL, arrowR, arrowU } from "../../assets";
import Arrow from "../../classes/physic/Arrow";
import CharactereManager from "../../classes/logic/CharacterManager";
import PhysiqueCharactere from "../../classes/physic/Character";

export class GameScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private a: number = 0;
  private charactereManager: CharactereManager;
  constructor() {
    super(config);
    this.charactereManager = new CharactereManager();
  }

  public preload(): void {
    this.load.image("fb", test);
    this.load.image("char", char);
    this.load.image("left", arrowL);
    this.load.image("right", arrowR);
    this.load.image("up", arrowU);
    this.load.image("down", arrowD);
  }

  overlap = (arrow: Arrow) => {
    const { charactereManager } = this;
    if (this.cursors?.left?.isDown && arrow.direction === "left") {
      charactereManager.registerSuccesfullArrow(arrow.id);
      arrow.destroy();
    }
    if (this.cursors?.right?.isDown && arrow.direction === "right") {
      charactereManager.registerSuccesfullArrow(arrow.id);
      arrow.destroy();
    }
    if (this.cursors?.up?.isDown && arrow.direction === "up") {
      charactereManager.registerSuccesfullArrow(arrow.id);
      arrow.destroy();
    }
    if (this.cursors?.down?.isDown && arrow.direction === "down") {
      charactereManager.registerSuccesfullArrow(arrow.id);
      arrow.destroy();
    }
  };

  overlapChar = (character: Arrow) => {
    if (this.charactereManager.isCharacterSuccesfull(character.id)) {
      character.setVelocity(0);
      character.setAcceleration(0);
      character.setPosition(this.a * 50 + 50, 50);
      this.a += 1;
    }
  };

  public create() {
    this.add.image(400, 300, "fb");
    this.cursors = this.input.keyboard.createCursorKeys();
    const arrows: Array<Arrow> = [];
    const characters: Array<PhysiqueCharactere> = [];

    // Event loop
    for (let index = 0; index < 20; index++) {
      const interval = 800;
      setTimeout(() => {
        const {
          shouldLaunchCharacter,
          ID
        } = this.charactereManager.getArrowID();
        const element = new Arrow(this, ID);
        arrows.push(element);

        if (shouldLaunchCharacter) {
          const char = new PhysiqueCharactere(this, ID);
          characters.push(char);
        }
      }, interval * index);
    }

    // Create Collider
    const goodArrowCollider = this.add.rectangle(
      400,
      400,
      100,
      800,
      0xffffff
    ) as any;
    this.physics.add.existing(goodArrowCollider);
    this.physics.add.overlap(
      arrows,
      goodArrowCollider,
      this.overlap,
      () => true,
      this
    );

    this.physics.add.overlap(
      characters,
      goodArrowCollider,
      this.overlapChar,
      () => true,
      this
    );
  }

  public update() {
    // TODO
  }
}

export default GameScene;
