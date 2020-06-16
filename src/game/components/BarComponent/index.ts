import Align from "../../helpers/Align/align";

const BarWidth = 1236;

function getProgressData(
  BarWidth: number,
  scale: number,
  progress: number
): { posX: number; width: number; tipX: number } {
  const pgrssBarWidth = (BarWidth - 40) * scale;
  const mainBarWidth = BarWidth * scale;
  const width = (pgrssBarWidth / 100) * progress;
  const posX = window.innerWidth / 2 - mainBarWidth / 2 + 20 + width / 2;
  const tipX = window.innerWidth / 2 - mainBarWidth / 2 + width + 20;

  return { width, posX, tipX };
}

class BarComponent {
  private scene: Phaser.Scene;
  private scale: number;
  private bar?: Phaser.GameObjects.Image;
  private progressBar?: Phaser.GameObjects.Rectangle;
  private progressValue: number;
  private progressIncrement: number;
  private progressTip?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, scale: number) {
    this.scene = scene;
    this.scale = scale;
    const moneyAlreadyFounded = 600;
    const totalMoney = 3000;
    this.progressValue = (moneyAlreadyFounded / totalMoney) * 100;

    const unlockedCherLength = 124;
    const unlockedMoney = (unlockedCherLength * 0.5) / 200 + 2.5;

    console.log("BarComponent -> constructor -> unlockedMoney", unlockedMoney);
    this.progressIncrement = unlockedMoney / unlockedCherLength;
    this.create();
  }

  create() {
    this.bar = this.scene.add
      .image(0, window.innerHeight * 0.8, "Bar")
      .setScale(this.scale)
      .setDepth(13);
    Align.centerH(this.bar);
    // const progress = 20;

    const { posX, tipX, width } = getProgressData(
      BarWidth,
      this.scale,
      this.progressValue
    );

    this.progressBar = this.scene.add
      .rectangle(
        posX,
        window.innerHeight * 0.8,
        width,
        20,
        Phaser.Display.Color.GetColor(255, 255, 255)
      )
      .setDepth(13);

    this.progressTip = this.scene.add
      .image(tipX, window.innerHeight * 0.8, "BarLoaderTip")
      .setScale(this.scale)
      .setDepth(13);
  }

  public increment() {
    this.progressValue += this.progressIncrement;

    const { tipX, width } = getProgressData(
      BarWidth,
      this.scale,
      this.progressValue
    );

    this.scene.tweens.add({
      targets: this.progressTip,
      x: tipX,
      duration: 500,
      repeat: 0,
      yoyo: false,
    });

    this.scene.tweens.add({
      targets: this.progressBar,
      width: width,
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
  }
}

export default BarComponent;
