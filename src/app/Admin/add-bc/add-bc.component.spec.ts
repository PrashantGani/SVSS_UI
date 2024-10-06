import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBcComponent } from './add-bc.component';

describe('AddBcComponent', () => {
  let component: AddBcComponent;
  let fixture: ComponentFixture<AddBcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBcComponent]
    });
    fixture = TestBed.createComponent(AddBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
