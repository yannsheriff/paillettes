import config from "./config";
import CharactersComponent from "../../../components/CharactersComponent";

export class TestSceneSpine extends Phaser.Scene {
  public PhysicCharacterManager?: CharactersComponent;

  constructor() {
    super(config);
  }

  public preload(): void {
    // man 1
    this.load.setPath("assets/spine/world1/man1/");
    this.load.spine(
      "world_1_man_1",
      "world_1_man_1.json",
      "world_1_man_1.atlas"
    );
    // man 2
    this.load.setPath("assets/spine/world1/man2/");
    this.load.spine(
      "world_1_man_2",
      "world_1_man_2.json",
      "world_1_man_2.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman1/");
    this.load.spine(
      "world_1_woman_1",
      "world_1_woman_1.json",
      "world_1_woman_1.atlas"
    );
    // woman 1
    this.load.setPath("assets/spine/world1/woman2/");
    this.load.spine(
      "world_1_woman_2",
      "world_1_woman_2.json",
      "world_1_woman_2.atlas"
    );
  }

  public create() {
    this.PhysicCharacterManager = new CharactersComponent(this);

    this.add
      .text(50, 50, "Ajouter un nouveau personnage", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.generateNewPhysicCharacter('');
      });

    this.add
      .text(50, 80, "Jouer animation de transformation", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playTransformation("");
      });

    this.add
      .text(50, 110, "Les faire tous danser", { fill: "red" })
      .setInteractive()
      .on("pointerdown", () => {
        this.PhysicCharacterManager?.playAllDance();
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
        this.PhysicCharacterManager?.playDanseThenRun();
      });
  }
  public update() {}
}

export default TestSceneSpine;
