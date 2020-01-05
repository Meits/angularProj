import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchiveLeadHistoryComponent } from './modal-archive-lead-history.component';

describe('ModalArchiveLeadHistoryComponent', () => {
  let component: ModalArchiveLeadHistoryComponent;
  let fixture: ComponentFixture<ModalArchiveLeadHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArchiveLeadHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArchiveLeadHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
