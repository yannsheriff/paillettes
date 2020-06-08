import config from "./config";
import CharacterBis from "../../../components/CharactersComponent/CharacterBis";
import { button, mask } from "../../../assets";
import DragQueen from "../../../components/DragQueenComponent";

export class TestSceneSpine extends Phaser.Scene {
  private dragQueen: Array<DragQueen> = [];
  private characterList: Array<CharacterBis> = [];
  private configList: Array<Phaser.GameObjects.Text> = [];
  private characterAssets: Array<string> = []

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("btn", button);
    this.load.image("mask", mask);

    for (let world = 1; world <= 4; world++) {
      for (let spine = 1; spine <= 2; spine++) {
        this.load.setPath("assets/spine/world" + world + "/man" + spine + "/");
        this.load.spine(
          "world_" + world + "_man_" + spine,
          "world_" + world + "_man_" + spine + ".json",
          "world_" + world + "_man_" + spine + ".atlas"
        );

        this.load.setPath("assets/spine/world" + world + "/woman" + spine + "/");
        this.load.spine(
          "world_" + world + "_woman_" + spine,
          "world_" + world + "_woman_" + spine + ".json",
          "world_" + world + "_woman_" + spine + ".atlas"
        );

        this.characterAssets.push("world_" + world + "_woman_" + spine)
        this.characterAssets.push("world_" + world + "_man_" + spine)
      }      
    }
    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");
  }

  public create() {
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

    this.characterAssets.forEach((character) => {
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
    this.dragQueen.push(dragQueen)
  }

  public addCharacter(assetName: string) {
    this.destroyAllCharacters();

    let character = new CharacterBis(
      this,
      700,
      500,
      assetName,
      "NBidle",
      "",
      false,
      false,
      true
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

    y = 500;
    let speeds = [0.2, 0.5, 0.8, 1, 1.2, 1.5, 2];

    speeds.forEach((speed) => {
      let speedconfig = this.add
        .text(50, y, "speed : " + speed, { fill: "black" })
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
    this.dragQueen.forEach((dragqueen) => {
      dragqueen.destroy();
    });
    this.characterList = [];
    this.configList = [];
    this.dragQueen = [];
  }

  public update() {}
}

export default TestSceneSpine;
