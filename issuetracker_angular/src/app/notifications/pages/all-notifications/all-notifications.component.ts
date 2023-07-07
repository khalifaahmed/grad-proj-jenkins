import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationDto } from '../../Dtos/NotificationDto';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.css'],
})
export class AllNotificationsComponent implements OnInit {
  notifications: NotificationDto[] = [];
  /**
   *
   */
  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationService.GetMyNotifications().subscribe({
      next: (v) => (this.notifications = v),
      complete: () => {
        this.notifications.reverse();
      },
    });
  }
}
