import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelityComponent } from './fidelity.component';

describe('FidelityComponent', () => {
  let component: FidelityComponent;
  let fixture: ComponentFixture<FidelityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FidelityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FidelityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
