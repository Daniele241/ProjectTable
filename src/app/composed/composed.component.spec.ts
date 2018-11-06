import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposedComponent } from './composed.component';

describe('ComposedComponent', () => {
  let component: ComposedComponent;
  let fixture: ComponentFixture<ComposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
