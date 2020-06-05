import config from "./config";
import Blob from "../../../components/BackgroundComponent/Blob"
import Plane, { PlaneSpace } from "../../../components/BackgroundComponent/Plane";
import SimplexNoise from "simplex-noise";

import { mask } from "../../../assets";

export class TestSceneBlob extends Phaser.Scene {
  private pink: number = 0xff00ab;
  private blue: number = 0x2b3aff;
  private purple: number = 0x6a23ff;
  private red: number = 0xff0b0b;
  private speed: number = 5;
  private blobPosition: any = {
    x: 0,
    y: window.innerHeight / 2
  }
  private rayon: number = window.innerWidth / 2; // le blob prend 1/3 de l'écran
  private variation: number = 70;
  private noise: SimplexNoise = new SimplexNoise(Math.random);
  private test: Array<number> = [];
  private blob?: Blob;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image('mask', mask);
    this.load.setPath("assets/spritesheets/world1/");
    this.load.multiatlas('world1', 'world1_spritesheet.json');
  }

  public create() {
    this.add
      .text(50, 50, "< Retour", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("TestScene");
      });

    this.blob = new Blob(this);

    this.add
      .text(50, 100, "Activer mode Freestyle", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        if(this.blob) {
          this.blob.playFreestyle()
        }
      });

    this.add
      .text(50, 150, "Sortir mode Freestyle", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        if(this.blob) {
          this.blob.stopFreestyle()
        }
      });

    // this.add
    //   .text(50, 200, "Changer de couleur", { fill: "red" })
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     if(this.blob) {
    //       // this.blob.changeColor()
    //     }
    //   });

    new Plane(this, 0, 0, 'world1', 'plane1/w1_p1_1', PlaneSpace.first, 0, true);
  }
}

export default TestSceneBlob;
