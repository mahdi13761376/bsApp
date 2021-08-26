import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacesPage } from './faces.page';

const routes: Routes = [
  {
    path: '',
    component: FacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacesPageRoutingModule {}
