import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacesPageRoutingModule } from './faces-routing.module';

import { FacesPage } from './faces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacesPageRoutingModule
  ],
  declarations: [FacesPage]
})
export class FacesPageModule {}
