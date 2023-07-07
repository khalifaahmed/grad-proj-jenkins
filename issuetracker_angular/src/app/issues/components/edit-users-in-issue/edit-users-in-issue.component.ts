import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-edit-users-in-issue',
  templateUrl: './edit-users-in-issue.component.html',
  styleUrls: ['./edit-users-in-issue.component.css'],
})
export class EditUsersInIssueComponent implements OnInit {
  @Input() issueUsers!: UserDto[];
  @Input() issueId?: string;

  @Output() hideModalEvent = new EventEmitter();
  @Output() newAssignedUsersEvent = new EventEmitter<UserDto[]>();

  hideModal() {
    this.hideModalEvent.emit();
  }

  isDataReady: Observable<boolean> = of(false);
  usersThatCanBeAssigned: UserDto[] = [];
  usersToSelectFrom: AssignUserDto[] = [];

  /**
   *
   */
  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.issueService
      .GetUsersThatCanBeAssignedToIssue(this.issueId!)
      .subscribe({
        next: (v) => {
          this.usersThatCanBeAssigned = v;
        },
        complete: () => {
          this.editUsersToSelectFrom();
        },
      });
  }

  editUsersToSelectFrom() {
    const issueUsersIds = this.issueUsers.map((u) => u.id);

    for (const user of this.usersThatCanBeAssigned) {
      const isSelected: boolean = issueUsersIds.includes(user.id);

      this.usersToSelectFrom.push({
        email: user.email,
        image: user.image,
        isSelected: isSelected,
        userId: user.id,
      });
    }

    this.isDataReady = of(true);
  }

  update(users: AssignUserDto[]) {
    this.issueService.EditUsersInIssue(this.issueId!, users).subscribe((v) => {
      this.hideModal();
      this.newAssignedUsersEvent.emit(v);
    });
  }
}
