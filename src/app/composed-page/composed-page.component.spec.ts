import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposedPageComponent } from './composed-page.component';

describe('ComposedPageComponent', () => {
  let component: ComposedPageComponent;
  let fixture: ComponentFixture<ComposedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
