import config from "./config";

export class TestScene extends Phaser.Scene {
  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    // this.scene.start('TestSceneCurtainBefore');
    this.add
      .text(100, 100, 'Tester les personnages', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneSpine');
      })
    this.add
      .text(500, 100, 'Tester la transition de scène', { fill: 'blue' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneCurtainBefore');
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
        this.scene.start('TestSceneCrowd');
      })
    this.add
      .text(100, 400, 'Tester le blob', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneBlob');
      })
    this.add
      .text(100, 500, 'Tester Drag Queen, God Mother, Score, Achievement', { fill: 'red' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('TestSceneDrag');
      })
  }

  public update() {
  }
}

export default TestScene;
