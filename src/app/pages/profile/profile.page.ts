import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private ChangeUserForm: FormGroup;
  private ChangeDeviceForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private toastController: ToastController, private authService: AuthService) { }
  ngOnInit() {
    this.ChangeUserForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
    this.ChangeDeviceForm = this.formBuilder.group({
      mode: [''],
      acc: ['']
    });
  }

  ionViewWillEnter() {
    const changepassForm = document.getElementById('change-user-form');
    changepassForm.hidden = true;
    const changeDeviceForm = document.getElementById('change-device-form');
    changeDeviceForm.hidden = true;
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.ini_request(res).subscribe(res => {
          const name = document.getElementById('user_name');
          const familyname = document.getElementById('user_lastname');
          const username = document.getElementById('user_username');
          const device_id = document.getElementById('device_id');
          const device_acc = document.getElementById('device_acc');
          const device_mode = document.getElementById('device_mode');

          name.innerText = 'نام : ' + res['name'];
          familyname.innerText = 'نام‌خانوادگی : ' + res['last_name'];
          username.innerText = 'نام‌کاربری : ' + res['username'];
          device_id.innerText = 'سریال دستگاه : ' + res['device'];
          device_acc.innerText = 'دقت دستگاه : ' + res['device_acc'];
          if (res['device_mode'])
            device_mode.innerText = 'مود دستگاه : خودکار';
          else
            device_mode.innerText = 'مود دستگاه : دستی';




        });
      }
    });
  }

  userChangeShow() {
    const changepassForm = document.getElementById('change-user-form');
    changepassForm.hidden = false;
  }

  async changeUser() {
    const data = this.ChangeUserForm.value;
    const pass = data.password;
    const pass2 = data.password2;
    if (pass !== pass2 || pass.length == 0) {
      const toast = await this.toastController.create({
        message: 'کلمه عبور ها برابر نیست',
        duration: 2000
      });
      toast.present();
    }
    else {
      this.authService.getToken().then(res => {
        if (res) {
          this.authService.change_password_request(pass, res).subscribe(async res => {
            const toast = await this.toastController.create({
              message: res.toString(),
              duration: 2000
            });
            toast.present();
            const changepassForm = document.getElementById('change-user-form');
            changepassForm.hidden = true;
            const changeDeviceForm = document.getElementById('change-device-form');
            changeDeviceForm.hidden = true;
          });
        }
      });
    }


  }
  deviceChangedShow() {
    const changeDeviceForm = document.getElementById('change-device-form');
    changeDeviceForm.hidden = false;
  }

  async changeDevice() {
    const data = this.ChangeDeviceForm.value;
    const acc = data.acc;
    const mode = data.mode;
    if (acc && (acc < 0 || acc > 100)) {
      const toast = await this.toastController.create({
        message: 'دقت اشتباه است.',
        duration: 2000
      });
      toast.present();
    }
    else {
      this.authService.getToken().then(res => {
        if (res) {
          this.authService.change_device_request(mode, acc, res).subscribe(async res => {
            const toast = await this.toastController.create({
              message: res.toString(),
              duration: 2000
            });
            toast.present();
            const changepassForm = document.getElementById('change-user-form');
            changepassForm.hidden = true;
            const changeDeviceForm = document.getElementById('change-device-form');
            changeDeviceForm.hidden = true;
            this.ionViewWillEnter();
          });
        }
      });
    }
  }

  logout(){
    this.authService.logout();
  }

}  
