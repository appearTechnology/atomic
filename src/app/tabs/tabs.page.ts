import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskModalComponent } from '../tasks/add-task-modal/add-task-modal.component';
import { IonRouterOutlet } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  uid: string;
  subs: Subscription[] = [];

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
    private router: Router,
  ) {
    this.auth()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        uid: this.uid,
      },
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid
      } else {
        this.router.navigate(['welcome'])
      }
    });
    this.subs.push(sub)
  }

  ngOnDestroy() {
    this.subs.forEach(x => {
      x.unsubscribe();
    });
  }
}
