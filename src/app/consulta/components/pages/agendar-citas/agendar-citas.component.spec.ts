import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitasComponent } from './agendar-citas.component';

describe('AgendarCitasComponent', () => {
  let component: AgendarCitasComponent;
  let fixture: ComponentFixture<AgendarCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarCitasComponent]
    });
    fixture = TestBed.createComponent(AgendarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
