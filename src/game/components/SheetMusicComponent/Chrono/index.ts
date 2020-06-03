import FreestyleStateManager, {
  FreestyleState,
} from "../../../states/freestyle";

const BACKGROUND_RADIUS = 106 / 2;

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
  private background?: Phaser.GameObjects.Shape;
  private freestyleState: FreestyleState;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    radius: number,
    scale: number
  ) {
    this.scene = scene;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    console.log("Chrono -> scale", scale);
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    freeManager.subscribe(this.stateChange);
    // this.create(freeManager.state.freestyleDuration);
  }

  private create(time: number) {
    this.background = this.scene.add
      .circle(
        this.posX,
        this.posY,
        BACKGROUND_RADIUS * this.scale,
        Phaser.Display.Color.HexStringToColor("#6f6885").color
      )
      .setDepth(12);

    this.time = this.scene.add.text(
      this.posX - 20,
      this.posY - 20,
      (time / 1000).toString(),
      {
        fontFamily: "LondrinaSolid",
        fontStyle: "",
        fontSize: "40px",
        color: "#fff",
        align: "center", // 'left'|'center'|'right'|'justify'
        depth: 11,
      }
    );

    this.lauchChrono(new Date().getTime() + time);
    this.time.setDepth(12);
  }
  private delete() {
    this.time?.destroy();
    this.background?.destroy();
  }

  lauchChrono = (endTime: number) => {
    const chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = formatToSeconds(sub);
      this.time?.setText(seconds.toString());

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
