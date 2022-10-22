import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedPageComponent } from './signed-page.component';

describe('SignedPageComponent', () => {
  let component: SignedPageComponent;
  let fixture: ComponentFixture<SignedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
