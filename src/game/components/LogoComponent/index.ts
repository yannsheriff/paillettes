import Align from "../../helpers/Align/align";
import MainStateManager, { MainState, GameStatus } from "../../states/main";
import stepEventEmitter from "../../helpers/StepEventEmitter";
import { StepEventType } from "../../helpers/StepEventEmitter/gamepadListener";

class LogoComponent {
  private scene: Phaser.Scene;
  private animation?: Phaser.Physics.Arcade.Sprite;
  private isLeftPressed: boolean;
  private isRightPressed: boolean;
  private mainManager: MainStateManager;
  private mainState: MainState;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.isLeftPressed = true;
    this.isRightPressed = false;

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    stepEventEmitter.on(StepEventType.stepdown, (directions: Array<string>) => {
      if (directions.find((d) => d === "left")) {
        this.isLeftPressed = true;
      }
      if (directions.find((d) => d === "right")) {
        this.isLeftPressed = true;
      }

      if (this.isLeftPressed && this.isRightPressed) {
        this.lauchChrono(new Date().getTime() + 3000);
      }
    });

    stepEventEmitter.on(StepEventType.stepup, (directions: Array<string>) => {
      if (directions.find((d) => d === "left")) {
        this.isLeftPressed = false;
      }
      if (directions.find((d) => d === "right")) {
        this.isLeftPressed = false;
      }
    });

    this.create();
  }

  private create() {
    this.animation = this.scene.physics.add.sprite(0, 400 * 0.8, "logo-in");

    this.animation.setScale(0.8);
    this.animation.setDepth(51);

    Align.centerH(this.animation);

    setTimeout(() => {
      this.animation!.anims.play("logo-in");
    }, 1000);
  }

  lauchChrono = (endTime: number) => {
    const chrono = setInterval(() => {
      if (this.isLeftPressed && this.isRightPressed) {
        const now = new Date().getTime();
        const sub = endTime - now;
        const seconds = formatToPercent(sub);

        if (sub <= 0) {
          clearInterval(chrono);
          MainStateManager.getInstance().launchGame();
        }
      } else {
        clearInterval(chrono);
      }
    }, 50);
  };

  private onMainStateChange = (state: MainState) => {
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.willLaunch
    ) {
      this.animation!.anims.play("logo-out");
    }

    this.mainState = state;
  };
}

export default LogoComponent;

function formatToPercent(ms: number): string {
  const sec = Math.round(ms / 1000).toString();
  return sec.length > 1 ? sec : "0" + sec;
}
