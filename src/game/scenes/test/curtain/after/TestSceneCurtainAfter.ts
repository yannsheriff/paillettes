import config from "./config";
import Score from "../../../../components/ScoreComponent/Score";

export class TestSceneCurtainBefore extends Phaser.Scene {
  private score?: Score;

  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    alert('scene 2')
    this.score = new Score(this, "score", "02_Ouverture", false);
  }

  public update() {}
}

export default TestSceneCurtainBefore;
