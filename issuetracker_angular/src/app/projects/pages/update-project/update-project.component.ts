import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDto } from '../../Dtos/ProjectDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateProjectDto } from '../../Dtos/UpdateProjectDto';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';

interface IUpdateProjectForm {
  Id: FormControl<string>;
  Name: FormControl<string>;
  StartDate: FormControl<Date>;
  TargetEndDate: FormControl<Date>;
  ActualEndDate: FormControl<Date>;
}

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],
})
export class UpdateProjectComponent implements OnInit {
  project!: ProjectDto;
  updateProjectForm: FormGroup;

  btnValue: string = 'Update';
  btnState: boolean = false;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router,
    public location: Location,
    private toast: ToastService
  ) {
    this.updateProjectForm = new FormGroup<IUpdateProjectForm>({
      Id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      Name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      StartDate: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      TargetEndDate: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ActualEndDate: new FormControl(new Date(), {
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.projectsService.GetProject(id).subscribe({
      next: (v) => {
        // console.log('data', v);
        this.project = v;
      },
      error: () => {
        this.router.navigate(['/notfound']);
      },
      complete: () => {
        // console.log('complete', this.project);
        this.updateProjectForm.reset({
          Id: this.project.id,
          Name: this.project.name,
          StartDate: this.project.startDate.toString().split('T')[0],
          TargetEndDate: this.project.targetEndDate.toString().split('T')[0],
          ActualEndDate: this.project.actualEndDate.toString().split('T')[0],
        });
        // console.log(this.updateProjectForm);
      },
    });
  }

  get Id(): string {
    return this.updateProjectForm.value.Id;
  }

  get Name(): string {
    return this.updateProjectForm.value.Name;
  }

  get StartDate(): Date {
    return this.updateProjectForm.value.StartDate;
  }

  get TargetEndDate(): Date {
    return this.updateProjectForm.value.TargetEndDate;
  }

  get ActualEndDate(): Date {
    return this.updateProjectForm.value.ActualEndDate;
  }

  submit(): void {
    // console.log(this.updateProjectForm);
    if (this.updateProjectForm.valid) {
      this.btnValue = 'Please Wait...';
      this.btnState = true;
      this.update();
    }
  }

  update(): void {
    let updateProjectDto: UpdateProjectDto = {
      id: this.updateProjectForm.value.Id!,
      name: this.updateProjectForm.value.Name!,
      startDate: this.updateProjectForm.value.StartDate!,
      targetEndDate: this.updateProjectForm.value.TargetEndDate!,
      actualEndDate: this.updateProjectForm.value.ActualEndDate!,
    };

    this.projectsService
      .UpdateProject(updateProjectDto, this.project!.id)
      .subscribe({
        error: (e) => {
          this.btnValue = 'Update';
          this.btnState = false;
          // console.log(e);
          this.updateProjectForm.setErrors({
            0: e.error.detail || 'something went wrong!💥💥, try again later',
          });
        },
        complete: () => {
          this.toast.show(
            `updated project {${this.project!.name}} successfully✔✔✔`,
            5,
            ToastType.Success
          );
          this.location.back();
        },
      });
  }
}
