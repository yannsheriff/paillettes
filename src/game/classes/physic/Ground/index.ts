class Ground extends Phaser.GameObjects.Image {
  public ground?: Phaser.GameObjects.Image;
  private grounds: Phaser.GameObjects.Image[];
  private groundsAngles: number[];
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    img: string = ""
  ) {
    super(scene, x, y, img);

    this.groundsAngles = [];
    this.grounds = [];

    const baseAngle = 264;
    const separtationAngle = 2.6;

    for (let index = 0; index < 5; index++) {
      const groundAngle = baseAngle + separtationAngle * index;
      const angleI = groundAngle * (Math.PI / 180);
      const ground = scene.add
        .image(
          window.innerWidth / 2 + 8044 * Math.cos(angleI),
          8650 + 8044 * Math.sin(angleI),
          "sol"
        )
        .setAngle(groundAngle + 90);

      this.groundsAngles.push(groundAngle);
      this.grounds.push(ground);
    }
  }

  public update() {
    this.grounds.forEach((ground, index) => {
      const angle = (this.groundsAngles[index] -= 0.01);
      const radians = angle * (Math.PI / 180);
      ground
        .setPosition(
          window.innerWidth / 2 + 8044 * Math.cos(radians),
          8650 + 8044 * Math.sin(radians)
        )
        .setAngle(angle + 90);
    });
  }
}

export default Ground;
