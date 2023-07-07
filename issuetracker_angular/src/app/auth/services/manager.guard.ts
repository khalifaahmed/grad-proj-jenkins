import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.USER?.roles.includes('manager')) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
