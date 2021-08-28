import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  id: string;
  email: string;
  password: string;
  showPassword: boolean;
  passwordToggleIcon = 'eye-outline';
  toggleLoader: boolean;
  loaderButtons: boolean;

  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    public toastController: ToastController,
    private router: Router,
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

  save() {
    //this.hideButton = true
    this.toggleLoader = true
    this.loaderButtons = true
    if (this.password.length > 5 && this.email != null) {
      this.authService.register(this.email, this.password).then(res => {
        this.registerUser()
        this.toggleLoader = false
        this.loaderButtons = false;

      }).catch(err => {
        this.presentToast(err)
        this.toggleLoader = false
        this.loaderButtons = false;
      })
    } else {
      this.error()
      this.toggleLoader = false
      this.loaderButtons = false;
    }
  }

  registerUser(value?) {
    var date = new Date();
    var year = date.getFullYear();

    value = {
      email: this.email,
      state: 1,
      join_timestamp: date,
    }
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.id = auth.uid
        this.userService.newUser(value, this.id);
        this.router.navigate(['/tabs/tabs/tab1']).then( i => {
          this.modalController.dismiss()
        })
      } else {
      }
    });
  }

  error() {
    //this.presentToast('')
    if (this.email.length >= 4 && this.password.length < 8) {
      this.presentToast('Your password must be more than 8 characters')
    } else {
      this.presentToast('Please fill out all field before proceeding forward')
    }
  }

  async presentToast(i) {
  const toast = await this.toastController.create({
    message: i,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

  close() {
    this.modalController.dismiss()
  }

}
