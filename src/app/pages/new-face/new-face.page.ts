import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

import { AppModule } from '../../app.module';
import { environment } from '../../../environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthService } from 'src/app/services/auth.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

@Component({
  selector: 'app-new-face',
  templateUrl: './new-face.page.html',
  styleUrls: ['./new-face.page.scss'],
})
export class NewFacePage implements OnInit {
  private  name:any;
  private family:any;
  constructor(public photoService:PhotoService) { }

  ngOnInit() {
  }

  checkNameAndFamily(){
    this.name = (<HTMLInputElement> document.getElementById('name')).value;
    this.family =(<HTMLInputElement> document.getElementById('family')).value;
    if (this.name!='' && this.family!=''){
      return true;
    }
    return false;

  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
