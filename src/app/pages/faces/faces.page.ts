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
  private link:string;
  public ionViewWillEnter() {
    const card_container = document.getElementById('card-container');
    card_container.innerHTML = '';
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.faces_request(res).subscribe(res => {
          this.link = res[0].open_link;
          for (var i in res) {
            let card_value = '';
            card_value += "<ion-card> <img height='100%' width='100%' src='" + res[i].link + "'>" +
              "<ion-card-header> <ion-card-subtitle dir='rtl'> " + res[i].date + "   " + res[i].time;
            if (res[i].name) {
              card_value += "      " + res[i].name + "</ion-card-subtitle> </ion-card-header></ion-card-subtitle>";
            }
            card_value += "</ion-card>";

            if (res[i].need_open) {
              console.log(res[i].need_open);
              card_value += "<ion-button type='button' (click)='send_open($event, item)'>باز کردن در</ion-button>"
            }
            card_container.innerHTML += card_value;


          }
        });
      }
    });
  }
  ngOnInit() {
  }

  send_open(){
    console.log(this.link);
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.open_request(res, this.link).subscribe(res => {
         console.log(res);
        });
      }
    });
  }
}
