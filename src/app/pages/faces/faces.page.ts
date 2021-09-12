import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-faces',
  templateUrl: './faces.page.html',
  styleUrls: ['./faces.page.scss'],
})
export class FacesPage implements OnInit {

  constructor(private authService: AuthService) {
  }

  public ionViewWillEnter() {
    console.log('eyval');
    const card_container = document.getElementById('card-container');
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.faces_request(res).subscribe(res => {
          console.log(res);
          for (var i in res) {
            card_container.innerHTML = card_container.innerHTML +  "<ion-card> <img height='100%' width='100%' src='" + res[i].link + "'>" +
              "<ion-card-header> <ion-card-subtitle dir='rtl'> " + res[i].date +"   " + res[i].time + "</ion-card-subtitle> </ion-card-header> </ion-card>";


          }
        });
      }
    });
  }


  ngOnInit() {
  }
}
