import config from "./config";
import Character from "../../../components/CharactersComponent/Character";
import { button } from "../../../assets";
import DragQueen from "../../../components/DragQueenComponent/DragQueen";
import GodMother from "../../../components/GodMotherComponent/GodMother";
import AssetsManager from "../../../helpers/Assets";

import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../../assets/assets";
import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

export class TestSceneDrag extends Phaser.Scene {
  private dragQueen?: DragQueen;
  private godMother?: GodMother;
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
    this.add
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    this.add
      .text(150, 50, "Clear", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.destroyAllCharacters();
      });
    
    this.add
      .text(150, 100, "Ajouter la Drag Queen", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.addDragQueen()
      });

    this.add
      .text(150, 150, "Ajouter la GodMother", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.addGodMother()
      });

    let debug = true;
  }

  public addDragQueen() {
    this.destroyAllCharacters()
    this.dragQueen = new DragQueen(this, "dragqueen", "Run", true);
    this.addDebug(this.dragQueen)
  }

  public addGodMother() {
    this.destroyAllCharacters()
    this.godMother = new GodMother(this, "godmother", "Run", true);
    this.addDebug(this.godMother)
  }

  public addDebug(spine: SpineContainer) {
    let y = 200;
    
    spine.animationsList.forEach((animation) => {
      let animconfig = this.add
        .text(50, y, animation, { fill: "black" })
        .setInteractive()
        .on("pointerdown", () => {
          spine.playAnimation(animation, true);
        });
      this.configList.push(animconfig);
      y += 25;
    });
  }

  public destroyAllCharacters() {
    this.dragQueen?.deleteDragQueen();
    this.godMother?.deleteGodMother();

    this.configList.forEach((config) => {
      config.destroy();
    });
    this.configList = [];
  }

  public update() {}
}

export default TestSceneDrag;
