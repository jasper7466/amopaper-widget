import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSigningComponent } from './banner-signing.component';

describe('BannerSigningComponent', () => {
  let component: BannerSigningComponent;
  let fixture: ComponentFixture<BannerSigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSigningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
