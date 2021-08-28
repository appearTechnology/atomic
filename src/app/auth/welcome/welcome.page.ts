import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async signUp() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async logIn() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
