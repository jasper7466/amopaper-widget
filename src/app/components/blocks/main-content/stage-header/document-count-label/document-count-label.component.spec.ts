import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCountLabelComponent } from './document-count-label.component';

describe('DocumentCountLabelComponent', () => {
  let component: DocumentCountLabelComponent;
  let fixture: ComponentFixture<DocumentCountLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentCountLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentCountLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
