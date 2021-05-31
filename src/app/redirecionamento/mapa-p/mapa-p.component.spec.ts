import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaPComponent } from './mapa-p.component';

describe('MapaPComponent', () => {
  let component: MapaPComponent;
  let fixture: ComponentFixture<MapaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
