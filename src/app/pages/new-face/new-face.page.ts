import { Component, OnInit } from '@angular/core';

import { AppModule } from '../../app.module';
import { environment } from '../../../environments/environment';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as headtrackr from  '../new-face/headtracker';
import { AuthService } from 'src/app/services/auth.service';




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

  ngOnInit() {
    this.authService.getToken().then(res => {
      if (res) {
        this.authService.add_face_request(res).subscribe(res => {
          console.log(res);
        });
      }
    });
  }

  checkNameAndFamily(){
    this.name = (<HTMLInputElement> document.getElementById('name')).value;
    this.family =(<HTMLInputElement> document.getElementById('family')).value;
    if (this.name!='' && this.family!=''){
      return true;
    }
    return false;

  }

  // // addPhotoToGallery() {
  // //   faceDetection.takePicture(function(base64Data){
  // //     /* code here */
  // //   });
  // }
  @ViewChild('overlay') canvasOverlay: ElementRef;
  @ViewChild('image') canvasImage: ElementRef;
  public canvasOverlayNe: any;
  constructor(public navCtrl: NavController, public platform: Platform, private authService: AuthService) {

  }

  ngAfterViewInit() {
    let canvasOverlayNe = this.canvasOverlay.nativeElement;
    this.init(canvasOverlayNe);
  }

  init(canvasOverlayNe: any) {
    this.platform.ready().then(() => {
      this.initDetection(canvasOverlayNe);
    });
  }

  public initDetection(canvasOverlayNe: { getContext: (arg0: string) => any; style: { position: string; top: string; zIndex: string; display: string; }; }) {
    var win: any = window;
    if (win.navigator) {
      navigator.getUserMedia({ video: true },
        function (stream) {

          let overlayContext = canvasOverlayNe.getContext('2d');

          canvasOverlayNe.style.position = "absolute";
          canvasOverlayNe.style.top = '0px';
          canvasOverlayNe.style.zIndex = '100001';
          canvasOverlayNe.style.display = 'block';

          var video = document.querySelector('video');
          video.srcObject = stream;
          var htracker = new headtrackr.Tracker();
          let canvas = document.querySelector('canvas');
          htracker.init(video, canvas);
          htracker.start();

          document.addEventListener("facetrackingEvent", function (event: any) {
            overlayContext.clearRect(0, 0, 320, 240);
            if (event.detection == "CS") {
              overlayContext.translate(event.x, event.y)
              overlayContext.rotate(event.angle - (Math.PI / 2));
              overlayContext.strokeStyle = "#00CC00";
              overlayContext.strokeRect((-(event.width / 2)) >> 0, (-(event.height / 2)) >> 0, event.width, event.height);
              overlayContext.rotate((Math.PI / 2) - event.angle);
              overlayContext.translate(-event.x, -event.y);
            }
          });
        }, function (err) {
          console.log("err: ", err);
        }
      );
    } else {
      console.log('phonertc is not defined');
    }
  }

  takePhoto() {
    let thatImage = "";
    let canvas = this.canvasImage.nativeElement;
    let videoGet = document.querySelector("video");
    canvas.width = videoGet.width;
    canvas.height = videoGet.height;
    canvas.getContext('2d').drawImage(videoGet, 0, 0, canvas.width, canvas.height);
    let img = canvas.toDataURL();
    console.log(img);
  }

}

