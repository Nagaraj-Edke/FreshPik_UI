import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBarComponent } from './checkout-bar.component';

describe('CheckoutBarComponent', () => {
  let component: CheckoutBarComponent;
  let fixture: ComponentFixture<CheckoutBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
