import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseeComponent } from './addressee.component';

describe('AddresseeComponent', () => {
  let component: AddresseeComponent;
  let fixture: ComponentFixture<AddresseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresseeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
