import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderfrontComponent } from './frontOffice/headerfront/headerfront.component';
import { AlltemplatefrontComponent } from './frontOffice/alltemplatefront/alltemplatefront.component';
import { NavbarcomponentfrontComponent } from './frontOffice/navbarcomponentfront/navbarcomponentfront.component';
import { FrontSearchBarComponent } from './frontOffice/front-search-bar/front-search-bar.component';
import { HomecomponentfrontComponent } from './frontOffice/homecomponentfront/homecomponentfront.component';
import { FooterfrontComponent } from './frontOffice/footerfront/footerfront.component';
import { AlltemplatebackComponent } from './backOffice/alltemplateback/alltemplateback.component';
import { NavbarbackComponent } from './backOffice/navbarback/navbarback.component';
import { SidebarbackComponent } from './backOffice/sidebarback/sidebarback.component';
import { MfaComponent } from './components/authenticate/mfa/mfa.component';
import { OtherMfaComponent } from './components/authenticate/other-mfa/other-mfa.component';
import { ResetPasswordComponent } from './components/authenticate/reset-password/reset-password.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { BanUserComponent } from './components/ban-user/ban-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BoardAdminComponent } from './components/authenticate/board/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/authenticate/board/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/authenticate/board/board-user/board-user.component';
import { HomeComponent } from './components/authenticate/board/home/home.component';
import { ProfileComponent } from './components/authenticate/profile/profile.component';
import { UserlistComponent } from './components/authenticate/userlist/userlist.component';
import { RegisterComponent } from './components/authenticate/register/register.component';
import { DisplayQrComponent } from './components/authenticate/register/display-qr/display-qr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAnnouncementDialogComponent } from './announcement/add-announcement-dialog/add-announcement-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AddAnnouncementComponent } from './announcement/add-announcement/add-announcement.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ClientAnnouncementListComponent } from './announcement/client-announcement-list/client-announcement-list.component';
import { ContactDialogComponent } from './announcement/contact-dialog/contact-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementDetailsComponent } from './announcement/announcement-details/announcement-details.component';
import { AnnouncementStatsComponent } from './announcement/announcement-stats/announcement-stats.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderfrontComponent,
    AlltemplatefrontComponent,
    NavbarcomponentfrontComponent,
    FrontSearchBarComponent,
    HomecomponentfrontComponent,
    FooterfrontComponent,
    AlltemplatebackComponent,
    NavbarbackComponent,
    SidebarbackComponent,
    MfaComponent,
    OtherMfaComponent,
    ResetPasswordComponent,
    AuthenticateComponent,
    BanUserComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HomeComponent,
    ProfileComponent,
    UserlistComponent,
    RegisterComponent,
    DisplayQrComponent,
    AddAnnouncementDialogComponent,
    AnnouncementListComponent,
    AddAnnouncementComponent,
    ConfirmationDialogComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PopUpComponent,
    VerifyAccountComponent,
    ClientAnnouncementListComponent,
    ContactDialogComponent,
    AnnouncementDetailsComponent,
    AnnouncementStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    DragDropModule,
    MatPseudoCheckboxModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
