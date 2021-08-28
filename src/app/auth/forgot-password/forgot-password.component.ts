import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  hideButton: boolean;

  constructor(
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.hideButton = false;
    this.email = ''
  }

  reset() {
    console.log(this.email)
    this.hideButton = true;
    if (this.email === null) {
      this.error().then(i => {
        this.hideButton = false
      })
    } else {
      this.afAuth.sendPasswordResetEmail(this.email)
        .then(() =>
          this.passwordSuccess()
        ).catch((i => {
          this.error()
          this.hideButton = false
        })
        );
    }
  }

  async passwordSuccess() {
    const toast = await this.toastController.create({
      message: 'You password has been successfully reset, please check your email.',
      duration: 3000,
      position: 'top',
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  async error() {
    const toast = await this.toastController.create({
      message: 'We dont recognise that email address. Please check and again',
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
