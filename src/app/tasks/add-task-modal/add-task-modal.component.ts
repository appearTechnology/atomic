import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';

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
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.reminder_time = '1990-02-19T08:00:00+11:00';
    this.daily_reminder = false
  }

  change(e) {
    //  console.log(e.detail.checked)
    if (e.detail.checked == true) {
      this.daily_reminder = true
    } else {
      this.daily_reminder = false
    }
  }

  save(value?) {

    value = {
      title: this.title,
      daily_reminder: this.daily_reminder,
      reminder_time: this.reminder_time,
      uid: this.uid,
      status: false
    }

    if (this.title.length != 0) {
      this.taskService.newTask(value)
      this.modalController.dismiss()
    }

  }

  close() {
    this.modalController.dismiss()
  }
}
