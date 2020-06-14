import DragQueen from "./DragQueen";
import ScoreStateManager from "../../states/score";
import GridObject from "../SheetMusicComponent/GridObject";
import MainStateManager, { MainState, Worlds } from "../../states/main";
import GodMother from "../../components/GodMotherComponent/GodMother";

class DragQueenManager {
    private scene: Phaser.Scene;
    private scoreManager: ScoreStateManager;
    private mainState: MainState;
    private mainManager: MainStateManager;
    private dragQueen?: DragQueen;
    private godMother?: GodMother;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.scoreManager = ScoreStateManager.getInstance()
      this.scoreManager.onSuccess(this.danseDragQueen)
      this.mainManager = MainStateManager.getInstance();
      this.mainManager.subscribe(this.onMainStateChange);
      this.mainState = this.mainManager.state;
    }
  
    private create() {
      this.godMother = new GodMother(
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
      }, 2000);

      // this.dragQueen?.playOnceThenLoopNextAnimation("Start", "Run", 0)
    }

    private onMainStateChange = (state: MainState) => {
      if (state.isGameLaunch !== this.mainState.isGameLaunch) {
        this.create()
      }
    }

    public danseDragQueen = (callback: GridObject) => {
      let animation = "Dance-" + callback.direction;
      this.dragQueen?.playOnceThenLoopNextAnimation(animation, "Run", 0)
    }

  
  
  }
  
  export default DragQueenManager;
  