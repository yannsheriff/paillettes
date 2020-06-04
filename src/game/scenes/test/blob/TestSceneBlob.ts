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

    
    // let mask = new Mask(this, 600, 400, "mask", 0, this.pink);
    // Align.left(mask);

    let speed = 150;
    let blobPosition = {
      x: 0,
      y: window.innerHeight / 2
    }
    let rayon = window.innerWidth/3; // le blob prend 1/3 de l'écran
    let variation = 50;
    let graphics = this.add.graphics();
    let simplex = new SimplexNoise(Math.random);

    graphics.lineStyle(2, this.pink, 1);
    graphics.fillStyle(this.pink, 1);
    graphics.moveTo(blobPosition.x, blobPosition.y); // center

    for (var i = 0; i < Math.PI * 2 + 5; i += 0.01) {
      let value2d =
        simplex.noise2D(
          Math.cos(i) + speed,
          Math.sin(i) + speed
        ) * variation;
      let x = Math.cos(i) * (rayon + value2d) + (blobPosition.x);
      let y =
        Math.sin(i) * (rayon + value2d) + (blobPosition.y);
      graphics.lineTo(x, y);
    }

    graphics.fillPath();
    graphics.setDepth(7).setBlendMode('SCREEN')


    new Plane(this, 0, 0, 'world1', 'plane1/w1_p1_1', PlaneSpace.first, 0, true);

  }

  public update() { }
}

export default TestSceneBlob;
