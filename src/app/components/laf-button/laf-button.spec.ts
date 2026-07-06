import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LafButton } from './laf-button.component';

describe('Button', () => {
  let component: LafButton;
  let fixture: ComponentFixture<LafButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LafButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LafButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
