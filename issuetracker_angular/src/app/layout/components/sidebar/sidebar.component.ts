import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user!: UserDto;
  userImage!: string;

  /**
   *
   */
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.USER!;
    this.userImage = enviroment.awsUrl + this.user.image;
  }
}
