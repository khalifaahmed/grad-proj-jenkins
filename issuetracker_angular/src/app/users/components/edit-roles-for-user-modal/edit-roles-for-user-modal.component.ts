import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignRoleDto } from 'src/app/adminstration/Dtos/AssignRoleDto';
import { RoleDto } from 'src/app/adminstration/Dtos/RoleDto';
import { RolesService } from 'src/app/adminstration/services/roles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-roles-for-user-modal',
  templateUrl: './edit-roles-for-user-modal.component.html',
  styleUrls: ['./edit-roles-for-user-modal.component.css'],
})
export class EditRolesForUserModalComponent implements OnInit {
  @Input() userId?: string;
  @Input() userRoles?: string[] = [];
  @Output() newUserRolesEvent = new EventEmitter<string[]>();
  @Output() closeModalEvent = new EventEmitter();

  // close modal
  closeModal() {
    this.closeModalEvent.emit();
  }

  // btn value
  btnValue: string = 'Edit';
  btnState: boolean = false;

  roles: RoleDto[] = [];

  /**
   *
   */
  constructor(
    private rolesService: RolesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.editRolesForUserForm.controls.roles.clear();

    this.rolesService.GetAllRoles().subscribe({
      next: (v) => (this.roles = v),
      complete: () => {
        this.addRolesToTheForm();
      },
    });
  }

  // form
  editRolesForUserArray = new FormArray([
    new FormGroup({
      RoleId: new FormControl(),
      Name: new FormControl(),
      IsSelected: new FormControl(),
    }),
  ]);

  editRolesForUserForm = new FormGroup({
    roles: this.editRolesForUserArray,
  });

  // initialize form
  addRolesToTheForm() {
    for (const role of this.roles) {
      const isSelected: boolean = this.userRoles!.includes(role.name);

      const roleFormGroup = new FormGroup({
        RoleId: new FormControl(role.id, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        Name: new FormControl(role.name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        IsSelected: new FormControl(isSelected),
      });

      this.editRolesForUserForm.controls.roles.push(roleFormGroup);
    }
  }

  // submit form
  submit() {
    // change btn Value
    this.btnState = true;
    this.btnValue = 'wait....';
    // the array of roles to be sent to server
    const assignRoleDtos: AssignRoleDto[] = [];

    for (const role of this.editRolesForUserForm.controls.roles.value) {
      assignRoleDtos.push({
        roleId: role.RoleId,
        name: role.Name,
        isSelected: role.IsSelected,
      });
    }

    this.edit(assignRoleDtos);
  }

  edit(roles: AssignRoleDto[]) {
    this.userService.EditRolesForUser(this.userId!, roles).subscribe((v) => {
      // close modal
      this.closeModal();
      // emit new roles
      this.newUserRolesEvent.emit(v);
    });
  }
}
