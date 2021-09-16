import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFacePageRoutingModule } from './new-face-routing.module';

import { NewFacePage } from './new-face.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFacePageRoutingModule
  ],
  declarations: [NewFacePage]
})
export class NewFacePageModule {}
