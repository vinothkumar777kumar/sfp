import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontentLayoutComponent } from './frontent-layout.component';

describe('FrontentLayoutComponent', () => {
  let component: FrontentLayoutComponent;
  let fixture: ComponentFixture<FrontentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
