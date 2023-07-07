import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDto } from '../Dtos/RoleDto';
import { enviroment } from 'src/enviroments/enviroment';
import { CreateRoleDto } from '../Dtos/CreateRoleDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { AssignUserDto } from 'src/app/users/Dtos/AssignUserDto';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  GetAllRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(`${enviroment.apiUrl}/api/roles`, {
      withCredentials: true,
    });
  }

  GetRole(id: string): Observable<RoleDto> {
    return this.http.get<RoleDto>(`${enviroment.apiUrl}/api/roles/${id}`, {
      withCredentials: true,
    });
  }

  CreateRole(role: CreateRoleDto): Observable<object> {
    return this.http.post(`${enviroment.apiUrl}/api/roles`, role, {
      withCredentials: true,
    });
  }

  UpdateRole(role: CreateRoleDto, id: string): Observable<RoleDto> {
    return this.http.put<RoleDto>(
      `${enviroment.apiUrl}/api/roles/${id}`,
      role,
      { withCredentials: true }
    );
  }

  DeleteRole(id: string): Observable<object> {
    return this.http.delete(`${enviroment.apiUrl}/api/roles/${id}`, {
      withCredentials: true,
    });
  }

  GetUsersInRole(roleId: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${enviroment.apiUrl}/api/roles/${roleId}/users`,
      { withCredentials: true }
    );
  }

  EditUsersInRole(
    assignUserDtos: AssignUserDto[],
    roleId: string
  ): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(
      `${enviroment.apiUrl}/api/roles/${roleId}/editusers`,
      assignUserDtos,
      { withCredentials: true }
    );
  }
}
