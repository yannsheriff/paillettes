import config from "./config";
import Align from '../../../classes/utils/align';

// @ts-ignore
import GrayScalePipelinePlugin from '../../../plugins/filters/Grayscale/GrayscalePlugin';
import HslAdjustPipelinePlugin from '../../../plugins/filters/HSLAdjust/HslAdjustPipeline'

import Plane from "../../../classes/physic/Plane";
import BackgroundManager from "../../../classes/logic/BackgroundManager";

import {
  word_1_plane_1,
  word_1_plane_2,
  word_1_plane_3,
  word_1_plane_1_nb,
  word_1_plane_2_nb,
  word_1_plane_3_nb,
  plane_test,
  mask,
  maskpink,
  maskpurple,
  maskred,
} from "../../../assets";

export class TestSceneBackground extends Phaser.Scene {
  private background?: BackgroundManager;
  private mask: any;
  private shapemask: any;
  private test: number = 1;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("plane_test", plane_test);

    this.load.image("firstplane", word_1_plane_1);
    this.load.image("secondplane", word_1_plane_2);
    this.load.image("thirdplane", word_1_plane_3);
    this.load.image("firstplane_nb", word_1_plane_1_nb);
    this.load.image("secondplane_nb", word_1_plane_2_nb);
    this.load.image("thirdplane_nb", word_1_plane_3_nb);

    this.load.image("mask", mask);
    this.load.image("maskred", maskred);
    this.load.image("maskpurple", maskpurple);
    this.load.image("maskpink", maskpink);
  }

  public create() {
    let background = new BackgroundManager(this)


    // let grayScalePipeline = new GrayScalePipelinePlugin(this, 'rexGrayScalePipeline', config);
    // grayScalePipeline.intensity = 1;
    // let plane_nb = new Plane(this, 600, 400, "plane_test", 1, false)

    // this.shapemask = this.make.image({
    //   x: 150,
    //   y: 300,
    //   key: 'mask',
    //   add: true
    // }).setTint(this.blue).setBlendMode('SCREEN').setDepth(10);

    // Align.left(this.shapemask)
    // Align.bottom(this.shapemask)

    // let plane_color = new Plane(this, 600, 400, "firstplane", 1, false, this.shapemask)

    // plane_color.mask = new Phaser.Display.Masks.BitmapMask(this, this.shapemask);

    //    
    //    USE PIPELINE TO SET SPRITES BLACK AND WHITE 
    //    POSSIBILITY TO SET INTENSITY
    //     
     
    // let testSprite = this.physics.add.sprite(500, 400, "firstplane")

    // testSprite.setPipeline('rexGrayScalePipeline')

    // let firstplane_color = this.physics.add.sprite(500, 400, "firstplane").setDepth(2)

    // let firstplane_nb = this.physics.add.sprite(500, 400, "firstplane").setDepth(1)
    
    // Align.scaleToGameW(firstplane_color, 1)
    // Align.centerV(firstplane_color)
    // Align.right(firstplane_color)

    // Align.scaleToGameW(firstplane_nb, 1)
    // Align.centerV(firstplane_nb)
    // Align.right(firstplane_nb)

    //     
    //    USE PIPELINE
    //    POSSIBILITY 
    //     
    
    // let testNb = this.add.sprite(200, 400, "testnb")

    // Align.scaleToGameW(testNb, 1)
    // Align.centerV(testNb)
    // Align.left(testNb)

    // let firstplaneSprite = this.add.sprite(500, 400, "firstplane_nb")
    // firstplaneSprite
    //   .setTint(0xffffff)

    // Align.scaleToGameW(firstplaneSprite, 1)
    // Align.centerV(firstplaneSprite)
    // Align.centerH(firstplaneSprite)

    // let shape = this.make.image({
    //   x: 300,
    //   y: 300,
    //   key: 'maskblue',
    //   add: false
    // })

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
    
    // firstplane_color.setMask(mask); // image.mask = mask;

    // Align.scaleToGameH(mask, 1)

    // mask.setBlendMode('SCREEN')

    // firstplane_color.mask = new Phaser.Display.Masks.BitmapMask(this, mask);

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
    // this.shapemask.setScale(this.test)
    // this.mask = this.shapemask.createBitmapMask();

    // this.mask.setScale(0.5)
    // if (this.background) {
    //   this.background.moveBackground();
    // }
  }
}

export default TestSceneBackground;
