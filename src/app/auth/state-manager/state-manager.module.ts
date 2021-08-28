import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StateManagerPageRoutingModule } from './state-manager-routing.module';

import { StateManagerPage } from './state-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateManagerPageRoutingModule
  ],
  declarations: [StateManagerPage]
})
export class StateManagerPageModule {}
