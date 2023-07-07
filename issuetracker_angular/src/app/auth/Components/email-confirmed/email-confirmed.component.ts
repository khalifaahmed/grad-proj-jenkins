import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.css'],
})
export class EmailConfirmedComponent implements AfterViewInit, OnInit {
  success: boolean | null = null;
  userId: string | null = null;
  token: string | null = null;
  /**
   *
   */
  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['userId'];
    this.token = this.route.snapshot.queryParams['token'];
  }

  ngAfterViewInit(): void {
    if (this.userId === null || this.token === null) {
      setTimeout(() => {
        this.success = false;
      }, 3000);
    } else {
      this.auth.ConfirmEmail(this.userId, this.token).subscribe({
        next: () => {},
        error: () => {
          this.success = false;
        },
        complete: () => {
          this.success = true;
        },
      });
    }
  }
}
