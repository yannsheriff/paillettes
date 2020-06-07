import FreestyleStateManager, {
  FreeLetter,
  FreestyleState,
} from "../../../states/freestyle";

type light = {
  name: string;
  sprite?: Phaser.GameObjects.Sprite;
};
const letterArray = [FreeLetter.F, FreeLetter.R, FreeLetter.E1, FreeLetter.E2];

class FreeLights {
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;
  private scale: number;
  private radius: number;
  private lights: Map<FreeLetter, light>;
  private F?: Phaser.GameObjects.Image;
  private R?: Phaser.GameObjects.Image;
  private E1?: Phaser.GameObjects.Image;
  private E2?: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    inputZoneWidth: number,
    scale: number
  ) {
    this.scene = scene;
    this.posX = x;
    this.radius = inputZoneWidth / 2 + 35;
    this.posY = y;
    this.scale = scale;

    this.lights = new Map([
      [FreeLetter.F, { name: "F_", sprite: undefined }],
      [FreeLetter.R, { name: "R_", sprite: undefined }],
      [FreeLetter.E1, { name: "E1_", sprite: undefined }],
      [FreeLetter.E2, { name: "E2_", sprite: undefined }],
    ]);

    this.create();
    FreestyleStateManager.getInstance().subscribe(this.stateChange);
  }

  private create() {
    this.lights.forEach((light: light, index) => {
      light.sprite = this.scene.physics.add
        .sprite(this.posX + 50 * index, this.posY, light.name + "OFF")
        .setDepth(12)
        .setScale(this.scale);
    });
  }

  private stateChange = (state: FreestyleState) => {
    if (state.isFreestyleActivated) {
      this.lights.forEach((light: light) => {
        light.sprite?.anims.play(light.name + "FREE");
      });
    } else {
      const letterOn = letterArray.filter(
        (l) =>
          state.remainingLetters.find((remaining) => remaining === l) ===
          undefined
      );
      this.turnOffLights();
      letterOn.forEach((letter) => {
        const light = this.lights.get(letter);
        light?.sprite?.anims.play(light.name + "ON");
      });
    }
  };

  private turnOffLights = () => {
    this.lights.forEach((light: light) => {
      light.sprite?.anims.play(light.name + "OFF");
    });
  };
}

export default FreeLights;
