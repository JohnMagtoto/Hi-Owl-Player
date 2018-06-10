import { Component, OnInit, HostListener } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hi-Owl Player';

  howlObj = new Howl({ src: './assets/sample_sounds/SampleAudio_0.4mb.mp3' });

  playTimeStamp: string;

  private _durationReference: any;

  ngOnInit() {
    // this.howlObj.play();
    // setTimeout(() => {
    //   this.howlObj.stop();
    // }, 10000);
    this.playTimeStamp = '0';

    this.howlObj.on('play', () => {
      this._showDuration();
    });

    this.howlObj.on('end', () => {
      clearInterval(this._durationReference);
      this.playTimeStamp = '0';
    });

    this.howlObj.on('stop', () => {
      clearInterval(this._durationReference);
      this.playTimeStamp = '0';
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
      this.playTimeStamp = Math.floor(
        Number.parseFloat(this.howlObj.seek().toString())
      ).toString();
    }, 1000);
  }
}
