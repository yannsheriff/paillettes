import config from "./config";

export class TestScene extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    // this.scene.start('TestSceneCharacters');
    this.add
      .text(100, 100, 'Tester les personnages', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneSpine');
      })
    this.add
      .text(100, 200, 'Tester le background', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneBackground');
      })
    this.add
      .text(100, 300, 'Tester la foule', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneCharacters');
      })
  }

  public update() {
  }
}

export default TestScene;
