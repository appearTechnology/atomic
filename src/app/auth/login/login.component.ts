import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { User } from '../../model/User'
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showPassword: boolean;
  passwordToggleIcon = 'eye-outline';
  toggleLoader: boolean;
  loaderButtons: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.showPassword = false;
    this.email = ''
    this.password = ''
    this.toggleLoader = false;
    this.loaderButtons = false
  }

  togglePassword() {
    this.showPassword = !this.showPassword

    if (this.passwordToggleIcon == 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline'
    } else {
      this.passwordToggleIcon = 'eye-outline'
    }
  }

  login() {
    this.toggleLoader = true
    this.loaderButtons = true
    if (this.password.length > 5 && this.email != null) {
      this.authService.login(this.email, this.password).then(res => {
        this.router.navigate(['/tabs/tabs/tab1']).then( i => {
          this.modalController.dismiss()
        })
        this.toggleLoader = false
        this.email = ''
        this.password = ''
      }).catch(err => {
        this.presentToast('Sorry we could not log you in, please check your email and password')

        this.toggleLoader = false
        this.loaderButtons = false
      })
    } else {
      this.toggleLoader = false
      this.loaderButtons = false
    }
  }

  error() {
    this.presentToast('Please enter a valid email and password')
  }

  async presentToast(i) {
    const toast = await this.toastController.create({
      message: i,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    return await modal.present();
  }


  close(){
    this.modalController.dismiss()
  }
  // loginInsta() {
  //   this.router.navigate(['connect-ig'])
  // }



}
