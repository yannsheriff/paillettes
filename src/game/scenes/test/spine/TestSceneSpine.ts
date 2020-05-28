import config from "./config";
import CharacterBis from "../../../components/CharactersComponent/CharacterBis";
import { button, mask, char } from "../../../assets";
import DragQueen from "../../../components/DragQueenComponent";

export class TestSceneSpine extends Phaser.Scene {
  private characterList: Array<CharacterBis> = [];
  private configList: Array<Phaser.GameObjects.Text> = [];
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("btn", button);
    this.load.image("mask", mask);
    // man 1
    this.load.setPath("assets/spine/world1/man1/");
    this.load.spine(
      "world_1_man_1",
      "world_1_man_1.json",
      "world_1_man_1.atlas"
    );
    // man 2
    this.load.setPath("assets/spine/world1/man2/");
    this.load.spine(
      "world_1_man_2",
      "world_1_man_2.json",
      "world_1_man_2.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman1/");
    this.load.spine(
      "world_1_woman_1",
      "world_1_woman_1.json",
      "world_1_woman_1.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman2/");
    this.load.spine(
      "world_1_woman_2",
      "world_1_woman_2.json",
      "world_1_woman_2.atlas"
    );

    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");
  }

  public create() {
    let charactersWorld1 = [
      "world_1_man_1",
      "world_1_man_2",
      "world_1_woman_1",
      "world_1_woman_2",
    ];
    this.add
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    let y = 50;

    this.add
      .text(400, 50, "Ajouter la Drag Queen", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.addDragQueen()
      });

    charactersWorld1.forEach((character) => {
      this.add
        .text(150, y, "Ajouter " + character, { fill: "red" })
        .setInteractive()
        .on("pointerdown", () => {
          this.addCharacter(character);
        });
      y += 25;
    });

    this.add
      .text(150, y, "Clear", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.destroyAllCharacters();
      });

    let debug = true;

    this.add
      .text(50, 100, "Debug", { fill: "black" })
      .setInteractive()
      .on("pointerdown", () => {
        debug = !debug;
        this.characterList.forEach((character) => {
          character.drawDebug(debug);
        });
      });
  }

  public addDragQueen() {
    let dragQueen = new DragQueen(
      this,
      window.innerWidth / 3,
      window.innerHeight / 1.5,
      "dragqueen",
      "Run",
      true
    );  
  }

  public addCharacter(assetName: string) {
    this.destroyAllCharacters();

    let rand = Math.floor(Math.random() * 2);
    let character = new CharacterBis(
      this,
      700,
      500,
      assetName,
      "NBidle",
      "",
      false
    );
    this.characterList.push(character);
    this.addDebug(character);
  }

  public addDebug(character: CharacterBis) {
    let y = 150;

    character.skinsList.forEach((skin) => {
      let skinconfig = this.add
        .text(50, y, skin, { fill: "black" })
        .setInteractive()
        .on("pointerdown", () => {
          character.changeSkin(skin);
        });
      this.configList.push(skinconfig);
      y += 25;
    });

    y = 300;

    character.animationsList.forEach((animation) => {
      let animconfig = this.add
        .text(50, y, animation, { fill: "black" })
        .setInteractive()
        .on("pointerdown", () => {
          character.playAnimation(animation, true);
        });
      this.configList.push(animconfig);
      y += 25;
    });

    y = 300;
    let speeds = [0.2, 0.5, 0.8, 1, 1.2, 1.5, 2];

    speeds.forEach((speed) => {
      let speedconfig = this.add
        .text(180, y, "speed : " + speed, { fill: "black" })
        .setInteractive()
        .on("pointerdown", () => {
          character.changeAnimationSpeed(speed);
        });
      this.configList.push(speedconfig);
      y += 25;
    });

    // this.dragQueen.slotList.forEach(slot => {
    //   this.add
    //   .text(300, y, slot, { fill: 'black' })
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     if (this.dragQueen) {
    //       this.dragQueen.changeSlotColor(slot, 255, 0, 0)
    //     }
    //   })
    //   y += 25;
    // });
  }

  public destroyAllCharacters() {
    this.characterList.forEach((character) => {
      character.deleteCharacter();
    });
    this.configList.forEach((config) => {
      config.destroy();
    });
    this.characterList = [];
    this.configList = [];
  }

  public update() {}
}

export default TestSceneSpine;
