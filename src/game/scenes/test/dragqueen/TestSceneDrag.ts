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

export class TestSceneDrag extends Phaser.Scene {
  private dragQueen?: DragQueen;
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

    let debug = true;
  }

  public addDragQueen() {
    this.dragQueen = new DragQueen(this, "dragqueen", "Run", true);
    this.addDebug()
  }

  public addDebug() {
    let y = 200;
    
    console.log(this.dragQueen?.animationsList)
    this.dragQueen?.animationsList.forEach((animation) => {
      let animconfig = this.add
        .text(50, y, animation, { fill: "black" })
        .setInteractive()
        .on("pointerdown", () => {
          console.log(animation)
          this.dragQueen?.playAnimation(animation, true);
        });
      this.configList.push(animconfig);
      y += 25;
    });
  }

  public destroyAllCharacters() {
    console.log('delete')
    this.dragQueen?.deleteDragQueen();

    this.configList.forEach((config) => {
      config.destroy();
    });
    this.configList = [];
  }

  public update() {}
}

export default TestSceneDrag;
