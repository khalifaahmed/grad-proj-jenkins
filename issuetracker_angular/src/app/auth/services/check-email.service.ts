import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CheckEmailService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<boolean>(
        `${enviroment.apiUrl}/api/account/isEmailUsed?email=${control.value}`
      )
      .pipe(map((isUsed) => (isUsed ? { usedEmail: true } : null)));
  }
}
