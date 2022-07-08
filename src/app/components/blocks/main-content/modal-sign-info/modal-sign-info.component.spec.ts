import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignInfoComponent } from './modal-sign-info.component';

describe('ModalSignInfoComponent', () => {
  let component: ModalSignInfoComponent;
  let fixture: ComponentFixture<ModalSignInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSignInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSignInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
