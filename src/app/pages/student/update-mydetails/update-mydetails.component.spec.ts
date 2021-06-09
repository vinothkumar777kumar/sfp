import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMydetailsComponent } from './update-mydetails.component';

describe('UpdateMydetailsComponent', () => {
  let component: UpdateMydetailsComponent;
  let fixture: ComponentFixture<UpdateMydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
