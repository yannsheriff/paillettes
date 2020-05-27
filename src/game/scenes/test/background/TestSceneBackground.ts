import config from "./config";

import BackgroundManager from "../../../classes/component/BackgroundManager";

import {
  word_1_plane_1_1,
  word_1_plane_1_2,
  word_1_plane_1_3,
  word_1_plane_1_4,
  word_1_plane_2_1,
  word_1_plane_2_2,
  word_1_plane_2_3,
  word_1_plane_2_4,
  word_1_plane_2_5,
  word_1_plane_2_6,
  word_1_plane_3_1,
  word_1_plane_3_2,
  word_1_plane_3_3,
  word_1_plane_3_4,
  word_1_plane_3_5,
  word_1_plane_3_6,
  mask,
} from "../../../assets";

export class TestSceneBackground extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("word_1_plane_1_1", word_1_plane_1_1);
    this.load.image("word_1_plane_1_2", word_1_plane_1_2);
    this.load.image("word_1_plane_1_3", word_1_plane_1_3);
    this.load.image("word_1_plane_1_4", word_1_plane_1_4);

    this.load.image("word_1_plane_2_1", word_1_plane_2_1);
    this.load.image("word_1_plane_2_2", word_1_plane_2_2);
    this.load.image("word_1_plane_2_3", word_1_plane_2_3);
    this.load.image("word_1_plane_2_4", word_1_plane_2_4);
    this.load.image("word_1_plane_2_5", word_1_plane_2_5);
    this.load.image("word_1_plane_2_6", word_1_plane_2_6);

    this.load.image("word_1_plane_3_1", word_1_plane_3_1);
    this.load.image("word_1_plane_3_2", word_1_plane_3_2);
    this.load.image("word_1_plane_3_3", word_1_plane_3_3);
    this.load.image("word_1_plane_3_4", word_1_plane_3_4);
    this.load.image("word_1_plane_3_5", word_1_plane_3_5);
    this.load.image("word_1_plane_3_6", word_1_plane_3_6);

    this.load.image("mask", mask);
  }

  public create() {
    let background = new BackgroundManager(this);

    this.add
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });
  }

  public update() {}
}

export default TestSceneBackground;
