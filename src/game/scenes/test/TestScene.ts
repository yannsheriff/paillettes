import config from "./config";

export class TestScene extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    // this.scene.start('TestSceneSpine');
    this.add
      .text(100, 200, 'Tester les personnages', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneSpine');
      })
    this.add
      .text(100, 300, 'Tester le background', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneBackground');
      })
  }

  public update() {
  }
}

export default TestScene;
