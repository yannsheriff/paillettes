import config from "./config";
import Align from '../../../classes/utils/align';
import {
  word_1_plane_1,
  word_1_plane_2,
  word_1_plane_3,
} from "../../../assets";

export class TestSceneBackgroundAnimation extends Phaser.Scene {
  private pink : number =  0xff7fd5
  private purple: number =  0x5e24d8
  private blue: number =  0x5485ff
  private red: number =  0xf64b4b
  private white: number = 0xffffff;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("firstplane", word_1_plane_1);
    this.load.image("secondplane", word_1_plane_2);
    this.load.image("thirdplane", word_1_plane_3);
  }

  public create() {
    // let plane = new Plane(this, 600, 400, "firstplane")

    // let firstplane = this.physics.add.sprite(600, 400, "firstplane")

    // let secondplane = this.physics.add.sprite(400, 400, "secondplane").setDepth(2).setScale(0.5)
    // Align.left(secondplane)
    // Align.bottom(secondplane)
    // let thirdplane = this.physics.add.sprite(200, 400, "thirdplane").setDepth(1).setScale(0.5)
    // Align.left(thirdplane)
    // Align.bottom(thirdplane)

    // console.log(firstplane)
    // console.log(firstplane.body)
    // const firstplanebody = firstplane.body as Phaser.Physics.Arcade.Body;
    // console.log(firstplanebody)
    // firstplanebody.setVelocityX(-100);
    // const secondplanebody = secondplane.body as Phaser.Physics.Arcade.Body;
    // secondplanebody.setVelocityX(-60);
    // const thirdplanebody = thirdplane.body as Phaser.Physics.Arcade.Body;
    // thirdplanebody.setVelocityX(-20);
  }

  public update() {
    // if (this.background) {
    //   this.background.moveBackground();
    // }
  }
}

export default TestSceneBackgroundAnimation;
