import config from "./config";
import Align from '../../../classes/utils/align';
// first test
// import GrayscalePipeline from '../../../classes/filters/GrayscalePipeline';

// @ts-ignore
import GrayScalePipelinePlugin from '../../../classes/filters/Grayscale/GrayscalePipeline';

import {
  background,
  firstplane,
  secondfirstplane,
  secondplane,
  firstplane_nb,
  secondfirstplane_nb,
  secondplane_nb,
  testnb,
  mask,
  maskcolor
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
    this.load.image("mask", mask);
    this.load.image("maskcolor", maskcolor);

    // @ts-ignore
    // let customPipeline = this.game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));
  }

  public create() {
    //     
    //    USE PIPELINE TO SET SPRITES BLACK AND WHITE 
    //    POSSIBILITY TO SET INTENSITY
    //     
    let testSprite = this.add.sprite(500, 400, "firstplane")
    
    let customPipeline = new GrayScalePipelinePlugin(this, 'rexGrayScalePipeline', config);
    customPipeline.intensity = 0.7;
    testSprite.setPipeline('rexGrayScalePipeline')


    // this.cameras.main.setRenderToTexture(customPipeline);

    // let testNb = this.add.sprite(200, 400, "testnb")
    // testNb.setBlendMode('NORMAL')

    // testNb.setTintFill(this.color);

    // Align.scaleToGameW(testNb, 1)
    // Align.centerV(testNb)
    // Align.left(testNb)

    // let firstplaneSprite = this.add.sprite(500, 400, "firstplane_nb")
    // firstplaneSprite
    //   .setTint(0xffffff)

    // Align.scaleToGameW(firstplaneSprite, 1)
    // Align.centerV(firstplaneSprite)

    // let shape = this.make.image({
    //   x: 300,
    //   y: 300,
    //   key: 'maskcolor',
    //   add: true
    // })
    // shape.setBlendMode('MULTIPLY').setAlpha(0.1)

    // let shape2 = this.make.image({
    //   x: 300,
    //   y: 300,
    //   key: 'maskcolor',
    //   add: true
    // })
    // shape2.setBlendMode('SCREEN').setAlpha(0.9)

    // Align.scaleToGameH(shape, 1)
    // Align.centerV(shape)
    // Align.left(shape)

    // let shape = this.add.rectangle(200, 400, 520, 500, this.color);

    // Align.scaleToGameH(shape, 1)
    // Align.centerV(shape)
    // Align.left(shape)
    
    // let mask = this.make.image({
    //   x: 300,
    //   y: 300,
    //   key: 'mask',
    //   add: false
    // });

    // Align.scaleToGameH(mask, 1)
    // Align.centerV(mask)
    // Align.left(mask)

    // mask.setBlendMode('SCREEN')

    // console.log(shape)

    // shape.mask = new Phaser.Display.Masks.BitmapMask(this, mask);

    // shape.setBlendMode('SCREEN')


    // mask.setBlendMode('SCREEN')

    // let sprite = this.make.sprite({
    //   x: 400, 
    //   y: 400, 
    //   key: 'firstplane_nb',
    //   add: true
    // });



    // firstplaneSprite.setMask(mask); // image.mask = mask;

    // firstplaneSprite.setPipeline('Grayscale'); // black & white


    // var tween = this.tweens.add({
    //   targets: firstplaneSprite,
    //   tint: this.color,
    //   alpha: 1,
    //   x: 0,
    //   duration: 6000,
    //   ease: 'Power1'
    // });


    // let secondplaneSprite = this.add.sprite(200, 400, "secondplane")
    // .setDepth(1)


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
