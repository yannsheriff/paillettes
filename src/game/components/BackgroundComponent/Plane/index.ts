import Align from "../../../helpers/Align/align";

export enum PlaneSpace {
  third = 3,
  second = 2,
  first = 1
}

const mappingDepthPlanes = [3, 2, 1];

class Plane extends Phaser.GameObjects.Sprite {
  public planeBody: Phaser.Physics.Arcade.Body;
  public speed: number;
  public planeNb: PlaneSpace;
  public mappingPlane: number; // used to set depth, speed, increment etc 

  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string = "",
    frame: string = "",
    plane: number,
    globalspeed: number = 1,
    isAlreadyInScene: boolean = false
  ) {
    super(scene, x, y, texture, frame);

    this.planeNb = plane;
    this.mappingPlane = mappingDepthPlanes[plane - 1]

    this.speed = globalspeed * this.mappingPlane;

    this.setDepth(this.mappingPlane);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    if (this.planeNb === 2) {
      this.setScale(1.2);
    } else if (this.planeNb === 3) {
      this.setScale(1.3);
    } else {
      this.setScale(1);
    }

    if (!isAlreadyInScene) {
      Align.outsideRight(this);
    } else {
      Align.outsideRight(this);
      // to do
      // Align.left(this);
    }

    this.centerBottom();

    this.planeBody = this.body as Phaser.Physics.Arcade.Body;

    this.movePlane();
  }

  private centerBottom() {
    // don't know if we will use this : - this.planeNb * 30
    this.y = 500 - this.displayHeight / 2;
    // this.y = window.innerHeight / 2 - this.displayHeight / 2;
  }

  public movePlane() {
    this.planeBody.setVelocityX(-this.speed);
  }

  public stopPlane() {
    this.planeBody.setVelocityX(0);
  }

  public updatePlaneSpeed(newSpeed: number) {
    this.speed = newSpeed * this.mappingPlane;
    this.planeBody.setVelocityX(-this.speed);
  }

  public deletePlane() {
    this.destroy();
  }
}

export default Plane;
