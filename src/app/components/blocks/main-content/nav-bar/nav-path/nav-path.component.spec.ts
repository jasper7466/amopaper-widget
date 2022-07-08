import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPathComponent } from './nav-path.component';

describe('NavPathComponent', () => {
  let component: NavPathComponent;
  let fixture: ComponentFixture<NavPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
