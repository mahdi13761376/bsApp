import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials: any) {
    return this.http.post(`${this.url}/register/`, credentials).pipe(
      tap(res => {
        this.showAlert('حساب کاربری شما ساخته شد.', true);
      }),
      catchError(e => {
        let error_message = '';
        if (e.error['username']) {
          error_message += e.error['username'] + '<br>';
        }
        if (e.error['password']) {
          error_message += e.error['password'] + '<br>';
        }
        if (e.error['email']) {
          error_message += e.error['email'] + '<br>';
        }

        this.showAlert(error_message);
        throw new Error(e);
      })
    );
  }

  login(credentials: any) {
    return this.http.post(`${this.url}/api/token/`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['access']);
          this.user = this.helper.decodeToken(res['access']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert('نام کاربری یا رمز عبور اشتباه است.');
          throw new Error(e);
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  getSpecialData() {
    return this.http.get(`${this.url}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg: string, reload = false) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present()).then(() => {
      if (reload) {
        window.location.reload();
      }

    });
  }

  getToken() {
    return this.storage.get(TOKEN_KEY);
  }

  ini_request(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.url}/ini/`, httpOptions).pipe(res => {
      return res;
    }
    )
  }

  add_device_request(token: string, acc: string, serial: string, mode: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.url}/add_device/?acc=` + acc + '&mode=' + mode + '&id=' + serial, httpOptions).pipe(res => {
      return res;
    }
    )
  }
  change_password_request(pass: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.get(`${this.url}/change_pass/?password=` + pass, httpOptions).pipe(
      res => {
        return res;
      });
  }

  change_device_request(mode: string, acc: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      })
    };
    if (mode)
      return this.http.get(`${this.url}/change_device/?mode=True&acc=` + acc, httpOptions).pipe(
        res => {
          return res;
        });
    else
      return this.http.get(`${this.url}/change_device/?mode=False&acc=` + acc, httpOptions).pipe(
        res => {
          return res;
        });

  }


  faces_request(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.url}/get_faces/`, httpOptions).pipe(res => {
      return res;
    }
    )
  }

  known_faces_request(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.url}/get_known_faces/`, httpOptions).pipe(res => {
      return res;
    }
    )
  }
}
