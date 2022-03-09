import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDncComponent } from './custom-dnc.component';

describe('CustomDncComponent', () => {
  let component: CustomDncComponent;
  let fixture: ComponentFixture<CustomDncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
