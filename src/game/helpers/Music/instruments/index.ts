import * as Tone from "tone";

export enum AvailableInstrument {
  flute = "flute",
}

interface LoadObject {
  instruments: AvailableInstrument;
  onload?: () => void;
}
export const SampleLibrary = {
  baseUrl: "/assets/instruments/",
  onload: () => console.log("didLoad"),

  load: function (arg: LoadObject) {
    const onload = arg.onload || this.onload;
    var newT = this[arg.instruments];

    return new Tone.Sampler(newT, {
      baseUrl: this.baseUrl + arg.instruments + "/",
      onload,
    });
  },

  flute: {
    A5: "A5.mp3",
    C3: "C3.mp3",
    C4: "C4.mp3",
    C5: "C5.mp3",
    C6: "C6.mp3",
    E3: "E3.mp3",
    E4: "E4.mp3",
    E5: "E5.mp3",
    A3: "A3.mp3",
    A4: "A4.mp3",
  },
};
