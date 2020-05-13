import * as Tone from "tone";
// import gaga from "./zelda.json";
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

/**
 * Permet de de reduire le nombre d'evenement qui appel une callback
 * @param delay le temps min entre deux appel à la callback.
 * @param fn La fonction à appeler.
 */
export function throttle(delay: number, fn: (...args: any) => unknown) {
  let lastCall = 0;
  let requestCount = 1;
  let called = true;

  return function (...args: any) {
    const now = new Date().getTime();
    requestCount += 1;
    requestCount = called ? 1 : requestCount;
    if (now - lastCall < delay) {
      called = false;
      return;
    }
    lastCall = now;
    called = true;
    return fn(requestCount, ...args);
  };
}

/**
 * Permet de gérer le delaie entre l'evenement note et l'appel a une callBack
 * @param delay le delay entre l'evenement et l'appel a une callBack en ms.
 * @param fn une function de callback appelé x ms apres l'envenement.
 */
export function noteDelay(delay: number, fn: (...args: any) => unknown) {
  const time = 5000 - delay;
  return function (...args: any) {
    setTimeout(() => {
      return fn(...args);
    }, time);
  };
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

// document.addEventListener("click", (e) => {
//   const evt = new EventEmitter();
//   const player = new MusicPlayer(gaga, evt);
//   evt.on("note", () => console.log("coucou"));
//   player.start();
// });
