import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSponsorshipPaidComponent } from './add-sponsorship-paid.component';

describe('AddSponsorshipPaidComponent', () => {
  let component: AddSponsorshipPaidComponent;
  let fixture: ComponentFixture<AddSponsorshipPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSponsorshipPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSponsorshipPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
