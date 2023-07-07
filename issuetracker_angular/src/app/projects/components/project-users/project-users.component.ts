import { Component, Input } from '@angular/core';
import { UserDto } from 'src/app/users/Dtos/UserDto';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css'],
})
export class ProjectUsersComponent {
  @Input() users!: UserDto[];
  @Input() projectId?: string;

  isUsersModalOpen: boolean = false;

  showModal() {
    this.isUsersModalOpen = true;
  }

  hideModal() {
    this.isUsersModalOpen = false;
  }

  newUsers(users: UserDto[]) {
    this.users = users;
  }
}
