import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CreateProjectDto } from '../../Dtos/CreateProjectDto';
import { ProjectsService } from '../../services/projects.service';

interface CreateProject {
  Name: FormControl<string>;
  StartDate: FormControl<Date>;
  TargetEndDate: FormControl<Date>;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  createBtnValue: string = 'Create Project';
  createBtnState: boolean = false;
  /**
   *
   */
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    public location: Location,
    private toast: ToastService
  ) {}

  createProjectForm = new FormGroup<CreateProject>({
    Name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    StartDate: new FormControl(),
    TargetEndDate: new FormControl(),
  });

  Submit(): void {
    // console.log(this.createProjectForm);

    if (this.createProjectForm.valid) {
      // document
      //   .getElementById('createProjectBtn')
      //   ?.setAttribute('value', 'Please Wait....');

      // document
      //   .getElementById('createProjectBtn')
      //   ?.setAttribute('disabled', 'true');
      this.createBtnState = true;
      this.createBtnValue = 'Please Wait....';
      this.Create();
    }
  }

  Create(): void {
    const project: CreateProjectDto = {
      name: this.createProjectForm.value.Name!,
      startDate: this.createProjectForm.value.StartDate!,
      targetEndDate: this.createProjectForm.value.TargetEndDate!,
    };

    this.projectsService.CreateProject(project).subscribe({
      error: (e) => {
        // console.log('error', e);
        this.createProjectForm.setErrors({
          0: e.error.detail || 'somthing went wrong try again later',
        });

        // document
        //   .getElementById('createProjectBtn')
        //   ?.setAttribute('value', 'Create Project');

        // document
        //   .getElementById('createProjectBtn')
        //   ?.removeAttribute('disabled');
        this.createBtnState = false;
        this.createBtnValue = 'Create Project';
      },
      complete: () => {
        // console.log('complete');
        this.router.navigate(['/projects']);
        this.toast.show(
          `Created project ${project.name} successfully`,
          5,
          ToastType.Success
        );
      },
    });
  }
}
