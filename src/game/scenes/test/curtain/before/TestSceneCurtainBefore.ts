import config from "./config";
import Score from "../../../../components/ScoreComponent/Score";
import AssetsManager from "../../../../helpers/Assets";

import {
  mainImages,
  mainSpritesheets,
  mainSpines,
  mainMusic,
} from "../../../../assets/assets";
import SpineContainer from "../../../../helpers/SpineContainer/SpineContainer";

export class TestSceneCurtainBefore extends Phaser.Scene {
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
      .text(150, 100, "Ajouter le rideau", { fill: "red" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.addCurtain()
      });

    let debug = true;
  }

  public addCurtain() {
    this.destroyAllCharacters()
    this.score = new Score(this, "score", "01_Fermeture", false);


    this.add
      .text(window.innerWidth/2, window.innerHeight/2, "Changer de scène", { fill: "white" })
      .setInteractive()
      .setDepth(50)
      .on("pointerdown", () => {
        this.scene.start("TestSceneCurtainAfter");
      });
  }

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
    this.score?.deleteScoreSpine();
    this.configList.forEach((config) => {
      config.destroy();
    });
    this.configList = [];
  }

  public update() {}
}

export default TestSceneCurtainBefore;
