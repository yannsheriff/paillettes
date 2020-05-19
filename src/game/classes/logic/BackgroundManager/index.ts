import Mask from "../../physic/Mask";
import Plane from "../../physic/Plane";
import Align from '../../utils/align'

class BackgroundManager {
    private pink: number = 0xFF00AB
    private blue: number = 0x2B3AFF
    private purple: number = 0x6A23FF
    private red: number = 0xff0b0b
    private white: number = 0xffffff;
    private speed: number = 60;
    private currentPlanes: Array<Plane> = [];
    private nextPlanes: Array<Plane> = [];
    private scene: Phaser.Scene
    private canvasWidth: number = 0;
    private planesAssets: Array<Array<string>> = [
        ["firstplane_nb"],
        ["secondplane_nb"],
        ["thirdplane_nb"],
    ]
    constructor(
        scene: Phaser.Scene,
    ) {
        this.scene = scene

        this.canvasWidth = scene.sys.game.canvas.width;

        // @ts-ignore
        let mask = new Mask(scene, 600, 400, "mask", 0, this.pink)
        Align.left(mask)

        for (let planenb = 0; planenb < 3; planenb++) {
            this.generatePlanes(planenb)
        }
    }

    /**
     * name
     */
    public generatePlanes(planenb: number) {
        this.currentPlanes[planenb] = new Plane(
            this.scene, 0, 0,
            this.planesAssets[planenb][0],
            planenb,
            this.speed
        )

        this.initDestroy(this.currentPlanes[planenb])
    }

    public initDestroy(planeinstance: Plane) {
        const timeToExitCanvas = this.calculateTimeToExit(planeinstance.width, planeinstance.scale, planeinstance.speed, this.canvasWidth)
        console.log('timeToExitCanvas : ' + timeToExitCanvas)

        setTimeout(() => {
            console.log('destroy')
            planeinstance.destroy(true)
        }, timeToExitCanvas)
    }

    /**
   * Helper fonction
   *
   * Permet de calculer en sec combien de temps met
   * le plan à sortir du canvas
   */
    public calculateTimeToExit(
        planeWidth: number,
        planeScale: number,
        planeSpeed: number,
        canvasWidth: number
    ): number {
        const v = planeSpeed
        const d = canvasWidth + (planeWidth * planeScale) - ((planeWidth * planeScale) / 2)
        return (d / v) * 1000
    }
}

export default BackgroundManager;
