import { Component, Input } from '@angular/core';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() userDtos!: UserDto[];
  @Input() showActions: boolean = true;
  baseImageUrl = enviroment.awsUrl;

  trackByFn(_index: number, user: UserDto): string {
    return user.id;
  }
}
