import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { CreateProjectDto } from '../Dtos/CreateProjectDto';
import { ProjectDto } from '../Dtos/ProjectDto';
import { UpdateProjectDto } from '../Dtos/UpdateProjectDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  GetAllProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(`${enviroment.apiUrl}/api/projects`, {
      withCredentials: true,
    });
  }

  GetProject(id: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(
      `${enviroment.apiUrl}/api/projects/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  CreateProject(project: CreateProjectDto): Observable<object> {
    return this.http.post(`${enviroment.apiUrl}/api/projects`, project, {
      withCredentials: true,
    });
  }

  DeleteProject(id: string): Observable<object> {
    return this.http.delete(`${enviroment.apiUrl}/api/projects/${id}`, {
      withCredentials: true,
    });
  }

  UpdateProject(
    updateProjectDto: UpdateProjectDto,
    id: string
  ): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(
      `${enviroment.apiUrl}/api/projects/${id}`,
      updateProjectDto,
      { withCredentials: true }
    );
  }

  GetUsersAssignedToProject(projectId: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${enviroment.apiUrl}/api/projects/${projectId}/users`,
      { withCredentials: true }
    );
  }

  // edit users in project
  EditUsersInProject(
    projectId: string,
    users: AssignUserDto[]
  ): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(
      `${enviroment.apiUrl}/api/projects/${projectId}/editusers`,
      users,
      { withCredentials: true }
    );
  }

  GetIssuesInProject(projectId: string): Observable<IssueDto[]> {
    return this.http.get<IssueDto[]>(
      `${enviroment.apiUrl}/api/projects/${projectId}/issues`,
      { withCredentials: true }
    );
  }
}
