import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../../app.module';
import { environment } from '../../../environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

@Component({
  selector: 'app-add-face',
  templateUrl: './add-face.page.html',
  styleUrls: ['./add-face.page.scss'],
})
export class AddFacePage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
