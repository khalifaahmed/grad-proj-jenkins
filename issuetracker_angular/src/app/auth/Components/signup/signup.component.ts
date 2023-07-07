import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CheckEmailService } from '../../services/check-email.service';

interface signupForm {
  FirstName: FormControl<string>;
  LastName: FormControl<string>;
  Email: FormControl<string>;
  Password: FormControl<string>;
  ConfirmPassword: FormControl<string>;
  Image: FormControl<File>;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupBtnValue: string = 'Sign Up';
  singupBtnState: boolean = false;

  errors: string[] | null = null;
  showPassword: boolean = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  showConfirmPassword: boolean = false;
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  /**
   *
   */
  constructor(
    private auth: AuthService,
    private checkEmail: CheckEmailService,
    private router: Router
  ) {}

  Signup(): void {
    const formdata: FormData = new FormData();

    formdata.append('FirstName', this.SignupForm.get('FirstName')!.value);
    formdata.append('LastName', this.SignupForm.get('LastName')!.value);
    formdata.append('Email', this.SignupForm.get('Email')!.value);
    formdata.append('Password', this.SignupForm.get('Password')!.value);
    formdata.append(
      'ConfirmPassword',
      this.SignupForm.get('ConfirmPassword')!.value
    );
    formdata.append(
      'Image',
      (document.getElementById('signupUserImage') as HTMLInputElement).files![0]
    );

    this.auth.Signup(formdata).subscribe({
      next: () => {},
      error: (e) => {
        if (e.error.errors) {
          this.SignupForm.setErrors(e.error.errors);
          this.errors = e.error.errors;
        } else if (e.error.detail) {
          this.SignupForm.setErrors([e.error.detail]);
          this.errors = [e.error.detail];
        } else {
          this.SignupForm.setErrors([
            'somthing went wrong please try again later.',
          ]);
          this.errors = ['somthing went wrong please try again later.'];
        }
        // document.getElementById('signupBtn')!.removeAttribute('disabled');
        // document.getElementById('signupBtn')!.setAttribute('value', 'Sign Up');
        this.singupBtnState = false;
        this.signupBtnValue = 'Sign Up';
      },
      complete: () => {
        this.router.navigate(['success-register']);
      },
    });
  }

  onSubmit(): void {
    // console.log(this.SignupForm);

    if (this.SignupForm.valid) {
      // document.getElementById('signupBtn')!.setAttribute('disabled', 'true');
      // document
      //   .getElementById('signupBtn')!
      //   .setAttribute('value', 'Please Wait....');
      this.singupBtnState = true;
      this.signupBtnValue = 'Please Wait....';
      this.Signup();
    }
  }

  CheckPassword(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  get passwordMatchError() {
    return (
      this.SignupForm.getError('mismatch') &&
      this.SignupForm.get('ConfirmPassword')?.touched
    );
  }

  ChangeImage(input: Event) {
    if (
      (input.target as HTMLInputElement).files &&
      (input.target as HTMLInputElement).files!.length
    ) {
      const file = (input.target as HTMLInputElement).files![0];

      var reader = new FileReader();

      reader.onload = function (e) {
        document
          .getElementById('userImage')!
          .setAttribute('src', e.target!.result!.toString());
      };

      reader.readAsDataURL(file);
    }
  }

  SignupForm = new FormGroup<signupForm>(
    {
      FirstName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      LastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      Email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkEmail.validate.bind(this.checkEmail)],
        updateOn: 'blur',
      }),
      Password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      ConfirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      Image: new FormControl(),
    },
    [this.CheckPassword('Password', 'ConfirmPassword')]
  );
}
