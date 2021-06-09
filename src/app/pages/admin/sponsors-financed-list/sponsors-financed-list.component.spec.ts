import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsFinancedListComponent } from './sponsors-financed-list.component';

describe('SponsorsFinancedListComponent', () => {
  let component: SponsorsFinancedListComponent;
  let fixture: ComponentFixture<SponsorsFinancedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsFinancedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsFinancedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
