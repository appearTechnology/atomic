import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TasksComponentsModule  } from '../tasks/tasks.module'
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { IconsModule } from '../icons.module';

@NgModule({
  imports: [
    IonicModule,
    IconsModule,
    CommonModule,
    FormsModule,
    TasksComponentsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
