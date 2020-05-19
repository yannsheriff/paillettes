import Mask from "../../physic/Mask";
import Plane from "../../physic/Plane";
import Align from '../../utils/align'

class BackgroundManager {
    private pink : number =  0xFF00AB
    private blue: number =  0x2B3AFF
    private purple: number =  0x6A23FF
    private red: number =  0xff0b0b
    private white: number = 0xffffff;
    private speed: number = 1;

    constructor(
        scene: Phaser.Scene,
    ) {
        // @ts-ignore
        let mask = new Mask(scene, 600, 400, "mask", 0, this.pink)
        Align.left(mask)

        let first_plane_nb = new Plane(scene, 600, 400, "firstplane_nb", 3)
        let second_plane_nb = new Plane(scene, 600, 400, "secondplane_nb", 2)
        let third_plane_nb = new Plane(scene, 600, 400, "thirdplane_nb", 1,)
    }
}

export default BackgroundManager;
