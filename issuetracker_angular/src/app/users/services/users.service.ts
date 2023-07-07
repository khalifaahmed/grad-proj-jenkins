import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../Dtos/UserDto';
import { enviroment } from 'src/enviroments/enviroment';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { AssignRoleDto } from 'src/app/adminstration/Dtos/AssignRoleDto';
import { AssignProjectDto } from 'src/app/projects/Dtos/AssignProjectDto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${enviroment.apiUrl}/api/users`, {
      withCredentials: true,
    });
  }

  GetUser(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${enviroment.apiUrl}/api/users/${id}`, {
      withCredentials: true,
    });
  }

  GetIssuesAssignedToUser(userId: string): Observable<IssueDto[]> {
    return this.http.get<IssueDto[]>(
      `${enviroment.apiUrl}/api/users/${userId}/issues`,
      { withCredentials: true }
    );
  }

  GetIssuesReportedByUser(userId: string): Observable<IssueDto[]> {
    return this.http.get<IssueDto[]>(
      `${enviroment.apiUrl}/api/users/${userId}/issuesReportedByUser`,
      { withCredentials: true }
    );
  }

  GetProjectsAssignedToUser(userId: string): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(
      `${enviroment.apiUrl}/api/users/${userId}/projects`,
      {
        withCredentials: true,
      }
    );
  }

  DeleteUser(id: string): Observable<object> {
    return this.http.delete(`${enviroment.apiUrl}/api/users/${id}`, {
      withCredentials: true,
    });
  }

  // Roles
  EditRolesForUser(
    userId: string,
    assignRoleDto: AssignRoleDto[]
  ): Observable<string[]> {
    return this.http.post<string[]>(
      `${enviroment.apiUrl}/api/users/${userId}/editroles`,
      assignRoleDto,
      { withCredentials: true }
    );
  }

  // edit projects
  EditProjectsForUser(
    userId: string,
    assignProjects: AssignProjectDto[]
  ): Observable<ProjectDto[]> {
    return this.http.post<ProjectDto[]>(
      `${enviroment.apiUrl}/api/users/${userId}/editprojects`,
      assignProjects,
      { withCredentials: true }
    );
  }
}
