import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCitasComponent } from './layout-citas.component';

describe('LayoutCitasComponent', () => {
  let component: LayoutCitasComponent;
  let fixture: ComponentFixture<LayoutCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutCitasComponent]
    });
    fixture = TestBed.createComponent(LayoutCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
