import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavigationBarComponent } from './mobile-navigation-bar.component';

describe('MobileNavigationBarComponent', () => {
  let component: MobileNavigationBarComponent;
  let fixture: ComponentFixture<MobileNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
