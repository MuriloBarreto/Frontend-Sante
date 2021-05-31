import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BemEstarComponent } from './bem-estar.component';

describe('BemEstarComponent', () => {
  let component: BemEstarComponent;
  let fixture: ComponentFixture<BemEstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BemEstarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BemEstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
