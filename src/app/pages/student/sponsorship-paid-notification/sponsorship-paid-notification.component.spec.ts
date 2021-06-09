import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipPaidNotificationComponent } from './sponsorship-paid-notification.component';

describe('SponsorshipPaidNotificationComponent', () => {
  let component: SponsorshipPaidNotificationComponent;
  let fixture: ComponentFixture<SponsorshipPaidNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipPaidNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipPaidNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
