import { Component, OnInit, Input } from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { LocalNotifications, ScheduleEvery } from '@capacitor/local-notifications';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent implements OnInit {

  @Input() uid: any;
  title: string;
  daily_reminder: boolean;
  reminder_time: any;
  color: any;

  constructor(
    public modalController: ModalController,
    private taskService: TaskService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.reminder_time = (new Date()).toISOString();
    this.daily_reminder = false;
  }

  change(e) {
    //  console.log(e.detail.checked)
    if (e.detail.checked == true) {
      this.daily_reminder = true
    } else {
      this.daily_reminder = false
    }
  }

  async save(value?) {
    const time = (new Date()).getTime();
    value = {
      title: this.title,
      daily_reminder: this.daily_reminder,
      reminder_time: this.reminder_time,
      uid: this.uid,
      notificationId: time,
      status: false
    };

    if (this.title.length != 0) {
      const taskResponse = await this.taskService.newTask(value);
      taskResponse.get().then((snapshot) => {
        console.log(snapshot.id);
        if(this.platform.is('cordova')) {
          LocalNotifications.schedule({
            notifications: [{
              title: 'Your task',
              body: this.title,
              id: time,
              // @ts-ignore
              schedule: this.getSchedule(),
            }]
          });
        }
      });
      this.modalController.dismiss();
    }

  }

  getSchedule() {
    const at = new Date(this.reminder_time);
    if(this.daily_reminder) {
      return {
        // at,
        // repeats: this.daily_reminder,
        allowWhileIdle: true,
        // every: 'day',
        on: {
          hour: at.getHours(),
          minute: at.getMinutes()
        }
      };
    } else {
      return {
        at,
        repeats: false,
        allowWhileIdle: true,
      };
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
