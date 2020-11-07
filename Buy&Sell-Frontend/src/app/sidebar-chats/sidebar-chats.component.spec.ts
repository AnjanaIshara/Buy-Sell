import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarChatsComponent } from './sidebar-chats.component';

describe('SidebarChatsComponent', () => {
  let component: SidebarChatsComponent;
  let fixture: ComponentFixture<SidebarChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
