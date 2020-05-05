import * as Tone from "tone";
import gaga from "./ladygaga.json";
import { EventEmitter } from "events";

interface Note {
  duration: number;
  durationTicks: number;
  midi: number;
  name: string;
  ticks: number;
  time: number;
  velocity: number;
}

interface NoteWithTrack {
  track: number;
  duration: number;
  durationTicks: number;
  midi: number;
  name: string;
  ticks: number;
  time: number;
  velocity: number;
}

interface Track {
  channel: number;
  controlChanges: any;
  pitchBends: [];
  instrument: any;
  name: string;
  notes: Note[];
}

export default class MusicPlayer {
  private emitter: EventEmitter;
  private synths: Tone.Synth[] = [];

  constructor(songData: any, evtEmitter: EventEmitter) {
    this.emitter = evtEmitter;
    this.setupSong(songData);
  }

  private setupSong = (songData: any) => {
    const filteredTracks = songData.tracks.filter(
      (track: Track) => track.notes.length > 1
    );
    this.synths = [];

    const gain = new Tone.Gain(0.3);
    gain.toDestination();

    for (let index = 0; index < filteredTracks.length; index++) {
      this.synths.push(new Tone.Synth());
      this.synths[index].oscillator.type = "sine";
      this.synths[index].connect(gain);
    }

    Tone.Transport.bpm.value = songData.header.ppq;
    Tone.Transport.timeSignature = songData.header.timeSignatures;

    filteredTracks.forEach((track: any, index: number) => {
      const NotesWithTrack = track.notes.map((note: Note) => ({
        ...note,
        track: index,
      }));

      if (track.name === "main") {
        const mappedTimings = NotesWithTrack.map((note: Note) => ({
          ...note,
          time: note.time - 5,
        }));
        new Tone.Part(this.sendEvent, mappedTimings).start(0);
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
      } else {
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
      }
    });
  };

  private sendEvent = (time: number, event: NoteWithTrack) => {
    this.emitter.emit("note", event);
  };

  private playNote = (time: number, event: NoteWithTrack) => {
    try {
      this.synths[event.track].triggerAttackRelease(
        event.name,
        event.duration,
        time,
        event.velocity
      );
    } catch (error) {
      console.warn("Note at same time : ", event.name, time);
    }
  };

  public start() {
    Tone.Transport.start();
  }
}

document.addEventListener("click", (e) => {
  const evt = new EventEmitter();
  const player = new MusicPlayer(gaga, evt);
  evt.on("note", () => console.log("coucou"));
  player.start();
});
