import { Component, OnInit, HostListener } from '@angular/core';
import { Howl } from 'howler';
import { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Hi-Owl Player';

  howlObj = new Howl({ src: './assets/sample_sounds/SampleAudio_0.4mb.mp3' });

  playTimeStamp: string;

  private _durationReference: any;

  private readonly INITIAL_TIMESTAMP = '00:00';

  constructor() {}

  ngOnInit() {
    // this.howlObj.play();
    // setTimeout(() => {
    //   this.howlObj.stop();
    // }, 10000);
    this.playTimeStamp = '00:00';

    this.howlObj.on('play', () => {
      this._showDuration();
    });

    this.howlObj.on('end', () => {
      clearInterval(this._durationReference);
      this.playTimeStamp = this.INITIAL_TIMESTAMP;
    });

    this.howlObj.on('stop', () => {
      clearInterval(this._durationReference);
      this.playTimeStamp = this.INITIAL_TIMESTAMP;
    });

    this.howlObj.on('pause', () => {
      clearInterval(this._durationReference);
    });
  }

  public play() {
    this.howlObj.play();
  }

  public pause() {
    this.howlObj.pause();
  }

  public stop() {
    this.howlObj.stop();
  }

  public _showDuration() {
    this._durationReference = setInterval(() => {
      // this.playTimeStamp = Math.floor(
      //   Number.parseFloat(this.howlObj.seek().toString())
      // ).toString();
      this._computeDuration();
    }, 1000);
  }

  private _computeDuration() {
    const durationSecs = Math.floor(
      Number.parseFloat(this.howlObj.seek().toString())
    );

    let min = 0;
    let sec = durationSecs;
    if (durationSecs >= 60) {
      min = Math.floor(durationSecs / 60);
      sec = Math.floor(durationSecs % 60);
    }

    this.playTimeStamp = min
      .toString()
      .padStart(2, '0')
      .concat(':', sec.toString().padStart(2, '0'));
  }
}
