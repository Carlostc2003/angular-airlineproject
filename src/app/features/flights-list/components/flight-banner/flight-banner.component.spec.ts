import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBannerComponent } from './flight-banner.component';

describe('FlightBannerComponent', () => {
  let component: FlightBannerComponent;
  let fixture: ComponentFixture<FlightBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
