import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOrLoginComponent } from './sign-or-login.component';

describe('SignOrLoginComponent', () => {
  let component: SignOrLoginComponent;
  let fixture: ComponentFixture<SignOrLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOrLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
