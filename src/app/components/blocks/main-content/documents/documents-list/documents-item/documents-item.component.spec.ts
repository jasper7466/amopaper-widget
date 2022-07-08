import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsItemComponent } from './documents-item.component';

describe('DocumentsItemComponent', () => {
  let component: DocumentsItemComponent;
  let fixture: ComponentFixture<DocumentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
