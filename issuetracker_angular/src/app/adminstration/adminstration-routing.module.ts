import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './pages/list-roles/list-roles.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';

const routes: Routes = [
  {
    path: 'list-roles',
    title: 'List Roles | Issue Tracker',
    component: ListRolesComponent,
  },
  {
    path: 'new-role',
    title: 'Create Role | Issue Tracker',
    component: CreateRoleComponent,
  },
  {
    path: 'edit-role/:id',
    title: 'Edit Role | Issue Tracker',
    component: EditRoleComponent,
  },
  {
    path: '',
    redirectTo: 'list-roles',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminstrationRoutingModule {}
