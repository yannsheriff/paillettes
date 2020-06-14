import GodMother from "./GodMother"

class GodMotherManager {
    private scene: Phaser.Scene;
    private godMother?: GodMother;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.create();
    }
  
    private create() {
      this.godMother = new GodMother(
        this.scene,
        "dragqueen",
        "Run",
        true
      );
    }
  }
  
  export default GodMotherManager;
  