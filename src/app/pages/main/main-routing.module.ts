import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'add-face',
        loadChildren: () => import('../add-face/add-face.module').then(m => m.AddFacePageModule)
      },
      {
        path: 'faces',
        loadChildren: () => import('../faces/faces.module').then(m => m.FacesPageModule)
      },
      {
        path: '',
        redirectTo: '/main/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
