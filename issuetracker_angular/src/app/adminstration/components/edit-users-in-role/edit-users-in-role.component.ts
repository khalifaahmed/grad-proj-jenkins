import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleDto } from '../../Dtos/RoleDto';
import { UsersService } from 'src/app/users/services/users.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { RolesService } from '../../services/roles.service';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit-users-in-role',
  templateUrl: './edit-users-in-role.component.html',
  styleUrls: ['./edit-users-in-role.component.css'],
})
export class EditUsersInRoleComponent implements OnInit {
  @Input() role!: RoleDto;

  @Output() isModalOpenEvent = new EventEmitter();
  @Output() assignedUsersEvent = new EventEmitter<UserDto[]>();

  isDataReady: Observable<boolean> = of(false);

  hideModal(): void {
    this.isModalOpenEvent.emit();
  }

  users: UserDto[] = [];
  assignUsers: AssignUserDto[] = [];

  /**
   *
   */
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.usersService.GetAllUsers().subscribe({
      next: (v) => {
        this.users = v;
      },
      complete: () => {
        this.AddUsersToFormArray();
      },
    });
  }

  AddUsersToFormArray(): void {
    for (const user of this.users) {
      const isSelected: boolean = user.roles.includes(this.role.name);

      this.assignUsers.push({
        email: user.email,
        image: user.image,
        isSelected: isSelected,
        userId: user.id,
      });
    }
    this.isDataReady = of(true);
  }

  edit(assignUsersDto: AssignUserDto[]): void {
    this.rolesService
      .EditUsersInRole(assignUsersDto, this.role.id)
      .subscribe((value) => {
        this.isModalOpenEvent.emit(false);
        this.assignedUsersEvent.emit(value);
      });
  }
}
