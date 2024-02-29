import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { DoctorDetailsPageComponent } from './component/doctor-details-page/doctor-details-page.component';
import { RegisterDoctorComponent } from './component/register-doctor/register-doctor.component';
import { MyBookingComponent } from './component/my-booking/my-booking.component';
import { AdminRegisterComponent } from './component/admin-register/admin-register.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent },
  { path: 'doctor-details-page/:id', component: DoctorDetailsPageComponent },
  { path: 'my-booking', component: MyBookingComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'admin-page', component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
