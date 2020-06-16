import config from "./config";
import Character from "../../../components/CharactersComponent/Character";
import { button } from "../../../assets";
import DragQueen from "../../../components/DragQueenComponent/DragQueen";
import GodMother from "../../../components/GodMotherComponent/GodMother";
import Achievement from "../../../components/AchievementComponent/Achievement";
import Score from "../../../components/ScoreComponent/Score";
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
  private achievement?: Achievement;
  private score?: Score;
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
      .setDepth(50)
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    this.add
      .text(150, 50, "Clear", { fill: "red" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.destroyAllCharacters();
      });
    
    this.add
      .text(150, 100, "Ajouter la Drag Queen", { fill: "red" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.addDragQueen()
      });

    this.add
      .text(150, 150, "Ajouter la GodMother", { fill: "red" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.addGodMother()
      });

    this.add
      .text(150, 200, "Ajouter un achievement", { fill: "red" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.addAchievement()
      });

    // this.add
    //   .text(150, 250, "Ajouter le Score", { fill: "red" })
    //   .setInteractive()
    //   .setDepth(50)
    //   .on("pointerdown", () => {
    //     this.addScore()
    //   });

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

  public addAchievement() {
    this.destroyAllCharacters()
    this.achievement = new Achievement(this, "achievement", "Achievement", true);
    this.addDebug(this.achievement)
  }

  // public addScore() {
  //   this.destroyAllCharacters()
  //   this.score = new Score(this, "score", "Run", true);
  //   this.addDebug(this.score)
  // }

  public addDebug(spine: SpineContainer) {
    let y = 200;
    
    spine.animationsList.forEach((animation) => {
      let animconfig = this.add
        .text(50, y, animation, { fill: "black" })
        .setInteractive()
        .setDepth(50)
        .on("pointerdown", () => {
          spine.playAnimation(animation, true);
        });
      this.configList.push(animconfig);
      y += 25;
    });

    spine.skinsList.forEach((skin) => {
      let skinconfig = this.add
        .text(50, y, skin, { fill: "black" })
        .setInteractive()
        .setDepth(50)
        .on("pointerdown", () => {
          spine.changeSkin(skin);
        });
      this.configList.push(skinconfig);
      y += 25;
    });
  }

  public destroyAllCharacters() {
    this.dragQueen?.deleteDragQueen();
    this.godMother?.deleteGodMother();
    this.achievement?.deleteAchievement();
    this.score?.deleteScoreSpine();

    this.configList.forEach((config) => {
      config.destroy();
    });
    this.configList = [];
  }

  public update() {}
}

export default TestSceneDrag;
