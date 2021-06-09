import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSponsorsComponent } from './add-sponsors.component';

describe('AddSponsorsComponent', () => {
  let component: AddSponsorsComponent;
  let fixture: ComponentFixture<AddSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
