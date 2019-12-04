import { TestBed } from '@angular/core/testing';

import { LeadCommentService } from './lead-comment.service';

describe('LeadCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadCommentService = TestBed.get(LeadCommentService);
    expect(service).toBeTruthy();
  });
});
