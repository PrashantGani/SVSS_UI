import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReportComponent } from './transaction-report.component';

describe('TransactionReportComponent', () => {
  let component: TransactionReportComponent;
  let fixture: ComponentFixture<TransactionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionReportComponent]
    });
    fixture = TestBed.createComponent(TransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
