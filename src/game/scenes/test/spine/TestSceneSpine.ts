import config from "./config";
import CharacterBis from "../../../components/CharactersComponent/CharacterBis";
import { button } from "../../../assets";
import DragQueen from "../../../components/DragQueenComponent/DragQueen";
import AssetsManager from "../../../helpers/Assets";
import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../../assets/assets";

export class TestSceneSpine extends Phaser.Scene {
  private dragQueen: Array<DragQueen> = [];
  private characterList: Array<CharacterBis> = [];
  private configList: Array<Phaser.GameObjects.Text> = [];
  private characterAssets: Array<string> = [];
  private assetsManager: AssetsManager;

  constructor() {
    super(config);
    this.assetsManager = new AssetsManager(
      this,
      mainImages,
      mainSpritesheets,
      mainSpines,
      mainMusic
    );

    this.assetsManager.spineCharacters.forEach(character => {
      this.characterAssets.push(character.key);
    });
  }

  public preload(): void {
    this.load.image("btn", button);
    this.assetsManager.preload();

  }

  public create() {
    this.addDragQueen();
    
    this.add
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    let y = 50;

    this.add
      .text(450, 50, "Ajouter la Drag Queen", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.addDragQueen();
      })

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
    let dragQueen = new DragQueen(this, "dragqueen", "Run", true);
    this.dragQueen.push(dragQueen);
  }

  public addCharacter(assetName: string) {
    this.destroyAllCharacters();

    let character = new CharacterBis(
      this,
      assetName,
      "NBidle",
      "",
      400,
      () => {},
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
