import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAllLoanReportComponent } from './all-all-loan-report.component';

describe('AllAllLoanReportComponent', () => {
  let component: AllAllLoanReportComponent;
  let fixture: ComponentFixture<AllAllLoanReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAllLoanReportComponent]
    });
    fixture = TestBed.createComponent(AllAllLoanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
