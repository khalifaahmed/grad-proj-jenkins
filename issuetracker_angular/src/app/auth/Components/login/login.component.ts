import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/users/Dtos/LoginDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { AuthService } from '../../services/auth.service';

interface LoginForm {
  Email: FormControl<string>;
  Password: FormControl<string>;
  RememberMe: FormControl<boolean>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: boolean = false;
  loginBtnValue: string = 'LOGIN';
  loginBtnState: boolean = false;
  /**
   *
   */
  constructor(private auth: AuthService, private router: Router) {}

  LoginForm = new FormGroup<LoginForm>({
    Email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    Password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    RememberMe: new FormControl(false, { nonNullable: true }),
  });

  onSubmit() {
    if (this.LoginForm.valid) {
      // document.getElementById('loginBtn')!.setAttribute('disabled', 'true');
      // document
      //   .getElementById('loginBtn')!
      //   .setAttribute('value', 'Please Wait....');

      this.loginBtnState = true;
      this.loginBtnValue = 'Please Wait....';
      this.Login();
    }
  }

  Login(): void {
    const loginDto: LoginDto = {
      Email: this.LoginForm.value.Email!,
      Password: this.LoginForm.value.Password!,
      RememberMe: this.LoginForm.value.RememberMe!,
    };

    this.auth.Login(loginDto).subscribe({
      next: (userDto: UserDto) => {
        // console.log('data', userDto);
        this.auth.USER = userDto;
      },
      error: (err) => {
        // console.log('error', err);
        this.LoginForm.setErrors({
          0: err.error?.detail || 'somthing went wrong try again later',
        });
        // document.getElementById('loginBtn')!.removeAttribute('disabled');
        // document.getElementById('loginBtn')!.setAttribute('value', 'LOGIN');
        this.loginBtnState = false;
        this.loginBtnValue = 'LOGIN';
      },
      complete: () => {
        // console.log('complete');
        if (this.auth.USER?.roles.includes('manager')) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/issues/assigned-to-me']);
        }
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
