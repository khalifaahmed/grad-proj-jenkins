import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignProjectDto } from 'src/app/projects/Dtos/AssignProjectDto';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { ProjectsService } from 'src/app/projects/services/projects.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-project-for-user-modal',
  templateUrl: './edit-project-for-user-modal.component.html',
  styleUrls: ['./edit-project-for-user-modal.component.css'],
})
export class EditProjectForUserModalComponent implements OnInit {
  @Input() userId!: string;
  @Input() userProjects!: ProjectDto[];
  @Output() closeModalEvent = new EventEmitter();
  @Output() newProjectsEvent = new EventEmitter<ProjectDto[]>();

  closeProjectsModal() {
    this.closeModalEvent.emit();
  }

  btnValue: string = 'Edit';
  btnState: boolean = false;
  /**
   *
   */
  constructor(
    private projectService: ProjectsService,
    private userService: UsersService
  ) {}

  projects: ProjectDto[] = [];

  ngOnInit(): void {
    this.projectService.GetAllProjects().subscribe({
      next: (v) => {
        this.projects = v;
      },
      complete: () => {
        this.editProjectsForm.controls.projects.clear();
        this.addProjectsToForm();
      },
    });
  }

  // form
  editProjectsArray = new FormArray([
    new FormGroup({
      ProjectId: new FormControl(),
      Name: new FormControl(),
      IsSelected: new FormControl(),
    }),
  ]);

  editProjectsForm = new FormGroup({
    projects: this.editProjectsArray,
  });

  // initialize form
  addProjectsToForm() {
    for (const project of this.projects) {
      const projectNames = this.userProjects.map((p) => p.name);
      const isSelected: boolean = projectNames.includes(project.name);

      const projectFormGroup = new FormGroup({
        ProjectId: new FormControl(project.id, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        Name: new FormControl(project.name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        IsSelected: new FormControl(isSelected),
      });

      this.editProjectsForm.controls.projects.push(projectFormGroup);
    }
  }

  submit() {
    this.btnValue = 'Wait....';
    this.btnState = true;

    console.log(this.editProjectsForm.controls.projects.value);

    const assignProjects: AssignProjectDto[] = [];

    for (const project of this.editProjectsForm.controls.projects.value) {
      assignProjects.push({
        projectId: project.ProjectId,
        name: project.Name,
        isSelected: project.IsSelected,
      });
    }

    this.edit(assignProjects);
  }

  edit(assignProjects: AssignProjectDto[]) {
    this.userService
      .EditProjectsForUser(this.userId, assignProjects)
      .subscribe((v) => {
        this.closeProjectsModal();
        this.newProjectsEvent.emit(v);
      });
  }
}
