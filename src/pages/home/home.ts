import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public alertCtrl: AlertController) {

  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: "There's no such a Host",
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'This feature is not be able to use functionaly Right now',
      buttons: ['OK']
    });
    alert.present();
  }

}
