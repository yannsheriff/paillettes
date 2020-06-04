import config from "./config";
import Mask from "../../../components/BackgroundComponent/Mask"
import Plane, { PlaneSpace } from "../../../components/BackgroundComponent/Plane";
import Align from "../../../helpers/Align/align";
import SimplexNoise from "simplex-noise";

import { mask } from "../../../assets";

export class TestSceneBlob extends Phaser.Scene {
  private pink: number = 0xff00ab;
  private blue: number = 0x2b3aff;
  private purple: number = 0x6a23ff;
  private red: number = 0xff0b0b;
  private blob?: Phaser.GameObjects.Graphics;
  private speed: number = 5;
  private blobPosition: any = {
    x: 0,
    y: window.innerHeight / 2
  }
  private rayon: number = window.innerWidth / 2; // le blob prend 1/3 de l'écran
  private variation: number = 70;
  private noise: SimplexNoise = new SimplexNoise(Math.random);
  private test: Array<number> = [];

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

    this.blob = this.add.graphics();

    // let mask = new Mask(this, 600, 400, "mask", 0, this.pink);
    // Align.left(mask);

    new Plane(this, 0, 0, 'world1', 'plane1/w1_p1_1', PlaneSpace.first, 0, true);
  }

  public update() {
    this.drawBlob()
  }

  public drawBlob() {
    if (this.blob) {
      this.speed += 0.004; // maybe refacto

      this.blob.clear()
      this.blob.lineStyle(2, this.pink, 1);
      this.blob.fillStyle(this.pink, 1);
      this.blob.moveTo(this.blobPosition.x, this.blobPosition.y); // center

      for (var i = - Math.PI / 2; i < Math.PI / 2 + 0.02; i += 0.02 * (Math.PI / 2)) {
        let value2d =
          this.noise.noise2D(
            Math.cos(i) + this.speed,
            Math.sin(i) + this.speed
          ) * this.variation;
        let x = Math.cos(i) * (this.rayon + value2d) + (this.blobPosition.x);
        let y =
          Math.sin(i) * (this.rayon + value2d) + (this.blobPosition.y);
        this.blob.lineTo(x, y);
      }

      this.blob.fillPath();
      this.blob.setDepth(7).setBlendMode('SCREEN')
    }

  }
}

export default TestSceneBlob;
