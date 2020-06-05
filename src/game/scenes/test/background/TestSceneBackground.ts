import config from "./config";

import BackgroundComponent from "../../../components/BackgroundComponent";
import MainStateManager from "../../../states/main";

import {
  mask,
} from "../../../assets";

export class TestSceneBackground extends Phaser.Scene {
  public background?: BackgroundComponent;
  private mainManager: MainStateManager;

  constructor() {
    super(config);
    this.mainManager = MainStateManager.getInstance();
  }

  public preload(): void {
    this.load.setPath("assets/spritesheets/world1/");
    this.load.multiatlas('world1', 'world1_spritesheet.json');
    
    this.load.setPath("assets/spritesheets/world3/");
    this.load.multiatlas('world3', 'world3_spritesheet.json');

    this.load.image("mask", mask);
  }

  public create() {
    this.background = new BackgroundComponent(this);

    // @ts-ignore
    let isDebug = this.game.config.physics.arcade.debug

    // test number of items displayed in scene
    if (isDebug) {
      window.setInterval(() => {
        // @ts-ignore
        console.log(this.add.displayList.list)
      }, 5000);
    }

    this.add
      .text(50, 550, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    this.add
      .text(150, 550, "Augmenter la vitesse", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.background?.updateSpeed(20)
      });

    this.add
      .text(150, 600, "Changer de monde", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.mainManager.changeWorld()
      });
  }

  public update() {}
}

export default TestSceneBackground;
