import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSponsorshipPaidComponent } from './admin-sponsorship-paid.component';

describe('AdminSponsorshipPaidComponent', () => {
  let component: AdminSponsorshipPaidComponent;
  let fixture: ComponentFixture<AdminSponsorshipPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSponsorshipPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSponsorshipPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
