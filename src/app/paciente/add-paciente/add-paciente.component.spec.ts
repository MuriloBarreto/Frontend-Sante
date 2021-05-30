import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacienteComponent } from './add-paciente.component';

describe('AddPacienteComponent', () => {
  let component: AddPacienteComponent;
  let fixture: ComponentFixture<AddPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
