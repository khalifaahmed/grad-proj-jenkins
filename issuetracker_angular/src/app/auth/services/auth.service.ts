import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginDto } from 'src/app/users/Dtos/LoginDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER: UserDto | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  Login(LoginDto: LoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${enviroment.apiUrl}/api/account/login`,
      LoginDto,
      {
        withCredentials: true,
      }
    );
  }

  Logout(): void {
    this.http
      .post(
        `${enviroment.apiUrl}/api/account/logout`,
        {},
        { withCredentials: true }
      )
      .subscribe({
        complete: () => {
          this.USER = null;
          this.router.navigate(['login']);
        },
      });
  }

  Signup(user: FormData): Observable<object> {
    return this.http.post(`${enviroment.apiUrl}/api/account/signup`, user);
  }

  ConfirmEmail(userId: string, token: string): Observable<object> {
    return this.http.get(`${enviroment.apiUrl}/api/account/EmailConfirmed`, {
      params: { userId, token },
    });
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.USER !== null) {
      return true;
    }

    const res: UserDto | false = await firstValueFrom(
      this.http.get<UserDto>(
        `${enviroment.apiUrl}/api/account/isAuthenticted`,
        { withCredentials: true }
      )
    ).catch(() => false);

    if (res) {
      this.USER = res;
      return true;
    } else {
      this.USER = null;
      return false;
    }
  }
}
