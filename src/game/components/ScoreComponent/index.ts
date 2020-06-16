import Score from "./Score"
import Align from "../../helpers/Align/align";

class ScoreComponent {
  private scene: Phaser.Scene;
  private scoreSpine: Score;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.scoreSpine = new Score(
      this.scene,
      "score",
      "faisceau-start",
      false
    )
  }

  private create() {
    // this.mother.play("god-mother-in");
    // this.mother.once("animationcomplete", () => {
    //   this.mother?.play("god-mother-loop");
    // });
  }
  private delete() {
  }
}

export default ScoreComponent;
