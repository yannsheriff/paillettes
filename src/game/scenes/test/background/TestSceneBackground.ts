import config from "./config";

import GroundComponent from "../../../components/GroundComponent";
import BackgroundComponent from "../../../components/BackgroundComponent";
import MainStateManager from "../../../states/main";

import {
  ground
} from "../../../assets";

export class TestSceneBackground extends Phaser.Scene {
  public background?: BackgroundComponent;
  public ground?: GroundComponent;
  private mainManager: MainStateManager;

  constructor() {
    super(config);
    this.mainManager = MainStateManager.getInstance();
  }

  public preload(): void {
    this.load.image("ground", ground);

    this.load.setPath("assets/spritesheets/world1/");
    this.load.multiatlas('world1', 'world1_spritesheet.json');

    this.load.setPath("assets/spritesheets/world2/");
    this.load.multiatlas('world2', 'world2_spritesheet.json');
    
    this.load.setPath("assets/spritesheets/world3/");
    this.load.multiatlas('world3', 'world3_spritesheet.json');

    this.load.setPath("assets/spritesheets/world4/");
    this.load.multiatlas('world4', 'world4_spritesheet.json');
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
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    this.add
      .text(150, 100, "Ajouter le sol", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.ground = new GroundComponent(this);
      });

    this.add
      .text(150, 150, "Changer de monde", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.mainManager.changeWorld()
      });

    this.add
      .text(150, 200, "Play", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.mainManager.launchGame();
    });

    this.add
      .text(150, 250, "Pause", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.pause()
    });
  }

  public update() {}
}

export default TestSceneBackground;
