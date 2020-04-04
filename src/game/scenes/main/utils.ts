import stepEventEmitter from "../../../services/stepEventEmitter";
import { Direction } from "readline";

export const sleep = (time: number) =>
  new Promise(function(resolve) {
    setTimeout(resolve, time, "timeout");
  });

export const stepEventPromise = () =>
  new Promise((resolve, reject) => {
    stepEventEmitter.on("step", (direction: Direction) => {
      resolve(direction);
    });
  });
