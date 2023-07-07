import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { RoleDto } from '../../Dtos/RoleDto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css'],
})
export class ListRolesComponent implements OnInit {
  roles!: Observable<RoleDto[]>;
  /**
   *
   */
  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.roles = this.rolesService.GetAllRoles();
  }

  trackByFn(_index: number, role: RoleDto): string {
    return role.id;
  }
}
