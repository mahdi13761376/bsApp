import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../../app.module';
import { environment } from '../../../environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthService } from 'src/app/services/auth.service';

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

  

  constructor(public photoService: PhotoService, private authService:AuthService) { }

  public ionViewWillEnter() {
    const card_container = document.getElementById('card-container2');
    card_container.innerHTML = '';
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.known_faces_request(res).subscribe(res => {
          console.log(res);
          for (var i in res) {
            card_container.innerHTML = card_container.innerHTML +  "<ion-card> <img height='100%' width='100%' src='" + res[i].link + "'>" +
              "<ion-card-header> <ion-card-subtitle dir='rtl'> " + res[i].name + "</ion-card-subtitle> </ion-card-header> </ion-card>";


          }
        });
      }
    });
  }
  public salam(){
    console.log('salam');
  }

  ngOnInit() {
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
