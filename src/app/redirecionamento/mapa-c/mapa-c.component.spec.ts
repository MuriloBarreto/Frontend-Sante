import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCComponent } from './mapa-c.component';

describe('MapaCComponent', () => {
  let component: MapaCComponent;
  let fixture: ComponentFixture<MapaCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
