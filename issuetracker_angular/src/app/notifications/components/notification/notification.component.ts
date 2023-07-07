import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationDto } from '../../Dtos/NotificationDto';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() notification!: NotificationDto;
  @Output() closeNotificationsWindowEvent = new EventEmitter();
  dateFormat!: string;

  /**
   *
   */
  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    dayjs.extend(relativeTime);

    this.dateFormat = this.dateFormat = dayjs(
      this.notification.createdOn
    ).fromNow();
  }

  markAsRead() {
    if (!this.notification.seen) {
      this.notificationService
        .SeeNotification(this.notification.id)
        .subscribe();
    }

    this.closeNotificationsWindowEvent.emit();
  }
}
