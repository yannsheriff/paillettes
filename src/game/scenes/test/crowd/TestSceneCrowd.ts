import config from "./config";
import CharactersComponent from "../../../components/CharactersComponent";
import DragQueen from "../../../components/DragQueenComponent/DragQueen";

export class TestSceneCrowd extends Phaser.Scene {
  public PhysicCharacterManager?: CharactersComponent;
  public characterAssets: Array<string> = []

  constructor() {
    super(config);
  }

  public preload(): void {
    
    for (let world = 1; world <= 4; world++) {
      for (let spine = 1; spine <= 2; spine++) {
        this.load.setPath("assets/spine/world" + world + "/man" + spine + "/");
        this.load.spine(
          "world_" + world + "_man_" + spine,
          "world_" + world + "_man_" + spine + ".json",
          "world_" + world + "_man_" + spine + ".atlas"
        );

        this.load.setPath("assets/spine/world" + world + "/woman" + spine + "/");
        this.load.spine(
          "world_" + world + "_woman_" + spine,
          "world_" + world + "_woman_" + spine + ".json",
          "world_" + world + "_woman_" + spine + ".atlas"
        );

        this.characterAssets.push("world_" + world + "_woman_" + spine)
        this.characterAssets.push("world_" + world + "_man_" + spine)
      }      
    }
    // drag queen
    this.load.setPath("assets/spine/dragqueen/");
    this.load.spine("dragqueen", "dragqueen.json", "dragqueen.atlas");
  }
  public create() {
    let dragQueen = new DragQueen(
      this,
      "dragqueen",
      "Run",
      true
    );
    this.PhysicCharacterManager = new CharactersComponent(this);

    this.add
      .text(50, 50, "Ajouter un nouveau personnage", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.generateTestPhysicCharacter(this.characterAssets);
      });

    this.add
      .text(50, 80, "Jouer animation de transformation", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playTransformation();
      });

    this.add
      .text(50, 110, "Les faire tous danser", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playAllDance(false);
      });

    this.add
      .text(50, 140, "Les faire tous défiler", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playAllRun();
      });

    this.add
      .text(50, 170, "Les faire danser puis défiler", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playAllDanseThenRun();
      });
  }
  public update() {}
}

export default TestSceneCrowd;
