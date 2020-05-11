import config from "./config";
import Align from '../../../classes/utils/align';
import GrayscalePipeline from '../../../classes/filters/GrayscalePipeline';

// @ts-ignore
// import GrayScalePipeline from 'phaser3-rex-plugins/plugins/grayscalepipeline.js';

import {
  background,
  firstplane,
  secondfirstplane,
  secondplane,
  firstplane_nb,
  secondfirstplane_nb,
  secondplane_nb,
  testnb
} from "../../../assets";
import Background from "../../../classes/physic/Background";

export class TestSceneBackground extends Phaser.Scene {
  private background?: Background;
  private color: number = 0x5E24D8;
  private color2: number = 0xF64B4B;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("firstplane", firstplane);
    this.load.image("secondplane", secondplane);
    this.load.image("firstplane_nb", firstplane_nb);
    this.load.image("secondplane_nb", secondplane_nb);
    this.load.image("testnb", testnb);

    // @ts-ignore
    // this.game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));
    let customPipeline = this.game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));

  }

  public create() {    
    // let container = this.add.container(0, 0)

    // let testNb = this.add.sprite(200, 400, "testnb")
    // testNb.setBlendMode('NORMAL')

    // testNb.setTintFill(this.color);

    // Align.scaleToGameW(testNb, 1)
    // Align.centerV(testNb)
    // Align.left(testNb)

    let firstplaneSprite = this.add.sprite(200, 400, "firstplane_nb")
    // firstplaneSprite.setPipeline('Grayscale'); // black & white

    Align.scaleToGameW(firstplaneSprite, 1)
    Align.centerV(firstplaneSprite)
    Align.left(firstplaneSprite)


    // let secondplaneSprite = this.add.sprite(200, 400, "secondplane")
    // .setDepth(1)

    let rectangle = this.add.rectangle(200, 400, 500, 500, this.color)
    rectangle.setBlendMode('SCREEN')

    // var image = this.add.image(400, 300, 'firstplane');

    // Align.scaleToGameW(image, 1)
    // Align.centerV(image)
    // Align.left(image)


    // Align.scaleToGameW(secondplaneSprite, 1)
    // Align.centerV(secondplaneSprite)
    // Align.left(secondplaneSprite)
    // secondplaneSprite.setBlendMode(5);
    // container.add([firstplaneSprite, secondplaneSprite])

  }

  public update() {
    // if (this.background) {
    //   this.background.moveBackground();
    // }
  }
}

export default TestSceneBackground;
