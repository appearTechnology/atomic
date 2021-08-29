import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { ModalController } from '@ionic/angular';
import { EditTaskComponent } from '../tasks/edit-task/edit-task.component';
import { IonRouterOutlet } from '@ionic/angular';
import {format} from "date-fns";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  selectState: boolean;
  dates: any;
  uid: string;
  subs: Subscription[] = [];
  tasks: any;

  todaysTask: any;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {
    this.selectState = false;
  }

  ngOnInit() {
    this.auth()


    this.dates = [
      {
        title: 12,
        selected: false
      },
      {
        title: 13,
        selected: false
      },
      {
        title: 14,
        selected: false
      },
      {
        title: 15,
        selected: true
      },
      {
        title: 16,
        selected: false
      },
      {
        title: 17,
        selected: false
      },
      {
        title: 18,
        selected: false
      }
    ]

  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid
        this.getTasks(this.uid)

      } else {
        this.router.navigate(['welcome'])
      }
    });
    this.subs.push(sub)
  }



  async edit(task) {
    const modal = await this.modalController.create({
      component: EditTaskComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        uid: this.uid,
        task
      },
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  getTasks(uid: any) {
    var sub1 = this.taskService.getTasks(this.uid).subscribe(i => {
      this.tasks = i
      this.filterTasks()
    })

    this.subs.push(sub1);
  }

  filterTasks() {
    const currentDate = new Date();
    const date = format(currentDate, 'dd/MM/yyyy');
    this.tasks = this.tasks.filter((t) => t.daily_reminder || (!t.daily_reminder && date === t.reminder_date));
    this.tasks = this.tasks.sort((a, b) => {
      const secondsA = (a.reminder_utc_hours * 60 + a.reminder_utc_minutes);
      const secondsB = (b.reminder_utc_hours * 60 + b.reminder_utc_minutes);
      return secondsA - secondsB;
    });
  }

  select(task) {
    const status = !task.status;
    this.taskService.updateStatusForTask(status, task.id);
    console.log(task);
  }

}
