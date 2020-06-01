export interface AnimationData {
  key: string;
  asset: any;
  frameWidth: number;
  frameHeight: number;
  startFrame: number;
  endFrame: number;
  frameRate: number;
  repeat: number;
}

export default class AnimationManager {
  private static instance: AnimationManager;
  private data: AnimationData[];
  private scene: any;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor(scene: Phaser.Scene, data: AnimationData[]) {
    this.data = data;
    this.scene = scene;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public preload() {
    this.data.forEach((animation) => {
      this.scene.load.spritesheet(animation.key, animation.asset, {
        frameWidth: animation.frameWidth,
        frameHeight: animation.frameHeight,
        startFrame: animation.startFrame,
        endFrame: animation.endFrame,
      });
    });
  }

  public register() {
    this.data.forEach((animation) => {
      this.scene.anims.create({
        key: animation.key,
        frames: this.scene.anims.generateFrameNumbers(animation.key, {
          start: animation.startFrame,
          end: animation.endFrame,
        }),
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
  }
}
