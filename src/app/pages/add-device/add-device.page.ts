import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
  addForm: FormGroup;

  constructor(private router: Router,private authService: AuthService, private formBuilder: FormBuilder, private toastController: ToastController) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      serial: ['', [Validators.required]],
      acc: ['', [Validators.required]],
      mode: ['', [Validators.required]]
    });
  }

  async addDevice() {
    const data = this.addForm.value;
    if (data.acc < 0 || data.acc > 100) {
      const toast = await this.toastController.create({
        message: 'دقت نا معتبر است',
        duration: 2000
      });
      toast.present();
    }
    else {
      const acc = data.acc;
      const serial = data.serial;
      let mode = "False"
      if (data.mode) {
        const mode = 'True';
      }
      this.authService.getToken().then(res => {
        if (res) {
          this.authService.add_device_request(res, acc, serial, mode).subscribe(
            (res: string) => {
              this.router.navigate(['/main'])
            },
            async (error: any) => {
              console.log(error);
              const toast = await this.toastController.create({
                message: error.error,
                duration: 2000
              });
              toast.present();
            });
        }
      });
    }

  }

}
