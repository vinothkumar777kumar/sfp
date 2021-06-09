import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsLayoutComponent } from './sponsors-layout.component';

describe('SponsorsLayoutComponent', () => {
  let component: SponsorsLayoutComponent;
  let fixture: ComponentFixture<SponsorsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
