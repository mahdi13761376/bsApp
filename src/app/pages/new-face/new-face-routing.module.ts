import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFacePage } from './new-face.page';

const routes: Routes = [
  {
    path: '',
    component: NewFacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFacePageRoutingModule {}
