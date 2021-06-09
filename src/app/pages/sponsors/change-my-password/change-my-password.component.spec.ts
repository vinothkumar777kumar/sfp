import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMyPasswordComponent } from './change-my-password.component';

describe('ChangeMyPasswordComponent', () => {
  let component: ChangeMyPasswordComponent;
  let fixture: ComponentFixture<ChangeMyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
