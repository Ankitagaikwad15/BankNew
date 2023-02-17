import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBankComponent } from './franchise-bank.component';

describe('FranchiseBankComponent', () => {
  let component: FranchiseBankComponent;
  let fixture: ComponentFixture<FranchiseBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
