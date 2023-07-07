import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.css'],
})
export class SelectUsersComponent implements OnInit {
  @Input() users!: AssignUserDto[];
  @Output() newUsersEvent = new EventEmitter<AssignUserDto[]>();
  @Output() closeModalEvent = new EventEmitter();

  imageBaseUrl = enviroment.awsUrl;

  hideModal() {
    this.closeModalEvent.emit();
  }

  btnValue: string = 'Edit';
  btnState: boolean = false;

  ngOnInit(): void {
    this.assignUsersForm.controls.usersForm.clear();
    this.AddUsersToFormArray();
  }

  assignUsersForm = new FormGroup({
    usersForm: new FormArray([
      new FormGroup({
        Email: new FormControl(),
        UserId: new FormControl(),
        IsSelected: new FormControl(),
        Image: new FormControl(),
      }),
    ]),
  });

  AddUsersToFormArray(): void {
    for (const user of this.users) {
      const userFormGroup = new FormGroup({
        Email: new FormControl(user.email, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        UserId: new FormControl(user.userId, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        IsSelected: new FormControl(user.isSelected),
        Image: new FormControl(user.image),
      });

      this.assignUsersForm.controls.usersForm.push(userFormGroup);
    }
  }

  submit(): void {
    this.btnValue = 'Wait....';
    this.btnState = true;

    this.edit();
  }

  edit(): void {
    const assignUsersDto: AssignUserDto[] = [];
    for (const user of this.assignUsersForm.value.usersForm!) {
      assignUsersDto.push({
        email: user.Email,
        userId: user.UserId,
        isSelected: user.IsSelected,
        image: user.Image,
      });
    }

    this.newUsersEvent.emit(assignUsersDto);
  }
}
