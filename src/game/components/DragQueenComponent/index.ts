import DragQueen from "./DragQueen";
import ScoreStateManager from "../../states/score";
import MainStateManager, { MainState } from "../../states/main";
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
  "Start"
]

class DragQueenManager {
    private scene: Phaser.Scene;
    private scoreManager: ScoreStateManager;
    private mainState: MainState;
    private mainManager: MainStateManager;
    private dragQueen?: DragQueen;
    private divinelight?: GodMother;
    private isGameStarted: boolean = false;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.scoreManager = ScoreStateManager.getInstance()
      // this.scoreManager.onSuccess(this.danseDragQueen)
      this.mainManager = MainStateManager.getInstance();
      this.mainManager.subscribe(this.onMainStateChange);
      this.mainState = this.mainManager.state;

      stepEventEmitter.on(StepEventType.stepdown, this.handleStepDown);
    }
  
    private create() {
      this.divinelight = new GodMother(
        this.scene,
        "godmother",
        "faisceau-start",
        false
      )

      this.dragQueen = new DragQueen(
        this.scene,
        "dragqueen",
        "Start",
        false
      );

      setTimeout(() => {
        this.dragQueen?.playAnimation("Run", true)
        this.divinelight?.deleteGodMother()
        this.isGameStarted = true
      }, 2000);

      // this.dragQueen?.playOnceThenLoopNextAnimation("Start", "Run", 0)
    }


    handleStepDown = (directions: Direction[]) => {
      // TO DO METTRE UNE CONDITION SUR LE TYPE DE LA DIRECTION
      directions.forEach((direction) => {
        let animation = "Dance-" + direction;
        if (this.isGameStarted) {
          this.dragQueen?.playOnceThenLoopNextAnimation(animation, "Run", 0)
        }
      });
    };

    // public danseDragQueen = (callback: GridObject) => {
    // }


    private onMainStateChange = (state: MainState) => {
      if (state.isGameLaunch !== this.mainState.isGameLaunch) {
        this.create()
      }
      this.mainState = state;
    } 
  
  }
  
  export default DragQueenManager;
  