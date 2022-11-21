import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasHomeComponent } from './tareas-home.component';

describe('TareasHomeComponent', () => {
  let component: TareasHomeComponent;
  let fixture: ComponentFixture<TareasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
