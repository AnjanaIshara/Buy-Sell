import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapforaddComponent } from './mapforadd.component';

describe('MapforaddComponent', () => {
  let component: MapforaddComponent;
  let fixture: ComponentFixture<MapforaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapforaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapforaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
