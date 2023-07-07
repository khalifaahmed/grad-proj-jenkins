import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: UserDto;
  userImage!: string;
  fullScreenState: boolean = false;
  /**
   *
   */
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.USER!;
    this.userImage = enviroment.awsUrl + this.user.image;
  }

  logout(): void {
    this.auth.Logout();
  }

  toggleFullScreen(): void {
    if (this.fullScreenState) {
      this.fullScreenState = !this.fullScreenState;
      this.closeFullscreen();
    } else {
      this.fullScreenState = !this.fullScreenState;
      this.openFullscreen();
    }
  }
  /* View in fullscreen */
  openFullscreen(): void {
    document.documentElement.requestFullscreen();
  }
  /* Close fullscreen */
  closeFullscreen(): void {
    document.exitFullscreen();
  }

  toggleSidebar(): void {
    let sidebar = document.getElementById('sidebar');
    let iconsSidebar = document.getElementById('icons-sidebar');

    if (sidebar?.style.display === 'none') {
      sidebar.style.display = 'flex';
      iconsSidebar!.style.display = 'none';
    } else {
      sidebar!.style.display = 'none';
      iconsSidebar!.style.display = 'flex';
    }
  }
}
