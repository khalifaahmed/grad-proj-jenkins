import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto } from '../Dtos/NotificationDto';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  // 1) get all my notifications
  GetMyNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(
      `${enviroment.apiUrl}/api/notifications/my-notifications`,
      { withCredentials: true }
    );
  }

  // 2) get my un seen notifications
  GetMyUnSeenNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(
      `${enviroment.apiUrl}/api/notifications/my-notifications/unseen`,
      { withCredentials: true }
    );
  }

  // 3) see notification
  SeeNotification(notificationId: string): Observable<object> {
    return this.http.post(
      `${enviroment.apiUrl}/api/notifications/seen/${notificationId}`,
      {},
      { withCredentials: true }
    );
  }
}
