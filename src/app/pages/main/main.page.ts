import { Component, OnInit } from '@angular/core';
import { PusherServiceService } from 'src/app/services/pusher-service.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  presence_channel: any;

  constructor(private pusher: PusherServiceService, private alertController: AlertController) { 
    this.presence_channel = this.pusher.init();
    this.presence_channel.bind('test', async function(data) {
      const alert = await alertController.create({
        cssClass: 'my-custom-class',
        header: 'زنگ',
        message: data,
        buttons: ['متوجه شدم.']
      });
  
      await alert.present();
    });
  }

  ngOnInit() {
  }

}
