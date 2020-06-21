import Align from "../../../helpers/Align/align";
import SpineContainer from "../../../helpers/SpineContainer/SpineContainer";

export enum CharacterType {
  game,
  debug,
  score
}

class PhysicCharacter extends SpineContainer {
  public scene: Phaser.Scene;
  public id: string;
  public speedIn: number;
  public tweenIn?: Phaser.Tweens.Tween;
  public tweenOut?: Phaser.Tweens.Tween;
  public positionInCrowd: number = 0;
  public isUnlock: boolean = false;
  public characterType: CharacterType;
  public isDestroyed: boolean = false; // to do
  private onEndCallback: (id: string) => void
  // private updateCrowdCallback: () => void

  public speedOut: number = 250;
  public distanceBetweenCharacters: number = 60;
  public crowdPositionX: number = window.innerWidth / 2 - 210;

  constructor(
    scene: Phaser.Scene,
    key: string,
    anim: string,
    id: string,
    speed: number,
    onEndCallback: (id: string) => void,
    characterType: CharacterType,
    loop: boolean = false,
  ) {
    super(scene, 0, 0, key, anim, loop);
    this.id = id;
    this.scene = scene;
    this.speedIn = speed;
    this.characterType = characterType;
    this.onEndCallback = onEndCallback;

    scene.add.existing(this);

    // apply default skin to character
    this.applyDefaultSkin(false);

    this.mixAnimation("Transition", "Run");
    this.mixAnimation("Run", "Dance");
    this.mixAnimation("Dance", "Run");

    this.setDepth(10);
    this.setScale(0.45); // container and hitbox size

    this.name = key; // stock string assetname to name

    switch (this.characterType) {
      case CharacterType.game:
        Align.outsideRightSpine(this, this.spine, this.scale);
        Align.charactersOnGround(this, this.spine, this.scale);
        this.runTowardCrowd();
        break;
      case CharacterType.debug:
        Align.crowdPosition(this, this.spine, this.scale);
        Align.charactersOnGround(this, this.spine, this.scale);
        break;
      case CharacterType.score:
        Align.outsideLeftSpine(this, this.spine, this.scale);
        Align.charactersOnGround(this, this.spine, this.scale);
        this.runOutsideScreen();
        break;
    
      default:
        break;
    }

    this.drawDebug(false);
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
        if (this.isUnlock) {
          this.reachDragQueen()
          this.playRunAnimation();
        }
      },
    });
  }

  public unlock() {
    this.isUnlock = true;
  }

  public reachDragQueen() {
    let destinationX = this.crowdPositionX - this.distanceBetweenCharacters * this.positionInCrowd

    if (destinationX < 0) {
      destinationX = 0;
    }

    let destination = window.innerWidth - destinationX + (this.displayWidth / 2) * this.scale;
    let duration = (destination / this.speedIn) * 1000;

    // join crowd
    this.tweenIn = this.scene.tweens.add({
      targets: this,
      x: destinationX,
      duration: duration,
      repeat: 0,
      yoyo: false,
    });
  }

  public shiftCharacter() {
    this.positionInCrowd -= 1
    if (this.positionInCrowd === 0) {
      this.runOutsideCrowd()
    } else {
      this.reachDragQueen()
    }
  }

  // OUT GAME SCENE
  public runOutsideCrowd() {
    let destinationX = 0 - this.spineBody.width
    
    let destination =
      window.innerWidth - destinationX + (this.displayWidth / 2) * this.scale;

    let duration = (destination / this.speedOut) * 1000;

    let latency = 400;

    // run outside screen
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

  // SCORE SCENE
  public runOutsideScreen() {
    let destination = window.innerWidth + this.spineBody.width * this.scale;
    let duration = (destination / this.speedIn) * 1000;
    // let latency = 400;

    this.tweenIn = this.scene.tweens.add({
      targets: this,
      x: destination,
      duration: duration,
      repeat: 0,
      yoyo: false,
      onStart: () => {
        setTimeout(() => {
          this.playOnceThenLoopNextAnimation("Dance", "Run", 0)
        }, duration / 3);
        setTimeout(() => {
          this.onEndCallback(this.id)
        }, duration / 2);        
      },
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
      this.onEndCallback(this.id);
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
