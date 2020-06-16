import FreestyleStateManager, {
  FreestyleState,
} from "../../states/freestyle";

import GodMother from "./GodMother"
import Align from "../../helpers/Align/align";

const animations = [
  "faisceau-start",
  "freestyle-begin",
  "freestyle-loop",
  "freestyle-end",
];

class GodMotherComponent {
  private scene: Phaser.Scene;
  private freestyleState: FreestyleState;
  private godMother?: GodMother;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const freeManager = FreestyleStateManager.getInstance();
    this.freestyleState = freeManager.state;
    freeManager.subscribe(this.stateChange);
  }

  private create() {
    this.godMother = new GodMother(
      this.scene,
      "godmother",
      "freestyle-begin",
      false
    )

    setTimeout(() => {
      this.godMother?.playAnimation("freestyle-loop", true)
    }, 2000);
  }
  private delete() {
    this.godMother?.playAnimation("freestyle-end", false)

    setTimeout(() => {
      this.godMother?.deleteGodMother()
    }, 2000);
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
