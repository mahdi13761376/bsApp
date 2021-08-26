import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'inside',
    loadChildren: () => import('./pages/inside/inside.module').then(m => m.InsidePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-device',
    loadChildren: () => import('./pages/add-device/add-device.module').then(m => m.AddDevicePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule),
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  // {
  //   path: 'add-face',
  //   loadChildren: () => import('./pages/add-face/add-face.module').then( m => m.AddFacePageModule)
  // },
  // {
  //   path: 'faces',
  //   loadChildren: () => import('./pages/faces/faces.module').then( m => m.FacesPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
