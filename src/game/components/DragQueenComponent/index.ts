import DragQueen from "./DragQueen";
import ScoreStateManager from "../../states/score";
import MainStateManager, { MainState, GameStatus } from "../../states/main";
import GodMother from "../../components/GodMotherComponent/GodMother";
import stepEventEmitter from "../../helpers/StepEventEmitter";
import { StepEventType } from "../../helpers/StepEventEmitter/gamepadListener";
import { Direction } from "../SheetMusicComponent/GridObject";

const Animations = [
  "Dance-left",
  "Dance-right",
  "Dance-up",
  "Dance-down",
  "Run",
  "Start",
];

class DragQueenManager {
  private scene: Phaser.Scene;
  private scoreManager: ScoreStateManager;
  private mainManager: MainStateManager;
  private dragQueen?: DragQueen;
  private divinelight?: GodMother;
  private isGameStarted: boolean;
  private isDragDancing: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.scoreManager = ScoreStateManager.getInstance();
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.onGameStatusChange(this.gameStatusChange);

    this.isGameStarted = false;
    this.isDragDancing = false;

    stepEventEmitter.on(StepEventType.stepdown, this.handleStepDown);
  }

  private create() {
    this.divinelight = new GodMother(
      this.scene,
      "godmother",
      "faisceau-start",
      false
    );

    this.dragQueen = new DragQueen(this.scene, "dragqueen", "Start", false);

    this.dragQueen.spine.state.addListener({
      start: () => {},
      complete: () => {
        this.onAnimationComplete(this.dragQueen!.spine);
      },
      event: () => {},
      interrupt: () => {},
      end: () => {},
      dispose: () => {},
    });

    setTimeout(() => {
      this.divinelight?.deleteGodMother();
    }, 2500);
  }

  private onAnimationComplete(spine: SpineGameObject) {
    let animationStart = spine.getCurrentAnimation(0);
    if ((animationStart !== undefined && animationStart.name) === "Start") {
      this.dragQueen?.playAnimation("Run", true);
      this.mainManager.runGame();
      this.isGameStarted = true;
    }
  }

  private handleStepDown = (directions: Direction[]) => {
    const direction = directions[0];
    if (this.isGameStarted && direction !== undefined && !this.isDragDancing) {
      let animation = "Dance-" + direction;
      this.isDragDancing = true;
      this.dragQueen?.playOnceThenLoopNextAnimation(animation, "Run", 0);

      setTimeout(() => {
        this.isDragDancing = false;
      }, 400);
    }
  };

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isLaunch:
        this.create();
        break;
      case GameStatus.isGameOver:
        stepEventEmitter.removeListener(
          StepEventType.stepdown,
          this.handleStepDown
        );
        break;

      default:
        break;
    }
  };
}

export default DragQueenManager;
