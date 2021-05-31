import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendeCovidComponent } from './recomende-covid.component';

describe('RecomendeCovidComponent', () => {
  let component: RecomendeCovidComponent;
  let fixture: ComponentFixture<RecomendeCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendeCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendeCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
