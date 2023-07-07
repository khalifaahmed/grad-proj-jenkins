import { Component, Input, OnInit } from '@angular/core';
import { IssueDto } from '../../Dtos/IssueDto';
import { PriorityDto } from 'src/app/priority/Dto/PriorityDto';
import { PriorityService } from 'src/app/priority/services/priority.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignPriorityDto } from 'src/app/priority/Dto/AssignPriorityDto';
import { IssuesService } from '../../services/issues.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { CreatePriorityDto } from 'src/app/priority/Dto/CreatePriorityDto';

@Component({
  selector: 'app-edit-issue-priority',
  templateUrl: './edit-issue-priority.component.html',
  styleUrls: ['./edit-issue-priority.component.css'],
})
export class EditIssuePriorityComponent implements OnInit {
  @Input() issue!: IssueDto;

  allPriorities: PriorityDto[] = [];

  btnValue: string = 'Edit';
  btnState: boolean = false;

  createBtn: string = 'Create';
  createBtnState: boolean = false;

  /**
   *
   */
  constructor(
    private priorityService: PriorityService,
    private issueService: IssuesService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.priorityService.GetAllPriorities().subscribe({
      next: (v) => {
        this.allPriorities = v;
      },
      complete: () => {
        this.initializeSelectFormGroup();
      },
    });
  }

  initializeSelectFormGroup() {
    this.selectPriorityFormGroup.reset({
      PriorityId: this.issue.priority?.id,
    });
  }

  selectPriorityFormGroup = new FormGroup({
    PriorityId: new FormControl(),
  });

  submit() {
    this.btnState = true;
    this.btnValue = 'Wait....';

    const assignPriorityDto: AssignPriorityDto = {
      priorityId: this.selectPriorityFormGroup.controls.PriorityId.value,
    };

    this.update(assignPriorityDto);
  }

  update(priority: AssignPriorityDto) {
    this.issueService
      .UpdateIssuePriority(priority, this.issue.id)
      .subscribe((v) => {
        this.btnState = false;
        this.btnValue = 'Edit';
        this.issue = v;
        this.toast.show(
          `Updated priority successfully
        ✔✔✔`,
          3,
          ToastType.Success
        );
        this.initializeSelectFormGroup();
      });
  }

  // create new Priority and update
  createPriorityFormGroup = new FormGroup({
    Name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Color: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submitCreatepriority() {
    if (this.createPriorityFormGroup.valid) {
      this.createBtn = 'Wait...';
      this.createBtnState = true;
      const priority: CreatePriorityDto = {
        name: this.createPriorityFormGroup.controls.Name.value,
        color: this.createPriorityFormGroup.controls.Color.value,
      };
      this.createPriorityAndUpdate(priority);
    }
  }

  createPriorityAndUpdate(priority: CreatePriorityDto) {
    let createdPriority: PriorityDto;
    this.priorityService.CreatePriority(priority).subscribe({
      next: (v) => {
        createdPriority = v;
        this.allPriorities.push(v);
      },
      complete: () => {
        this.createBtn = 'Create';
        this.createBtnState = false;
        this.update({
          priorityId: createdPriority.id,
        });
      },
    });
  }
}
