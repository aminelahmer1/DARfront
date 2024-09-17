import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlltemplatefrontComponent } from './frontOffice/alltemplatefront/alltemplatefront.component';
import { AlltemplatebackComponent } from './backOffice/alltemplateback/alltemplateback.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { RegisterComponent } from './components/authenticate/register/register.component';
import { BoardModeratorComponent } from './components/authenticate/board/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/authenticate/board/board-user/board-user.component';
import { MfaComponent } from './components/authenticate/mfa/mfa.component';
import { ProfileComponent } from './components/authenticate/profile/profile.component';
import { ResetPasswordComponent } from './components/authenticate/reset-password/reset-password.component';
import { AuthGuard } from './services/Auths-Last/auth.guard';
import { AddAnnouncementDialogComponent } from './announcement/add-announcement-dialog/add-announcement-dialog.component';
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { AddAnnouncementComponent } from './announcement/add-announcement/add-announcement.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ClientAnnouncementListComponent } from './announcement/client-announcement-list/client-announcement-list.component';
import { AnnouncementStatsComponent } from './announcement/announcement-stats/announcement-stats.component';


const routes: Routes = [
  { path: 'home', component: AlltemplatefrontComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'verify', component: VerifyAccountComponent },
  { path: 'announcements', component: AnnouncementListComponent },
  { path: 'add-announcement', component: AddAnnouncementComponent },
  { path: 'announcement-stats', component: AnnouncementStatsComponent }, // Route protégée par le guard
  { path: 'clientannouncements', component: ClientAnnouncementListComponent },
  { path: '**', redirectTo: '/announcements' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
