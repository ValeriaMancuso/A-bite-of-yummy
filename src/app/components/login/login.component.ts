import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  hide = true;

  onSubmit(form: NgForm) {

    console.log(form.value);
    try {
      this.authSrv.login(form.value).pipe(tap(res => {localStorage.setItem('UserData', JSON.stringify(res.user)),sessionStorage.setItem("UserData", JSON.stringify(res.user))})).subscribe();

      this.router.navigate(['home'])
    } catch (error) {

      console.error(error)
    }
  }
}
