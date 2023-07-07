import { Component, Input } from '@angular/core';
import { UserDto } from '../../Dtos/UserDto';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
})
export class UserRolesComponent {
  @Input() user?: UserDto;

  isRolesModalOpen: boolean = false;

  showRolesModal() {
    this.isRolesModalOpen = true;
  }

  hideRolesModal() {
    this.isRolesModalOpen = false;
  }

  // collectNewRolesFromEvent
  newRoles(newRoles: string[]) {
    this.user!.roles = newRoles;
  }
}
