import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.page.html',
  styleUrls: ['./state-manager.page.scss'],
})
export class StateManagerPage implements OnInit {

  uid: string;
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.auth()
  }

  ngOnInit() {
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['tabs/tabs/tab1'])
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
