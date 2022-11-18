import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribirTareaComponent } from './escribir-tarea.component';

describe('EscribirTareaComponent', () => {
  let component: EscribirTareaComponent;
  let fixture: ComponentFixture<EscribirTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscribirTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscribirTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
