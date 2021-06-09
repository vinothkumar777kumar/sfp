import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationDetailsComponent } from './admin-notification-details.component';

describe('AdminNotificationDetailsComponent', () => {
  let component: AdminNotificationDetailsComponent;
  let fixture: ComponentFixture<AdminNotificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
