import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorDialogBoxComponent } from './login-error-dialog-box.component';

describe('LoginErrorDialogBoxComponent', () => {
  let component: LoginErrorDialogBoxComponent;
  let fixture: ComponentFixture<LoginErrorDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginErrorDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginErrorDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
