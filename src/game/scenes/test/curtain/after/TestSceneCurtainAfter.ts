import config from "./config";
import Curtains from "../../../../components/CurtainsComponent/Curtains";

export class TestSceneCurtainBefore extends Phaser.Scene {
  private curtains?: Curtains;

  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    alert('scene 2')
    this.curtains = new Curtains(this, "curtains", "02_Ouverture", false);
  }

  public update() {}
}

export default TestSceneCurtainBefore;
