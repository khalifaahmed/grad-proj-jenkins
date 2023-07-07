import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserDto } from '../../Dtos/UserDto';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: UserDto[] = [];
  /**
   *
   */
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.GetAllUsers().subscribe((v) => {
      this.users = v;
    });
  }
}
