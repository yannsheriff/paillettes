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
  private animIsPlaying: boolean;
  private mainState: MainState;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.isLeftPressed = false;
    this.isRightPressed = false;
    this.animIsPlaying = false;

    this.mainManager = MainStateManager.getInstance();
    this.mainManager.onGameStatusChange(this.gameStatusChange);
    this.mainManager.subscribe((s) => (this.mainState = s));
    this.mainState = this.mainManager.state;

    stepEventEmitter.on(StepEventType.stepdown, (directions: Array<string>) =>
      this.onPress(StepEventType.stepdown, directions)
    );

    stepEventEmitter.on(StepEventType.stepup, (directions: Array<string>) =>
      this.onPress(StepEventType.stepup, directions)
    );

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

  launchAnim = () => {
    if (!this.animIsPlaying) {
      this.animIsPlaying = true;
      this.animation!.anims.play("logo-load").once("animationcomplete", () => {
        if (this.animIsPlaying) MainStateManager.getInstance().launchGame();
      });
    }
  };

  killAnim = () => {
    if (this.animIsPlaying) {
      this.animIsPlaying = false;
      this.animation!.anims.play("logo-static");
    }
  };

  private onPress = (stepType: StepEventType, directions: Array<string>) => {
    if (this.mainState.gameStatus === GameStatus.isReady) {
      if (stepType === StepEventType.stepdown) {
        if (directions.find((d) => d === "left")) {
          this.isLeftPressed = true;
        }
        if (directions.find((d) => d === "right")) {
          this.isRightPressed = true;
        }

        if (this.isLeftPressed && this.isRightPressed) {
          this.launchAnim();
        }
      } else {
        if (directions.find((d) => d === "left")) {
          this.isLeftPressed = false;
        }
        if (directions.find((d) => d === "right")) {
          this.isRightPressed = false;
        }

        if (!this.isLeftPressed || !this.isRightPressed) {
          this.killAnim();
        }
      }
    }
  };

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.willLaunch:
        this.animation!.anims.play("logo-out");
        break;
      case GameStatus.waitMusicLoading:
        this.animation!.anims.play("logo-in");
        break;

      default:
        break;
    }
  };
}

export default LogoComponent;
