import {AuthService} from '../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  data = '';

  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) {
  }

  ngOnInit() {
    this.authService.getToken().then(res => {
      if (res){
        this.authService.ini_request(res).subscribe(res => {
          const add_button = document.getElementById('pluss_button');
          const label_text = document.getElementById('card_label');
          const card = document.getElementById('card');
          if (res['device']){
            label_text.innerText = 'سریال دستگاه:' + res['device'];
            card.hidden = false;
            add_button.hidden = true;
          }
      });
    }
    });

    }
}
