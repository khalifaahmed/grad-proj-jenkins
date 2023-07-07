import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserRowComponent } from './components/user-row/user-row.component';
import { UsersRoutingModule } from '../users/users-routing.module';
import { SelectUsersComponent } from './components/select-users/select-users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotFoundComponent,
    ToastComponent,
    DeleteModalComponent,
    UsersTableComponent,
    UserRowComponent,
    SelectUsersComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
  exports: [
    ToastComponent,
    DeleteModalComponent,
    UsersTableComponent,
    SelectUsersComponent,
  ],
})
export class SharedModule {}
