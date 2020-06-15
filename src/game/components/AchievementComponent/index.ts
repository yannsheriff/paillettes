import Achievement from "./Achievement"

class AchievementManager {
    private scene: Phaser.Scene;
    private achivement?: Achievement;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.create();
    }
  
    private create() {
      this.achivement = new Achievement(
        this.scene,
        "dragqueen",
        "Run",
        true
      );
    }
  }
  
  export default AchievementManager;
  