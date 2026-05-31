import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsListComponent } from './airports-list.component';

describe('FlightList', () => {
  let component: AirportsListComponent;
  let fixture: ComponentFixture<AirportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirportsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
