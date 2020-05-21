import { AnimationData } from "../../../services/animations";
import { glow } from "..";

export const mainAnimations: AnimationData[] = [
  {
    key: "glow",
    asset: glow,
    frameWidth: 500,
    frameHeight: 500,
    startFrame: 0,
    endFrame: 16,
    frameRate: 24,
    repeat: 0,
  },
];
