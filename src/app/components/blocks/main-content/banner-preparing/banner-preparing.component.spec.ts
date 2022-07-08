import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPreparingComponent } from './banner-preparing.component';

describe('BannerPreparingComponent', () => {
  let component: BannerPreparingComponent;
  let fixture: ComponentFixture<BannerPreparingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPreparingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerPreparingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
