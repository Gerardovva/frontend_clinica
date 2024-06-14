import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCitasComponent } from './consultar-citas.component';

describe('ConsultarCitasComponent', () => {
  let component: ConsultarCitasComponent;
  let fixture: ComponentFixture<ConsultarCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarCitasComponent]
    });
    fixture = TestBed.createComponent(ConsultarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
