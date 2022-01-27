import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RecyclebinComponent } from './recyclebin/recyclebin.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-user', pathMatch: 'full' },
  { path: 'view-user', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'bin', component: RecyclebinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
