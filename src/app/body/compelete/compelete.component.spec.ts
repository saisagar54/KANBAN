import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeleteComponent } from './compelete.component';

describe('CompeleteComponent', () => {
  let component: CompeleteComponent;
  let fixture: ComponentFixture<CompeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
