import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { LoanReportComponent } from './loan-report/loan-report.component';
import { AllTransactionReportComponent } from './all-transaction-report/all-transaction-report.component';
import { AllAllLoanReportComponent } from './all-all-loan-report/all-all-loan-report.component';
import { FormsModule } from '@angular/forms'; // Import this module



@NgModule({
  declarations: [
    TransactionReportComponent,
    LoanReportComponent,
    AllTransactionReportComponent,
    AllAllLoanReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FeaturesModule { }
