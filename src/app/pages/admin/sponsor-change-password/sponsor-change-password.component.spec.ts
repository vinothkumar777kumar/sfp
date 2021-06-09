import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorChangePasswordComponent } from './sponsor-change-password.component';

describe('SponsorChangePasswordComponent', () => {
  let component: SponsorChangePasswordComponent;
  let fixture: ComponentFixture<SponsorChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
