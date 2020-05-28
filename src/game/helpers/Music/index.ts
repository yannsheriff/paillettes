import * as Tone from "tone";
import { EventEmitter } from "events";
import muscisFile, { Musics } from "./musics";
import { SampleLibrary, AvailableInstrument } from "./instruments";

interface Note {
  duration: number;
  durationTicks: number;
  midi: number;
  name: string;
  ticks: number;
  time: number;
  velocity: number;
}

export interface NoteWithTrack {
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

export const NOTE_DELAY = 5000;

export default class MusicPlayer {
  private emitter: EventEmitter;
  private synths: Array<Tone.Synth | Tone.Sampler> = [];
  public noteMap: Map<string, 0 | 1 | 2 | 3> = new Map();

  constructor(songName: Musics, evtEmitter: EventEmitter) {
    this.emitter = evtEmitter;
    this.setupSong(muscisFile.get(songName));
  }

  private setupSong = (songData: any) => {
    const filteredTracks = songData.tracks.filter(
      (track: Track) => track.notes.length > 1
    );
    this.synths = [];

    const gain = new Tone.Gain(0.3);
    gain.toDestination();

    for (let index = 0; index < filteredTracks.length; index++) {
      const instrument = this.generateInstrument(filteredTracks[index].name);
      this.synths.push(instrument);
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
        const delay = NOTE_DELAY / 1000;
        const mappedTimings = NotesWithTrack.map((note: Note) => ({
          ...note,
          time: note.time - delay,
        }));
        new Tone.Part(this.sendEvent, mappedTimings).start(0);
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
        this.createNoteMap(track);
      } else {
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
      }
    });
    // TODO if tempo is not needed we can remove it wait until 20/06/2020
    // Tone.Transport.scheduleRepeat((time) => {
    //   this.sendTick(time);
    // }, "4n");
  };

  private sendEvent = (time: number, event: NoteWithTrack) => {
    this.emitter.emit("note", event);
  };

  // TODO if tempo is not needed we can remove it wait until 20/06/2020
  // private sendTick = (time: number) => {
  //   this.emitter.emit("tick", time);
  // };

  private generateInstrument(name: string): Tone.Sampler | Tone.Synth {
    switch (name) {
      case "main":
        return SampleLibrary.load({
          instruments: AvailableInstrument.flute,
        });

      case "piano":
        return SampleLibrary.load({
          instruments: AvailableInstrument.piano,
        });

      default:
        const synth = new Tone.Synth();
        synth.oscillator.type = "sine";
        return synth;
    }
  }

  private createNoteMap = (track: Track) => {
    const map = track.notes.map((note) => note.name);
    const notes = map
      .filter((a, b) => map.indexOf(a) === b)
      .sort(this.byNoteHeight);
    const noteByHeight = notes.length / 4;

    notes.forEach((note, index) => {
      const pos = Math.floor(index / noteByHeight);
      if (pos === 0 || pos === 1 || pos === 2 || pos === 3) {
        this.noteMap.set(note, pos);
      }
    });
  };

  private byNoteHeight = (a: string, b: string) => {
    const octaveA = a.match(/\d+/)![0];
    const octaveB = b.match(/\d+/)![0];
    if (octaveA === octaveB) {
      return a > b ? 1 : -1;
    }
    return octaveA > octaveB ? 1 : -1;
  };

  private playNote = (time: number, event: NoteWithTrack) => {
    try {
      this.synths[event.track].triggerAttackRelease(
        event.name,
        event.duration,
        time,
        event.velocity
      );
    } catch (error) {}
  };

  public start() {
    Tone.Transport.start();
  }
}
