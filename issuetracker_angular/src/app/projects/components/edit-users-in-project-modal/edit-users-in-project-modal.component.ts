import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { UsersService } from 'src/app/users/services/users.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-edit-users-in-project-modal',
  templateUrl: './edit-users-in-project-modal.component.html',
  styleUrls: ['./edit-users-in-project-modal.component.css'],
})
export class EditUsersInProjectModalComponent implements OnInit {
  @Input() projectUsers!: UserDto[];
  @Input() projectId?: string;

  @Output() closeUsersModalEvent = new EventEmitter();
  @Output() assignedUsersEvent = new EventEmitter<UserDto[]>();

  hideModal() {
    this.closeUsersModalEvent.emit();
  }

  isDataReady: Observable<boolean> = of(false);
  allUsers: UserDto[] = [];
  assignUsers: AssignUserDto[] = [];

  /**
   *
   */
  constructor(
    private userService: UsersService,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe({
      next: (v) => {
        this.allUsers = v;
      },
      complete: () => {
        this.editAssignUsers();
      },
    });
  }

  editAssignUsers() {
    const projectUserIds = this.projectUsers.map((u) => {
      return u.id;
    });

    for (const user of this.allUsers) {
      const isSelected = projectUserIds.includes(user.id);

      this.assignUsers.push({
        email: user.email,
        image: user.image,
        isSelected: isSelected,
        userId: user.id,
      });
    }

    this.isDataReady = of(true);
  }

  edit(users: AssignUserDto[]) {
    this.projectService
      .EditUsersInProject(this.projectId!, users)
      .subscribe((v) => {
        this.hideModal();
        this.assignedUsersEvent.emit(v);
      });
  }
}
