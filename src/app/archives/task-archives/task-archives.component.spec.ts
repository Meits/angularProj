import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskArchivesComponent } from './task-archives.component';

describe('TaskArchivesComponent', () => {
  let component: TaskArchivesComponent;
  let fixture: ComponentFixture<TaskArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
