import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionReportComponent } from './all-transaction-report.component';

describe('AllTransactionReportComponent', () => {
  let component: AllTransactionReportComponent;
  let fixture: ComponentFixture<AllTransactionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTransactionReportComponent]
    });
    fixture = TestBed.createComponent(AllTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
