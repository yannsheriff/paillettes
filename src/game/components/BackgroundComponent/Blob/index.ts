import SimplexNoise from "simplex-noise";
import MainStateManager, { MainState, Worlds } from "../../../states/main";

class Blob extends Phaser.GameObjects.Graphics {
    private mainState: MainState;
    private mainManager: MainStateManager;
    private drawColor: number;
    private pink: number = 0xff00ab;
    private blue: number = 0x2b3aff;
    private purple: number = 0x6a23ff;
    private red: number = 0xff0b0b;
    private worldColors: Map<Worlds, number> = new Map([
        [Worlds.middleAges, this.pink], // pink
        [Worlds.today, this.blue], // blue
        [Worlds.nineteenCentury, this.purple], // blue
        [Worlds.prehistory, this.red], // blue
    ]);
    private blob?: Phaser.GameObjects.Graphics;
    private speed: number = 2;
    private blobPosition: any = {
        x: 0,
        y: window.innerHeight / 2
    }
    private initialRayon = window.innerWidth / 2;
    private rayon: number = this.initialRayon; // le blob prend 1/3 de l'écran
    private variation: number = 80;
    private noise: SimplexNoise = new SimplexNoise(Math.random);

    constructor(
        scene: Phaser.Scene
    ) {
        super(scene);
        scene.add.existing(this);
        this.mainManager = MainStateManager.getInstance();
        this.mainManager.subscribe(this.onMainStateChange);
        this.mainState = this.mainManager.state;
        this.drawColor = this.worldColors.get(this.mainManager.state.world)!;
        this.drawBlob()
    }

    preUpdate(time: any, delta: any) {
        // this.drawBlob()
    }

    public drawBlob() {
        this.speed += 0.005; // maybe refacto

        this.clear()

        
        this.lineStyle(2, this.drawColor, 1);
        this.fillStyle(this.drawColor, 1);
        this.moveTo(this.blobPosition.x, this.blobPosition.y); // center

        for (var i = - Math.PI / 2; i < Math.PI / 2 + 0.02; i += 0.02 * (Math.PI / 2)) {
            let value2d =
                this.noise.noise2D(
                    Math.cos(i) + this.speed,
                    Math.sin(i) + this.speed
                ) * this.variation;
            let x = Math.cos(i) * (this.rayon + value2d) + (this.blobPosition.x);
            let y =
                Math.sin(i) * (this.rayon + value2d) + (this.blobPosition.y);
            this.lineTo(x, y);
        }

        this.fillPath();
        this.setDepth(7).setBlendMode('SCREEN')
    }

    public playFreestyle() {
        this.scene.tweens.add({
            targets: this,
            rayon: window.innerWidth + 500,
            duration: 700,
            ease: 'back.in',
            repeat: 0,
            yoyo: false,
        });
    }
    public stopFreestyle() {
        this.scene.tweens.add({
            targets: this,
            rayon: this.initialRayon,
            duration: 700,
            ease: 'back.out',
            repeat: 0,
            yoyo: false,
        });
    }

    public changeColor(world: Worlds) {
        this.scene.tweens.add({
            targets: this,
            drawColor: this.worldColors.get(world)!,
            duration: 700,
            ease: 'back.out',
            repeat: 0,
            yoyo: false,
        });
    }

    private onMainStateChange = (state: MainState) => {
        if (state.world !== this.mainState.world) {
            this.changeColor(state.world);
        }

        // if (
        //   state.isInTransition !== this.mainState.isInTransition &&
        //   !state.isInTransition
        // ) {
        //   this.endWorldTransition();
        // }

        this.mainState = state;
    };
}
export default Blob;
