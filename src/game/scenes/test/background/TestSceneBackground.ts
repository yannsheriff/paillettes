import config from "./config";

import BackgroundComponent from "../../../components/BackgroundComponent";
import MainStateManager from "../../../states/main";

import {
  world_1_plane_1_1,
  world_1_plane_1_2,
  world_1_plane_1_3,
  world_1_plane_1_4,
  world_1_plane_2_1,
  world_1_plane_2_2,
  world_1_plane_2_3,
  world_1_plane_2_4,
  world_1_plane_2_5,
  world_1_plane_2_6,
  world_1_plane_3_1,
  world_1_plane_3_2,
  world_1_plane_3_3,
  world_1_plane_3_4,
  world_1_plane_3_5,
  world_1_plane_3_6,
  world_3_plane_1_1,
  world_3_plane_2_1,
  world_3_plane_2_2,
  world_3_plane_2_3,
  world_3_plane_2_4,
  world_3_plane_3_1,
  world_3_plane_3_2,
  world_3_plane_3_3,
  world_3_plane_3_4,
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
    // world 1
    this.load.image("world_1_plane_1_1", world_1_plane_1_1);
    this.load.image("world_1_plane_1_2", world_1_plane_1_2);
    this.load.image("world_1_plane_1_3", world_1_plane_1_3);
    this.load.image("world_1_plane_1_4", world_1_plane_1_4);

    this.load.image("world_1_plane_2_1", world_1_plane_2_1);
    this.load.image("world_1_plane_2_2", world_1_plane_2_2);
    this.load.image("world_1_plane_2_3", world_1_plane_2_3);
    this.load.image("world_1_plane_2_4", world_1_plane_2_4);
    this.load.image("world_1_plane_2_5", world_1_plane_2_5);
    this.load.image("world_1_plane_2_6", world_1_plane_2_6);

    this.load.image("world_1_plane_3_1", world_1_plane_3_1);
    this.load.image("world_1_plane_3_2", world_1_plane_3_2);
    this.load.image("world_1_plane_3_3", world_1_plane_3_3);
    this.load.image("world_1_plane_3_4", world_1_plane_3_4);
    this.load.image("world_1_plane_3_5", world_1_plane_3_5);
    this.load.image("world_1_plane_3_6", world_1_plane_3_6);

    // world 3
    this.load.image("world_3_plane_1_1", world_3_plane_1_1);

    this.load.image("world_3_plane_2_1", world_3_plane_2_1);
    this.load.image("world_3_plane_2_2", world_3_plane_2_2);
    this.load.image("world_3_plane_2_3", world_3_plane_2_3);
    this.load.image("world_3_plane_2_4", world_3_plane_2_4);
    
    this.load.image("world_3_plane_3_1", world_3_plane_3_1);
    this.load.image("world_3_plane_3_2", world_3_plane_3_2);
    this.load.image("world_3_plane_3_3", world_3_plane_3_3);
    this.load.image("world_3_plane_3_4", world_3_plane_3_4);

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
