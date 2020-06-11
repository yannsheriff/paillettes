import DragQueen from "./DragQueen";
import ScoreStateManager from "../../states/score";
import GridObject from "../SheetMusicComponent/GridObject";

class DragQueenManager {
    private scene: Phaser.Scene;
    private dragQueen?: DragQueen;
    private scoreManager: ScoreStateManager;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.scoreManager = ScoreStateManager.getInstance()
      this.scoreManager.onSuccess(this.danseDragQueen)

      this.create();
    }
  
    private create() {
      this.dragQueen = new DragQueen(
        this.scene,
        "dragqueen",
        "Run",
        true
      );
    }

    public danseDragQueen = (callback: GridObject) => {
      // switch callback.direction
    }

  
  
  }
  
  export default DragQueenManager;
  