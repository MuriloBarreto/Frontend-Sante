import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPacienteComponent } from './view-paciente.component';

describe('ViewPacienteComponent', () => {
  let component: ViewPacienteComponent;
  let fixture: ComponentFixture<ViewPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
