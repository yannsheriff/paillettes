import { EventEmitter } from "events";
import Bar from "./bar";

class SheetVerticalBar {
  private scene: Phaser.Scene;
  private lines: Phaser.GameObjects.Image[];
  private posY: number;
  private speed: number;
  private inputZone: Phaser.GameObjects.Image;
  private eventEmitter: EventEmitter;

  constructor(
    scene: Phaser.Scene,
    x: number = 1020,
    y: number = 700,
    eventEmitter: EventEmitter,
    inputZone: Phaser.GameObjects.Image,
    speed: number
  ) {
    this.scene = scene;
    this.inputZone = inputZone;
    this.eventEmitter = eventEmitter;
    this.posY = y;
    this.lines = [];
    this.speed = speed;
    this.create();
  }

  private create = () => {
    this.eventEmitter.on("tick", this.launchLine);
    this.scene.physics.add.overlap(
      this.lines,
      this.inputZone,
      this.handleLineOverlap,
      () => true,
      this
    );
  };

  private launchLine = (arg: any) => {
    const bar = new Bar(this.scene, this.speed, window.innerWidth, undefined);
    this.lines.push(bar);
  };

  private handleLineOverlap = (line: Phaser.GameObjects.Line) => {
    line.destroy();
    this.lines.shift();
  };
}

export default SheetVerticalBar;
