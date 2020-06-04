import Align from "../../../helpers/Align/align";

export enum PlaneSpace {
  first,
  second,
  third
}

class Plane extends Phaser.GameObjects.Sprite {
  public planeBody: Phaser.Physics.Arcade.Body;
  public speed: number;
  public planeSpace: PlaneSpace;
  public mappingPlane: number; // used to set depth, speed, increment etc 
  private mapPlane: Map<PlaneSpace, number> = new Map(
    [
      [PlaneSpace.first, 3],
      [PlaneSpace.second, 2],
      [PlaneSpace.third, 1] 
    ]);
  
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string = "",
    frame: string = "",
    planeSpace: PlaneSpace,
    globalspeed: number = 1,
    isAlreadyInScene: boolean = false
  ) {
    super(scene, x, y, texture, frame);

    this.planeSpace = planeSpace
    // @ts-ignore
    this.mappingPlane = this.mapPlane.get(this.planeSpace)

    this.speed = globalspeed * this.mappingPlane;

    this.setDepth(this.mappingPlane);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    if (this.planeSpace === PlaneSpace.second) {
      this.setScale(1.2);
    } else if (this.planeSpace === PlaneSpace.third) {
      this.setScale(1.3);
    } else {
      this.setScale(1);
    }

    if (!isAlreadyInScene) {
      Align.outsideRight(this);
    } else {
      Align.center(this);
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
