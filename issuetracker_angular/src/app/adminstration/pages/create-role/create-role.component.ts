import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { Location } from '@angular/common';
import { CreateRoleDto } from '../../Dtos/CreateRoleDto';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { errorMessage } from 'src/app/shared/Dtos/ErrorMessage';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent {
  createBtnValue: string = 'Create Role';
  createBtnState: boolean = false;
  /**
   *
   */
  constructor(
    private rolesService: RolesService,
    public location: Location,
    private toast: ToastService
  ) {}

  createRoleForm = new FormGroup<{ Name: FormControl<string> }>({
    Name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.createRoleForm.valid) {
      this.createBtnValue = 'Wait....';
      this.createBtnState = true;

      this.Create();
    }
  }

  Create(): void {
    let createRoleDto: CreateRoleDto = {
      name: this.createRoleForm.value.Name!,
    };

    this.rolesService.CreateRole(createRoleDto).subscribe({
      error: (e) => {
        if (e.error.errors) {
          let errors: errorMessage[] = e.error.errors;
          this.createRoleForm.setErrors(errors);
        } else {
          this.createRoleForm.setErrors([
            {
              description: 'something went wrong. try again later',
            },
          ]);
        }
        this.createBtnValue = 'Create';
        this.createBtnState = false;
      },
      complete: () => {
        this.toast.show(
          `Created role "${createRoleDto.name}" successfully✔✔✔`,
          5,
          ToastType.Success
        );
        this.location.back();
      },
    });
  }
}
