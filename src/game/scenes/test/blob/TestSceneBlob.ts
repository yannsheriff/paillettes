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

    let graphics = this.add.graphics();
    let path = new Phaser.Curves.Path(50, 500);
    path.lineTo(700, 300);
    path.lineTo(600, 350);

    graphics.lineStyle(2, this.pink, 1);
    graphics.fillStyle(this.pink, 1);

    path.draw(graphics);
    graphics.setDepth(7).setBlendMode('SCREEN')


    new Plane(this, 0, 0, 'world1', 'plane1/w1_p1_1', PlaneSpace.first, 0, true);

    // let simplex = new SimplexNoise(Math.random);
  }

  public update() { }
}

export default TestSceneBlob;
