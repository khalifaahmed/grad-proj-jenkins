import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationDto } from 'src/app/notifications/Dtos/NotificationDto';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html',
  styleUrls: ['./notifications-icon.component.css'],
})
export class NotificationsIconComponent implements OnInit {
  unSeenNotifications: NotificationDto[] = [];
  hubConnection = new HubConnectionBuilder()
    .withUrl(`${enviroment.apiUrl}/api/hubs/notification`)
    .build();
  clicked: boolean = false;
  /**
   *
   */
  constructor(
    private notificationService: NotificationsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.notificationService
      .GetMyUnSeenNotifications()
      .subscribe((v) => (this.unSeenNotifications = v.reverse()));

    this.connectToHub();
  }

  notificationsContainer: boolean = false;

  showNotificationsContainer() {
    this.notificationsContainer = true;
    this.clicked = true;
  }

  hideNotificationsContainer() {
    this.notificationsContainer = false;
  }

  clickedOut(event: MouseEvent) {
    if ((event.target as Element).className === 'notifications-container') {
      this.hideNotificationsContainer();
    }
  }

  connectToHub() {
    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('ConnectUser', this.auth.USER?.id);
    });

    this.hubConnection.on('RecieveNotification', (data) => {
      this.unSeenNotifications.unshift(data);
      const audio = document.getElementById('audio');
      (audio as HTMLAudioElement).play();
      this.clicked = false;
    });
  }
}
