import FreestyleStateManager, {
  FreestyleState,
} from "../../states/freestyle";

import GodMother from "./GodMother"
import Align from "../../helpers/Align/align";

const animations = [
  "faisceau-start",
  "freestyle-loop",
  "freestyle-begin",
  "freestyle-end",

];

class GodMotherComponent {
  private scene: Phaser.Scene;
  private freestyleState: FreestyleState;
  // private godMother: GodMother;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    freeManager.subscribe(this.stateChange);

    // this.godMother = new GodMother(
    //   this.scene,
    //   "godmother",
    //   "faisceau-start",
    //   false
    // )
  }

  private create() {
    // this.mother.play("god-mother-in");
    // this.mother.once("animationcomplete", () => {
    //   this.mother?.play("god-mother-loop");
    // });
  }
  private delete() {
  }

  private stateChange = (state: FreestyleState) => {
    if (
      this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
    ) {
      if (state.isFreestyleActivated) {
        this.create();
      } else {
        this.delete();
      }
    }

    this.freestyleState = state;
  };
}

export default GodMotherComponent;
