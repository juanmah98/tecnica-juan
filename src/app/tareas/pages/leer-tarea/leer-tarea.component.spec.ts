import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerTareaComponent } from './leer-tarea.component';

describe('LeerTareaComponent', () => {
  let component: LeerTareaComponent;
  let fixture: ComponentFixture<LeerTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeerTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
