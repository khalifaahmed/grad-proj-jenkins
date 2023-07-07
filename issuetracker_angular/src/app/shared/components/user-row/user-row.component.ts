import { Component, Input } from '@angular/core';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { UsersService } from 'src/app/users/services/users.service';
import { enviroment } from 'src/enviroments/enviroment';
import { ToastService } from '../../services/toast.service';
import { ToastType } from '../../Dtos/Toast';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent {
  @Input() user!: UserDto;
  @Input() showActions: boolean = true;
  isModalOpen: boolean = false;
  baseImageUrl = enviroment.awsUrl;

  /**
   *
   */
  constructor(
    private usersService: UsersService,
    private toast: ToastService
  ) {}

  showConfirmDelete(): void {
    this.isModalOpen = true;
  }

  hideConfirmDelete(): void {
    this.isModalOpen = false;
  }

  DeleteUser(): void {
    this.usersService.DeleteUser(this.user!.id).subscribe({
      error: (e) => {
        this.isModalOpen = false;

        this.toast.show(
          `${e.error.detail || 'somthing went wrong please try again later.'}`,
          5,
          ToastType.Error
        );
      },
      complete: () => {
        location.reload();
      },
    });
  }
}
