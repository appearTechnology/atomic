import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateManagerPage } from './state-manager.page';

const routes: Routes = [
  {
    path: '',
    component: StateManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateManagerPageRoutingModule {}
