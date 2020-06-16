import Align from "../../../helpers/Align/align";
import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene;
  public planeY: number = 0;
  public id: string;
  public speedIn: number;
  public speedOut: number = 30;
  public tweenIn?: Phaser.Tweens.Tween;
  public tweenOut?: Phaser.Tweens.Tween;
  public scale: number = 0.5;
  public positionInCrowd: number = 0;
  public crowdPositionX: number = window.innerWidth / 2 - 200;
  public isUnlock: boolean = false;
  public distanceBetweenCharacters: number = 40;
  public isDestroyed: boolean = false; // to do 
  private destroyCallback: (id: string) => void

  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    id: string,
    speed: number,
    destroyCallback: (id: string) => void,
    loop: boolean = false,
    runAnimation: boolean = false,
    isDebug: boolean = false,
    positionInCrowd: number = 0,
  ) {
    super(scene, 0, 0, key, anim, loop);
    this.id = id;
    this.scene = scene;
    this.speedIn = speed;
    this.destroyCallback = destroyCallback;

    scene.add.existing(this);

    // apply default skin to character
    this.applyDefaultSkin(false);

    this.mixAnimation("Transition", "Run");
    this.mixAnimation("Run", "Dance");
    this.mixAnimation("Dance", "Run");

    if (positionInCrowd) {
      this.positionInCrowd = positionInCrowd;
    }

    this.setScale(0.45); // container and hitbox size
    this.setDepth(10);

    this.name = key; // stock string assetname to name

    if (!isDebug) {
      Align.outsideRightSpine(this, this.spine, this.scale);
      Align.charactersOnGround(this, this.spine, this.scale);
    } else {
      Align.crowdPosition(this, this.spine, this.scale);
      Align.charactersOnGround(this, this.spine, this.scale);
    }

    this.drawDebug(false);

    if (runAnimation) {
      this.runTowardCrowd();
    }
  }

  public failAndDestroy() {
    this.playAnimation("Fail", false);

    setTimeout(() => {
      this.deleteCharacter();
    }, 1000);
  }

  public runTowardCrowd() {
    let destinationX = this.crowdPositionX

    if (destinationX < 0) {
      destinationX = 0;
    }

    let destination = window.innerWidth - destinationX + (this.displayWidth / 2) * this.scale;
    let duration = (destination / this.speedIn) * 1000;
    let latency = 400;

    // join crowd
    this.tweenIn = this.scene.tweens.add({
      targets: this,
      x: destinationX,
      duration: duration + latency,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.reachDragQueen()
      },
    });
  }

  public unlock() {
    this.isUnlock = true;
  }

  public reachDragQueen() {
    if (this.isUnlock) {
      this.playRunAnimation();
      this.runOutsideCrowd();
    }
  }

  public runOutsideCrowd() {
    let destinationX = 0 - this.spineBody.width
    // - this.displayWidth * this.scale
    
    let destination =
      window.innerWidth - destinationX + (this.displayWidth / 2) * this.scale;

    let duration = (destination / this.speedOut) * 1000;

    let latency = 400;

    // join crowd
    this.tweenOut = this.scene.tweens.add({
      targets: this,
      x: destinationX,
      duration: duration + latency,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.deleteCharacter()
      },
    });
  }

  public joinCrowd(positionInCrowd: number) {
    this.playAnimation("Transition", false);
    this.positionInCrowd = positionInCrowd;
    positionInCrowd % 2 ? this.setDepth(10) : this.setDepth(11);
  }

  public playTransformationAnimation() {
    this.playAnimation("Transition", false);
  }

  public playRunAnimation() {
    this.playAnimation("Run", true);
  }

  public playDanceAnimation(isFreestyle: boolean) {
    this.playAnimation("Dance", isFreestyle);
  }

  public playDanceThenRunAnimation(delay: number) {
    this.playOnceThenLoopNextAnimation("Dance", "Run", delay);
  }

  /**
   * destroy physic character + remove its tweens
   */
  public deleteCharacter() {
    if (this.isUnlock) {
      this.destroyCallback(this.id);
    }

    if (this.tweenIn) {
      this.tweenIn.remove();
    }
    if (this.tweenOut) {
      this.tweenOut.remove();
    }
    this.isDestroyed = true;
    this.destroy();
  }
}

export default PhysicCharacter;
