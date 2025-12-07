import { Routes } from '@angular/router';
import { BarsPage } from './pages/bar/bars-page';
<<<<<<< HEAD
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BarDetailComponent } from './pages/bar-detail/bar-detail';
import { AddBarComponent } from './pages/admin/add-bar/add-bar';
import { EditBarComponent } from './pages/admin/edit-bar/edit-bar';
import { adminGuard } from './guards/admin.guard';
import { BeersPageComponent } from './pages/beers/beers-page';

const routes: Routes = [
  { path: '', redirectTo: 'bars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bars', component: BarsPage },
  { path: 'beers', component: BeersPageComponent },
  {
    path: 'bars/:id',
    component: BarDetailComponent,
  },
  {
    path: 'admin/bars/add',
    component: AddBarComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/bars/:id/edit',
    component: EditBarComponent,
    canActivate: [adminGuard],
  },
=======
import { LoginPage } from './pages/login/login-page';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  // صفحه لاگین
  { path: 'login', component: LoginPage },

  // صفحه لیست بارها (فقط برای کاربر لاگین شده)
  { path: 'bars', component: BarsPage, canActivate: [authGuard] },

  // روت اصلی → لاگین
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // هر مسیر ناشناخته → لاگین
  { path: '**', redirectTo: 'login' },
>>>>>>> 85fe261 (Update KHA with auth & reviews)
];

export default routes;
