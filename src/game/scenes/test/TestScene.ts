import config from "./config";

export class TestScene extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    this.scene.start('TestSceneBackground');
    this.add
      .text(100, 200, 'Test Drag Queen', { fill: 'white' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneDragQueen');
      })
    this.add
      .text(100, 300, 'Test Background', { fill: 'white' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneBackground');
      })
  }

  public update() {
  }
}

export default TestScene;
