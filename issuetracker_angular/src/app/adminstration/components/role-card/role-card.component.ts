import { Component, Input } from '@angular/core';
import { RoleDto } from '../../Dtos/RoleDto';
import { RolesService } from '../../services/roles.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';

@Component({
  selector: 'app-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.css'],
})
export class RoleCardComponent {
  @Input() role!: RoleDto;

  isModalOpen: boolean = false;

  /**
   *
   */
  constructor(
    private rolesService: RolesService,
    private toast: ToastService
  ) {}

  showConfirmDelete(): void {
    this.isModalOpen = true;
  }

  hideConfirmDelete(): void {
    this.isModalOpen = false;
  }

  DeleteRole(): void {
    this.rolesService.DeleteRole(this.role.id).subscribe({
      error: (e) => {
        this.toast.show(
          e.error.detail || 'somthing went wrong. please try again later',
          5,
          ToastType.Error
        );

        this.isModalOpen = false;
      },
      complete: () => {
        location.reload();
      },
    });
  }
}
