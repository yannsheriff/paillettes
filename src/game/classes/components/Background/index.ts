import Mask from "../../../classes/physic/Mask";
import Plane from "../../../classes/physic/Plane";

class Background {
    constructor(
        scene: Phaser.Scene,
    ) {
        // @ts-ignore
        let mask = new Mask(scene, 600, 400, "mask", 0, scene.pink)
        let first_plane_nb = new Plane(scene, 600, 400, "firstplane_nb", 3)
        let second_plane_nb = new Plane(scene, 600, 400, "secondplane_nb", 2)
        let third_plane_nb = new Plane(scene, 600, 400, "thirdplane_nb", 1,)
    }
}

export default Background;
