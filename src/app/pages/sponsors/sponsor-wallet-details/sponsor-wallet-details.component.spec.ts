import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorWalletDetailsComponent } from './sponsor-wallet-details.component';

describe('SponsorWalletDetailsComponent', () => {
  let component: SponsorWalletDetailsComponent;
  let fixture: ComponentFixture<SponsorWalletDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorWalletDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorWalletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
