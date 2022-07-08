import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseeNameplateComponent } from './addressee-nameplate.component';

describe('AddresseeNameplateComponent', () => {
  let component: AddresseeNameplateComponent;
  let fixture: ComponentFixture<AddresseeNameplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresseeNameplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresseeNameplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
