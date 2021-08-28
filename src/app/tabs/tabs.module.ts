import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { IconsModule } from '../icons.module';
import { TabsPage } from './tabs.page';

import { TasksComponentsModule } from '../tasks/tasks.module'

@NgModule({
  imports: [
    IonicModule,
    IconsModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TasksComponentsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
