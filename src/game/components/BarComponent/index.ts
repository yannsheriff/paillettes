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
  const tipX = window.innerWidth / 2 - mainBarWidth / 2 + width - 30;

  return { width, posX, tipX };
}

class BarComponent {
  private scene: Phaser.Scene;
  private scale: number;
  private bar?: Phaser.GameObjects.Image;
  private progressBar?: Phaser.GameObjects.Rectangle;
  private text?: Phaser.GameObjects.Text;
  private moneyText?: Phaser.GameObjects.Text;
  private moneyAlreadyFounded: number;
  private moneyByCharacter: number;
  private charcterCount: number;
  private posY: number;
  private progressValue: number;
  private progressIncrement: number;
  private progressTip?: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, scale: number) {
    this.scene = scene;
    this.scale = scale;
    this.charcterCount = 0;
    this.moneyAlreadyFounded = 15;
    this.posY = window.innerHeight * 0.8;

    const totalMoney = 50;
    this.progressValue = (this.moneyAlreadyFounded / totalMoney) * 100;

    const unlockedCherLength = ScoreStateManager.getInstance().state
      .charactersUnlocked.length;

    const unlockedMoney = (unlockedCherLength * 0.5) / 200 + 4.5;

    this.moneyByCharacter = unlockedMoney / unlockedCherLength;
    this.progressIncrement = (this.moneyByCharacter / totalMoney) * 100;
    this.create();
  }

  create() {
    this.bar = this.scene.add
      .image(0, this.posY, "Bar")
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
        this.posY,
        width,
        20,
        Phaser.Display.Color.GetColor(255, 255, 255)
      )
      .setDepth(13);

    this.progressTip = this.scene.add
      .sprite(tipX, this.posY, "loaderTip-on")
      .setScale(this.scale)
      .setDepth(13);

    // this.progressTip?.play("logo-in");

    this.text = this.scene.add
      .text(
        window.innerWidth / 2 + BarWidth / 2 - 270,
        this.posY - 50,
        "0 Personnages",
        {
          fontFamily: "RockhillSansRough",
          fontSize: "20px",
          fontStyle: "",
          color: "#fff",
          align: "center",
        }
      )
      .setDepth(13);

    this.moneyText = this.scene.add
      .text(
        window.innerWidth / 2 - 60,
        this.posY + 40,
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
          .format(this.moneyAlreadyFounded)
          .toString(),
        {
          fontFamily: "RockhillSansRough",
          fontSize: "31px",
          fontStyle: "",
          fixedWidth: 120,
          color: "#fff",
          align: "center",
        }
      )
      .setDepth(13);

    this.scene.add
      .text(
        window.innerWidth / 2 - BarWidth / 2 + 130,
        this.posY - 70,
        "SOMME TOTALE RÉCOLTÉ",
        {
          fontFamily: "RockhillSansRough",
          fontSize: "31px",
          fontStyle: "",
          color: "#fff",
          align: "center",
        }
      )
      .setDepth(13);
  }

  public increment() {
    this.progressValue += this.progressIncrement;
    this.moneyAlreadyFounded += this.moneyByCharacter;
    this.charcterCount++;
    this.progressTip?.play("loaderTip-on");

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
    this.moneyText?.setText(
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
        .format(this.moneyAlreadyFounded)
        .toString()
    );
  }
}

export default BarComponent;
