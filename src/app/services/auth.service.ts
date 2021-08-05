import {Platform, AlertController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
import {environment} from '../../environments/environment';
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

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

  register(credentials) {
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

  login(credentials) {
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

  showAlert(msg, reload = false) {
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
}
