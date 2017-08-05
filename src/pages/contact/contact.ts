import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AudioProvider } from 'ionic-audio';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  brightness: number = 20;
  contrast: number = 0;
  myTracks: any[];
  allTracks: any[];
  selectedTrack:1;

  constructor(public navCtrl: NavController,private _audioProvider: AudioProvider) {
    // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
        this.myTracks = [{
          src: "assets/audio/Yu-Gi-Oh Background music - Let-s start the duel.mp3",
          artist: 'Yami Yugi',
          title: 'Background Music 1',
          art: "assets/img/yami.png",
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
        },
        {
          src: "assets/audio/Yu-Gi-Oh Background music - Action suspense.mp3",
          artist: 'Yami Bakura',
          title: 'Background Music 2',
          art: "assets/img/ymarik.png",
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
        }];

  }
  ngAfterContentInit() {
     // get all tracks managed by AudioProvider so we can control playback via the API
     this.allTracks = this._audioProvider.tracks;
   }

   playSelectedTrack() {
     // use AudioProvider to control selected track
     this._audioProvider.play(this.selectedTrack);
   }

   pauseSelectedTrack() {
      // use AudioProvider to control selected track
      this._audioProvider.pause(this.selectedTrack);
   }

   onTrackFinished(track: any) {
     console.log('Track finished', track);
   }

}
