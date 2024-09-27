import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';
import { TransactionReportComponent } from './features/transaction-report/transaction-report.component';
import { LoanReportComponent } from './features/loan-report/loan-report.component';
import { AllTransactionReportComponent } from './features/all-transaction-report/all-transaction-report.component';
import { AllAllLoanReportComponent } from './features/all-all-loan-report/all-all-loan-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'home',component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'reset-password', component: ResetPasswordComponent ,canActivate: [AuthGuard]},
  { path: 'transactionReport', component: TransactionReportComponent ,canActivate: [AuthGuard]},
  { path: 'loanReport', component: LoanReportComponent ,canActivate: [AuthGuard]},
  { path: 'allTransactionReport', component: AllTransactionReportComponent ,canActivate: [AuthGuard]},
  { path: 'allAllLoanReport', component: AllAllLoanReportComponent ,canActivate: [AuthGuard]},

  // { path: 'home', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
