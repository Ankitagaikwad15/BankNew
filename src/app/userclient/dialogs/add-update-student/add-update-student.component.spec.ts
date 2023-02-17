import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStudentComponent } from './add-update-student.component';

describe('AddUpdateStudentComponent', () => {
  let component: AddUpdateStudentComponent;
  let fixture: ComponentFixture<AddUpdateStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateStudentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});