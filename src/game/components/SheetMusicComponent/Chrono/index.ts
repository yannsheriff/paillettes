import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

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
  private freestyleState: FreestyleState;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    this.scene = scene;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
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
    const chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = formatToSeconds(sub);
      this.time?.setText(seconds.toString() + " sec");

      if (sub <= 0) {
        clearInterval(chrono);
        this.delete();
      }
    }, 50);
  };

  private stateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.create(state.freestyleDuration);
        console.log("Create");
      } else {
        this.delete();
      }
    }

    this.freestyleState = state;
  };
}

export default Chrono;
