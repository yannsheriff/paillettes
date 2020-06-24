import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";
import MainStateManager, { GameStatus } from "../../../states/main";

function formatToSeconds(ms: number): string {
  const sec = Math.round(ms / 1000).toString();
  return sec.length > 1 ? sec : "0" + sec;
}

class Chrono {
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;
  private time?: Phaser.GameObjects.Text;
  private scale: number;
  private icon?: Phaser.GameObjects.Image;
  private chrono?: NodeJS.Timeout | undefined;
  private freestyleState: FreestyleState;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    this.scene = scene;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    MainStateManager.getInstance().onGameStatusChange(this.gameStatusChange);
    freeManager.subscribe(this.stateChange);
  }

  private create(time: number) {
    this.icon = this.scene.add
      .image(this.posX, this.posY, "chrono")
      .setScale(this.scale)
      .setDepth(11);
    this.time = this.scene.add.text(
      this.posX + 20,
      this.posY - 10,
      (time / 1000).toString() + " sec",
      {
        fontFamily: "LondrinaSolid",
        fontStyle: "",
        fontSize: "20px",
        color: "#fff",
        align: "center", // 'left'|'center'|'right'|'justify'
      }
    );

    this.lauchChrono(new Date().getTime() + time);
    this.time.setDepth(12);
  }
  private delete() {
    this.time?.destroy();
    this.icon?.destroy();
  }

  lauchChrono = (endTime: number) => {
    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = formatToSeconds(sub);
      this.time?.setText(seconds.toString() + " sec");

      if (sub <= 0) {
        clearInterval(this.chrono!);
        this.delete();
      }
    }, 50);
  };

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isGameOver:
        if (this.chrono !== undefined) {
          clearInterval(this.chrono);
        }
        break;

      default:
        break;
    }
  };

  private stateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.create(state.freestyleDuration);
      } else {
        this.delete();
      }
    }

    this.freestyleState = state;
  };
}

export default Chrono;
