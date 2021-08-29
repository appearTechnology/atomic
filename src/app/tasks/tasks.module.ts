import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../icons.module';

import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import {EditTaskComponent} from './edit-task/edit-task.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconsModule,
  ],
  declarations: [
    AddTaskModalComponent,
    EditTaskComponent
  ],
  exports: [
    AddTaskModalComponent,
    EditTaskComponent
  ]
})
export class TasksComponentsModule { }
