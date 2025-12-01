import { Routes } from '@angular/router';
import { BarsPage } from './pages/bar/bars-page';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BarDetailComponent } from './pages/bar-detail/bar-detail';
import { AddBarComponent } from './pages/admin/add-bar/add-bar';
import { EditBarComponent } from './pages/admin/edit-bar/edit-bar';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'bars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bars', component: BarsPage },
  { 
    path: 'bars/:id', 
    component: BarDetailComponent
  },
  {
    path: 'admin/bars/add',
    component: AddBarComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/bars/:id/edit',
    component: EditBarComponent,
    canActivate: [adminGuard]
  }
];

export default routes;
