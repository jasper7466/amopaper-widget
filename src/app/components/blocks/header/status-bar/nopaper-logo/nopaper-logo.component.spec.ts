import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NopaperLogoComponent } from './nopaper-logo.component';

describe('NopaperLogoComponent', () => {
  let component: NopaperLogoComponent;
  let fixture: ComponentFixture<NopaperLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NopaperLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NopaperLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
