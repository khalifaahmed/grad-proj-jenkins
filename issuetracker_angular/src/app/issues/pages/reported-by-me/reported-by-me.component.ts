import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { UsersService } from 'src/app/users/services/users.service';
import { IssueDto } from '../../Dtos/IssueDto';

@Component({
  selector: 'app-reported-by-me',
  templateUrl: './reported-by-me.component.html',
  styleUrls: ['./reported-by-me.component.css'],
})
export class ReportedByMeComponent implements OnInit {
  user!: UserDto;
  issues: IssueDto[] = [];
  /**
   *
   */
  constructor(private auth: AuthService, private userService: UsersService) {}

  ngOnInit(): void {
    this.user = this.auth.USER!;
    this.userService.GetIssuesReportedByUser(this.user.id).subscribe({
      next: (issues) => {
        this.issues = issues;
      },
    });
  }
}
