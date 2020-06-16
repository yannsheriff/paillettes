import Align from "../../helpers/Align/align";
import ScoreStateManager from "../../states/score";

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
  private text?: Phaser.GameObjects.Text;
  private charcterCount: number;
  private progressValue: number;
  private progressIncrement: number;
  private progressTip?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, scale: number) {
    this.scene = scene;
    this.scale = scale;
    this.charcterCount = 15;
    const moneyAlreadyFounded = 15;
    const totalMoney = 50;
    this.progressValue = (moneyAlreadyFounded / totalMoney) * 100;

    const unlockedCherLength = ScoreStateManager.getInstance().state
      .charactersUnlocked.length;

    const unlockedMoney = (unlockedCherLength * 0.5) / 200 + 4.5;

    const moneyBayCharacter = unlockedMoney / unlockedCherLength;
    this.progressIncrement = (moneyBayCharacter / totalMoney) * 100;
    this.create();
  }

  create() {
    this.bar = this.scene.add
      .image(0, window.innerHeight * 0.8, "Bar")
      .setScale(this.scale)
      .setDepth(13);
    Align.centerH(this.bar);

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

    this.text = this.scene.add
      .text(
        window.innerWidth / 2 + BarWidth / 2 - 270,
        window.innerHeight * 0.8 - 50,
        "0 Personnages",
        {
          fontFamily: "LondrinaSolid",
          fontSize: "20px",
          fontStyle: "",
          color: "#fff",
          align: "center",
        }
      )
      .setDepth(13);
  }

  public increment() {
    this.progressValue += this.progressIncrement;
    this.charcterCount++;

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

    this.text?.setText(this.charcterCount.toString() + " Personnages");
  }
}

export default BarComponent;
