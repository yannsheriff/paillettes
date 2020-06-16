import Curtains from "./Curtains"

class CurtainsComponent {
  private scene: Phaser.Scene;
  private curtains: Curtains;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.curtains = new Curtains(
      this.scene,
      "curtains",
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

export default CurtainsComponent;
