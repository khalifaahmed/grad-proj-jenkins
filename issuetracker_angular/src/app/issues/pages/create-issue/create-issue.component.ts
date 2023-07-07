import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { ProjectsService } from 'src/app/projects/services/projects.service';
import { CreateIssueDto } from '../../Dtos/CreateIssueDto';
import { IssuesService } from '../../services/issues.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { Router } from '@angular/router';

interface createIssueForm {
  Title: FormControl<string>;
  Description: FormControl<string>;
  ProjectId: FormControl<string>;
}

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css'],
})
export class CreateIssueComponent implements OnInit {
  projects: ProjectDto[] = [];

  btnValue: string = 'Create';
  btnStatus: boolean = false;

  /**
   *
   */
  constructor(
    private projectsSercice: ProjectsService,
    private issuesService: IssuesService,
    public location: Location,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectsSercice
      .GetAllProjects()
      .subscribe((value) => (this.projects = value));
  }

  createIssueForm = new FormGroup<createIssueForm>({
    Title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ProjectId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.createIssueForm.valid) {
      this.btnStatus = true;
      this.btnValue = 'Wait...';
      this.create();
    }
  }

  create(): void {
    const createIssueDto: CreateIssueDto = {
      title: this.createIssueForm.value.Title!,
      description: this.createIssueForm.value.Description!,
      projectId: this.createIssueForm.value.ProjectId!,
    };

    this.issuesService.CreateNewIssue(createIssueDto).subscribe({
      next: (v) => {
        this.router.navigate([`/issues/issue/${v.id}`]);
      },
      error: (e) => {
        this.btnStatus = false;
        this.btnValue = 'Create';
        this.createIssueForm.setErrors({
          0: e.error.detail || 'something went wrong💥, try again later',
        });
      },
      complete: () => {
        this.toast.show(
          `Created issue "${createIssueDto.title}" successfully`,
          5,
          ToastType.Error
        );
      },
    });
  }
}
