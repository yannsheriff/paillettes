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
  private pointsText?: Phaser.GameObjects.Text;
  private moneyText?: Phaser.GameObjects.Text;
  private moneyAlreadyFounded: number;
  private moneyByCharacter: number;
  private pointsByCharacter: number;
  private posY: number;
  private progressValue: number;
  private progressIncrement: number;
  private progressTip?: Phaser.GameObjects.Sprite;
  private totalPoints: number = 0;
  private fontSizeOrigin: number = 20;
  private maxFontSize: number = 30;
  private currentFontSize: number = this.fontSizeOrigin;
  private fontSizeStep: number = 0;
  private unlockedCharLength: number = 0;
  private sceneEndCallback: () => void;

  constructor(
    scene: Phaser.Scene,
    scale: number,
    sceneEndCallback: () => void
  ) {
    this.scene = scene;
    this.scale = scale;
    this.sceneEndCallback = sceneEndCallback;
    this.moneyAlreadyFounded = 15;
    this.posY = window.innerHeight * 0.7;

    const totalMoney = 50;
    this.progressValue = (this.moneyAlreadyFounded / totalMoney) * 100;

    this.unlockedCharLength = ScoreStateManager.getInstance().state.charactersUnlocked.length;

    const finalScore = ScoreStateManager.getInstance().state.score;

    const unlockedMoney = (this.unlockedCharLength * 0.5) / 200 + 4.5;

    this.pointsByCharacter = finalScore / this.unlockedCharLength;
    this.moneyByCharacter = unlockedMoney / this.unlockedCharLength;
    this.fontSizeStep = 12 / this.unlockedCharLength; // max font size = fontSizeOrigin + 12

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

    this.pointsText = this.scene.add
      .text(
        window.innerWidth / 2 + BarWidth / 2 - 150,
        this.posY - 30,
        "0 POINTS",
        {
          fontFamily: "LondrinaSolid",
          fontSize: "20px",
          fontStyle: "",
          color: "#fff",
          align: "center",
        }
      )
      .setOrigin(1, 1)
      .setDepth(13);

    this.moneyText = this.scene.add
      .text(
        window.innerWidth / 2 + BarWidth / 2 - 150,
        this.posY + 30,
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
          .format(this.moneyAlreadyFounded)
          .toString(),
        {
          fontFamily: "LondrinaSolid",
          fontSize: "31px",
          fontStyle: "",
          // fixedWidth: 120,
          color: "#fff",
          align: "center",
        }
      )
      .setOrigin(1, 0)
      .setDepth(13);

    this.scene.add
      .text(
        window.innerWidth / 2 - BarWidth / 2 + 150,
        this.posY - 70,
        "CAGNOTTE TOTALE",
        {
          fontFamily: "LondrinaSolid",
          fontSize: "31px",
          fontStyle: "",
          color: "#fff",
          align: "center",
        }
      )
      .setDepth(13);
  }

  // first we increments points counter
  public incrementPoints(increment: boolean) {
    if (this.pointsByCharacter > 0) {
      if (increment) {
        this.totalPoints += Math.round(this.pointsByCharacter);
        this.currentFontSize += this.fontSizeStep;
      } else {
        this.totalPoints -= Math.round(this.pointsByCharacter);
        this.currentFontSize -= this.fontSizeStep;
      }
      this.pointsText
        ?.setText(this.totalPoints + " POINTS")
        .setFontSize(this.currentFontSize);
    }
  }

  public launchInterval() {
    const interval = 5000 / this.unlockedCharLength;
    let i = 0;
    let setinterval = setInterval(() => {
      if (i < this.unlockedCharLength) {
        this.incrementMoney();
        this.incrementPoints(false);
      } else {
        clearInterval(setinterval);
        this.sceneEndCallback();
      }
      i += 1;
    }, interval);
  }

  // then we decrement points and increment money
  public incrementMoney() {
    this.progressValue += this.progressIncrement;
    this.moneyAlreadyFounded += this.moneyByCharacter;
    // this.characterCount++;
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

    // this.text?.setText(this.characterCount.toString() + " Personnages");
    this.moneyText?.setText(
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
        .format(this.moneyAlreadyFounded)
        .toString()
    );
  }
}

export default BarComponent;
