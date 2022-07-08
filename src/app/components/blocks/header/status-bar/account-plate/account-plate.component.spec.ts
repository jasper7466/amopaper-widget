import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPlateComponent } from './account-plate.component';

describe('AccountPlateComponent', () => {
  let component: AccountPlateComponent;
  let fixture: ComponentFixture<AccountPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPlateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
