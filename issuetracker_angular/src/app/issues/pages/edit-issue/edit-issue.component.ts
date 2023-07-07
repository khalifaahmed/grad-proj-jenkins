import { Component, OnInit } from '@angular/core';
import { IssueDto } from '../../Dtos/IssueDto';
import { IssuesService } from '../../services/issues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateIssueDto } from '../../Dtos/UpdateIssueDto';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css'],
})
export class EditIssueComponent implements OnInit {
  issue?: IssueDto;
  btnValue: string = 'Update';
  btnState: boolean = false;

  /**
   *
   */
  constructor(
    private issueService: IssuesService,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const issueId = this.route.snapshot.params['id'];

    this.issueService.GetIssue(issueId).subscribe({
      next: (v) => {
        this.issue = v;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
      complete: () => {
        // initialize form
        this.editIssueFormGroup.reset({
          Description: this.issue?.description,
          Id: this.issue?.id,
          ResoliotionSummary: this.issue?.resoliotionSummary,
          TargetResolutionDate: this.issue?.targetResolutionDate
            ?.toString()
            .split('T')[0],
          Title: this.issue?.title,
        });
      },
    });
  }

  editIssueFormGroup = new FormGroup({
    Id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    TargetResolutionDate: new FormControl(),
    ResoliotionSummary: new FormControl(),
  });

  submit() {
    if (this.editIssueFormGroup.valid) {
      this.btnState = true;
      this.btnValue = 'Wait....';

      const updateIssueDto: UpdateIssueDto = {
        description: this.editIssueFormGroup.controls.Description.value,
        id: this.editIssueFormGroup.controls.Id.value,
        resoliotionSummary:
          this.editIssueFormGroup.controls.ResoliotionSummary.value,
        targetResolutionDate:
          this.editIssueFormGroup.controls.TargetResolutionDate.value,
        title: this.editIssueFormGroup.controls.Title.value,
      };

      this.update(updateIssueDto);
    }
  }

  update(issue: UpdateIssueDto) {
    this.issueService.UpdateIssue(issue, issue.id).subscribe({
      error: (e) => {
        this.btnValue = 'Update';
        this.btnState = false;
        this.editIssueFormGroup.setErrors({
          0: e.error.detail || 'something went wrong 💥💥, try again later',
        });
      },
      complete: () => {
        this.toast.show(
          `updated issue {${issue.title}} issue successfully✔✔✔`,
          5,
          ToastType.Success
        );

        this.location.back();
      },
    });
  }
}
