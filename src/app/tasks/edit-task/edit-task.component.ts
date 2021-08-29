import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {TaskService} from '../../services/task.service';
import {LocalNotifications, CancelOptions} from '@capacitor/local-notifications';
import {format} from "date-fns";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {

  @Input() uid: any;
  @Input() task: any;
  title: string;
  daily_reminder: boolean;
  reminder_time: any;
  color: any;

  constructor(
    public modalController: ModalController,
    private taskService: TaskService,
    private platform: Platform,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.task);
    this.title = this.task.title;
    const time = (new Date());
    time.setUTCHours(this.task.reminder_utc_hours);
    time.setUTCMinutes(this.task.reminder_utc_minutes);
    this.reminder_time = time.toISOString();
    this.daily_reminder = this.task.daily_reminder;
  }

  change(e) {
    //  console.log(e.detail.checked)
    if (e.detail.checked == true) {
      this.daily_reminder = true
    } else {
      this.daily_reminder = false
    }
  }

  async save() {
    const time = (new Date()).getTime();
    const at = new Date(this.reminder_time);
    const notificationId = this.task.notificationId;
    this.task.title = this.title;
    this.task.daily_reminder = this.daily_reminder;
    this.task.reminder_utc_hours = at.getUTCHours();
    this.task.reminder_utc_minutes = at.getUTCMinutes();
    this.task.notificationId = time;
    this.task.status = false;

    if(!this.daily_reminder) {
      this.task.reminder_date = format(at, 'dd/MM/yyyy');
    }

    if (this.title.length !== 0) {
      const taskResponse = this.taskService.updateTask(this.task, this.task.id);
      taskResponse.then(async (resp) => {
        if(this.platform.is('cordova')) {
          // cancelling old notification
          const notifications: CancelOptions = {
            notifications: [{ id : notificationId }]
          }; // <== string
          await LocalNotifications.cancel(notifications);
          // Creating new notification
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
      }, (err) => {
        console.log('Unable to update');
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

  async deleteConfirmation() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  delete() {
    const notificationId = this.task.notificationId;
    const taskResponse = this.taskService.deleteTask(this.task.id);
    taskResponse.then(async (resp) => {
      if(this.platform.is('cordova')) {
        // cancelling old notification
        const notifications: CancelOptions = {
          notifications: [{ id : notificationId }]
        }; // <== string
        await LocalNotifications.cancel(notifications);
      }
    }, (err) => {
      console.log('Unable to update');
    });
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }
}
