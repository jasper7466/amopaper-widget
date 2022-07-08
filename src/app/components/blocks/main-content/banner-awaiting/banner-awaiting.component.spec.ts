import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAwaitingComponent } from './banner-awaiting.component';

describe('BannerAwaitingComponent', () => {
  let component: BannerAwaitingComponent;
  let fixture: ComponentFixture<BannerAwaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAwaitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAwaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
