import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueDto } from '../Dtos/IssueDto';
import { enviroment } from 'src/enviroments/enviroment';
import { CreateIssueDto } from '../Dtos/CreateIssueDto';
import { UpdateIssueDto } from '../Dtos/UpdateIssueDto';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';
import { CloseIssueDto } from '../Dtos/CloseIssueDto';
import { AssignPriorityDto } from 'src/app/priority/Dto/AssignPriorityDto';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  constructor(private http: HttpClient) {}

  GetAllIssues(): Observable<IssueDto[]> {
    return this.http.get<IssueDto[]>(`${enviroment.apiUrl}/api/issues`, {
      withCredentials: true,
    });
  }

  GetIssue(id: string): Observable<IssueDto> {
    return this.http.get<IssueDto>(`${enviroment.apiUrl}/api/issues/${id}`, {
      withCredentials: true,
    });
  }

  CreateNewIssue(issue: CreateIssueDto): Observable<IssueDto> {
    return this.http.post<IssueDto>(`${enviroment.apiUrl}/api/issues`, issue, {
      withCredentials: true,
    });
  }

  UpdateIssue(issue: UpdateIssueDto, id: string): Observable<IssueDto> {
    return this.http.put<IssueDto>(
      `${enviroment.apiUrl}/api/issues/${id}`,
      issue,
      {
        withCredentials: true,
      }
    );
  }

  DeleteIssue(id: string): Observable<object> {
    return this.http.delete(`${enviroment.apiUrl}/api/issues/${id}`, {
      withCredentials: true,
    });
  }

  CloseIssue(id: string, closeIssueDto: CloseIssueDto): Observable<IssueDto> {
    return this.http.post<IssueDto>(
      `${enviroment.apiUrl}/api/issues/${id}/close`,
      closeIssueDto,
      { withCredentials: true }
    );
  }

  GetProjectOfIssue(issueId: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(
      `${enviroment.apiUrl}/api/issues/${issueId}/project`,
      { withCredentials: true }
    );
  }

  getUsersAssignedToIssue(issueId: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${enviroment.apiUrl}/api/issues/${issueId}/users`,
      { withCredentials: true }
    );
  }

  // Edit Users in issue
  EditUsersInIssue(
    issueId: string,
    newUsers: AssignUserDto[]
  ): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(
      `${enviroment.apiUrl}/api/issues/${issueId}/editusers`,
      newUsers,
      { withCredentials: true }
    );
  }

  // get users that can be assigned to issue
  GetUsersThatCanBeAssignedToIssue(issueId: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${enviroment.apiUrl}/api/issues/${issueId}/usersthatcanbeassigned`,
      { withCredentials: true }
    );
  }

  // get issue tags
  // update issue tags
  // get issue priority

  // update issue priority
  UpdateIssuePriority(
    prioirty: AssignPriorityDto,
    issueId: string
  ): Observable<IssueDto> {
    return this.http.post<IssueDto>(
      `${enviroment.apiUrl}/api/issues/${issueId}/priority`,
      prioirty,
      { withCredentials: true }
    );
  }
}
