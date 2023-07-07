import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriorityDto } from '../Dto/PriorityDto';
import { enviroment } from 'src/enviroments/enviroment';
import { CreatePriorityDto } from '../Dto/CreatePriorityDto';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  constructor(private http: HttpClient) {}

  // 1) get all Priorites
  GetAllPriorities(): Observable<PriorityDto[]> {
    return this.http.get<PriorityDto[]>(`${enviroment.apiUrl}/api/priority`, {
      withCredentials: true,
    });
  }

  // 2) create Priority
  CreatePriority(priority: CreatePriorityDto) {
    return this.http.post<PriorityDto>(
      `${enviroment.apiUrl}/api/priority`,
      priority,
      { withCredentials: true }
    );
  }
}
