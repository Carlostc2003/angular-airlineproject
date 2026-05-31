import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveComponent } from './reserve.component';

describe('ReserveComponent', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
