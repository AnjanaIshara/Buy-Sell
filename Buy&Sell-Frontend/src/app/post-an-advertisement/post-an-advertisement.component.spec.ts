import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnAdvertisementComponent } from './post-an-advertisement.component';

describe('PostAnAdvertisementComponent', () => {
  let component: PostAnAdvertisementComponent;
  let fixture: ComponentFixture<PostAnAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAnAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAnAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
