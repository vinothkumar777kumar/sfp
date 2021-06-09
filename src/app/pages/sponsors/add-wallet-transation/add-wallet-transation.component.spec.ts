import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletTransationComponent } from './add-wallet-transation.component';

describe('AddWalletTransationComponent', () => {
  let component: AddWalletTransationComponent;
  let fixture: ComponentFixture<AddWalletTransationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletTransationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletTransationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
