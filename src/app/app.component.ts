import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth: AngularFireAuth,
  ) {
    if(platform.is('cordova')) {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.checkPermission();
        }
      });
    }
  }

  checkPermission() {
    LocalNotifications.checkPermissions().then(async hasPermission => {
      if (hasPermission.display === 'granted') {
        console.log('Already has permission for local notifications.');
      } else {
        await this.askForPermission();
      }
    }, (err) => {

    });
  }

  async askForPermission() {
    await LocalNotifications.requestPermissions().then(async result => {
      if (result.display === 'granted') {
        console.log('Grated permission for local notifications.');
      } else {
        console.log('No permission for local notifications.');
      }
    });
  }
}
