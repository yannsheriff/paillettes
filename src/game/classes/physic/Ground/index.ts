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

    for (let index = 0; index < 6; index++) {
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
      if (angle < 262) {
        this.moveGroundBack(index);
        return;
      }
      const radians = angle * (Math.PI / 180);
      ground
        .setPosition(
          window.innerWidth / 2 + 8044 * Math.cos(radians),
          8750 + 8044 * Math.sin(radians)
        )
        .setAngle(angle + 90);
    });
  }

  private moveGroundBack(index: number) {
    // this.grounds[index].destroy();
    this.grounds.push(this.grounds[index]);
    this.grounds.shift();
    const newAngle = this.groundsAngles[this.groundsAngles.length - 1] + 2.6;
    this.groundsAngles.push(newAngle);
    this.groundsAngles.shift();
    console.log(newAngle);
  }
}

export default Ground;
