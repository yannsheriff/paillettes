import SimplexNoise from "simplex-noise";
import MainStateManager, { MainState, Worlds } from "../../../states/main";
import FreestyleStateManager, {
    FreestyleState,
} from "../../../states/freestyle";

class Blob extends Phaser.GameObjects.Graphics {
    private mainState: MainState;
    private mainManager: MainStateManager;
    private freestyleState: FreestyleState;
    private freestyleManager: FreestyleStateManager;

    private drawColor: number;
    private canDraw: boolean = false;
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
        this.freestyleManager = FreestyleStateManager.getInstance();
        this.freestyleState = this.freestyleManager.state;
        this.freestyleManager.subscribe(this.onFreestyleStateChange);

        this.drawColor = this.worldColors.get(this.mainManager.state.world)!;
        // this.drawBlob()
    }

    preUpdate(time: any, delta: any) {
        if (this.canDraw) {
            this.drawBlob()
        }
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

    public freestyle(isFreestyle: boolean) {
        this.scene.tweens.add({
            targets: this,
            rayon: isFreestyle ? window.innerWidth + 500 : this.initialRayon,
            duration: 700,
            ease: isFreestyle ? 'back.in' : 'back.out',
            repeat: 0,
            yoyo: false,
        });
    }

    public changeColor(world: Worlds) {
        let colorBlend = { step: 0 };
        let oldColor = Phaser.Display.Color.ValueToColor(this.drawColor);
        let newColor = Phaser.Display.Color.ValueToColor(this.worldColors.get(world!)!)
        this.scene.tweens.add({
            targets: colorBlend,
            step: 100,
            duration: 500,
            onUpdate: () => {
                let interpolate = Phaser.Display.Color.Interpolate.ColorWithColor(oldColor, newColor, 100, colorBlend.step);
                let colourInt = Phaser.Display.Color.GetColor(interpolate.r, interpolate.g, interpolate.b);
                this.drawColor = colourInt;
            }
        });
    }

    private onMainStateChange = (state: MainState) => {
        if (state.world !== this.mainState.world) {
            this.changeColor(state.world);
        }

        if (state.isGameLaunch !== this.mainState.isGameLaunch) {
            this.canDraw = true;
        }

        // if (
        //   state.isInTransition !== this.mainState.isInTransition &&
        //   !state.isInTransition
        // ) {
        //   this.endWorldTransition();
        // }

        this.mainState = state;
    };

    private onFreestyleStateChange = (state: FreestyleState) => {
        if (
            this.freestyleState.isFreestyleActivated !== state.isFreestyleActivated
        ) {
            if (state.isFreestyleActivated) {
                this.freestyle(true)
            } else {
                this.freestyle(false)
            }
        }

        this.freestyleState = state;
    };
}
export default Blob;
