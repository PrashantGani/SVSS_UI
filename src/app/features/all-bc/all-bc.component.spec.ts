import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBcComponent } from './all-bc.component';

describe('AllBcComponent', () => {
  let component: AllBcComponent;
  let fixture: ComponentFixture<AllBcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBcComponent]
    });
    fixture = TestBed.createComponent(AllBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
