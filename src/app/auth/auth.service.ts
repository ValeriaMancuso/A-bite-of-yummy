import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService()
  url = 'http://localhost:4201';

  private authSbj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSbj.asObservable();
  timeoutLogout: any;

  constructor(private http: HttpClient, private router:Router) {
    this.restore();
  }

  login(data: {email: string; password: string}) {
    return this.http.post<AuthData>(`${this.url}/login`, data).pipe(tap((data) => {
      console.log(data);
      this.authSbj.next(data);
      localStorage.setItem('user', JSON.stringify(data));

    }));
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
      return
    }
    this.authSbj.next(userdata)


  }

  registration(data: {name: string; email: string; password: string}) {
    return this.http.post<AuthData>(`${this.url}/register`, data);
  }

  logout() {
    this.authSbj.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
  }
}


