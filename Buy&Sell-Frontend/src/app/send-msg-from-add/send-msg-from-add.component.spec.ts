import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMsgFromAddComponent } from './send-msg-from-add.component';

describe('SendMsgFromAddComponent', () => {
  let component: SendMsgFromAddComponent;
  let fixture: ComponentFixture<SendMsgFromAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMsgFromAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMsgFromAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
