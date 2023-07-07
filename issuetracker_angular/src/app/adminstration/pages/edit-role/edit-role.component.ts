import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleDto } from '../../Dtos/RoleDto';
import { Location } from '@angular/common';
import { CreateRoleDto } from '../../Dtos/CreateRoleDto';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { errorMessage } from 'src/app/shared/Dtos/ErrorMessage';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent implements OnInit {
  role?: RoleDto;
  editBtnValue: string = 'Edit Role';
  editBtnState: boolean = false;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private router: Router,
    public location: Location,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.rolesService.GetRole(id).subscribe({
      next: (v) => {
        this.role = v;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
      complete: () => {
        this.EditRoleForm.reset({
          Name: this.role!.name,
        });
      },
    });
  }

  EditRoleForm = new FormGroup<{ Name: FormControl<string> }>({
    Name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.EditRoleForm.valid) {
      this.editBtnState = true;
      this.editBtnValue = 'Wait...';

      this.Edit();
    }
  }

  Edit(): void {
    const editRoleDto: CreateRoleDto = { name: this.EditRoleForm.value.Name! };

    this.rolesService.UpdateRole(editRoleDto, this.role!.id).subscribe({
      next: (v) => {
        this.role = v;
      },
      error: (e) => {
        if (e.error.errors) {
          let errors: errorMessage[] = e.error.errors;
          this.EditRoleForm.setErrors(errors);
        } else if (e.error.detail) {
          this.EditRoleForm.setErrors([
            {
              description: e.error.detail,
            },
          ]);
        } else {
          this.EditRoleForm.setErrors([
            {
              description: 'something went wrong. try again later',
            },
          ]);
        }

        this.editBtnState = false;
        this.editBtnValue = 'Edit Role';
      },
      complete: () => {
        this.toast.show(
          `updated role { ${this.role!.name} } successfully ✔✔✔`,
          5,
          ToastType.Success
        );
        this.editBtnState = false;
        this.editBtnValue = 'Edit Role';
      },
    });
  }
}
