import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMoneyComponent } from './transaction-money.component';

describe('TransactionMoneyComponent', () => {
  let component: TransactionMoneyComponent;
  let fixture: ComponentFixture<TransactionMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
