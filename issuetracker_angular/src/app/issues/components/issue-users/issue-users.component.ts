import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';

@Component({
  selector: 'app-issue-users',
  templateUrl: './issue-users.component.html',
  styleUrls: ['./issue-users.component.css'],
})
export class IssueUsersComponent {
  @Input() users!: UserDto[];
  @Input() issueId?: string;

  /**
   *
   */
  constructor(public authService: AuthService) {}

  isSelectUsersModalOpen: boolean = false;

  showSelectUsersModal() {
    this.isSelectUsersModalOpen = true;
  }

  hideSelectUsersModal() {
    this.isSelectUsersModalOpen = false;
  }

  newUsers(newUsers: UserDto[]) {
    this.users = newUsers;
  }
}
