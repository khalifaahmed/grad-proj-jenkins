import { Component, Input, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { Observable, of } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { RoleDto } from '../../Dtos/RoleDto';

@Component({
  selector: 'app-users-in-role',
  templateUrl: './users-in-role.component.html',
  styleUrls: ['./users-in-role.component.css'],
})
export class UsersInRoleComponent implements OnInit {
  @Input() role!: RoleDto;

  users!: Observable<UserDto[]>;
  imageBaseUrl = enviroment.awsUrl;

  isModalOpen: boolean = false;
  /**
   *
   */
  constructor(private rolesSerivce: RolesService) {}

  ngOnInit(): void {
    this.users = this.rolesSerivce.GetUsersInRole(this.role.id);
  }

  trackByFn(_index: number, user: UserDto): string {
    return user.id;
  }

  showModal(): void {
    this.isModalOpen = true;
  }

  hideModal(): void {
    this.isModalOpen = false;
  }

  collectNewUsers(users: UserDto[]) {
    this.users = of(users);
  }
}
