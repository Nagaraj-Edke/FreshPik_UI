import { Component, Input, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-bar',
  templateUrl: './checkout-bar.component.html',
  styleUrls: ['./checkout-bar.component.scss']
})
export class CheckoutBarComponent implements OnInit{

  sharedService = inject(SharedService);
  router = inject(Router);
  count = 0;
  @Input() isCartPage: boolean = false
  ngOnInit() {
    this.sharedService.getSelctedItems().subscribe((res: any)=>{
      this.count = +res;
    });
  }

  checkoutToCart() {
    this.router.navigate(['/cart'])
  }

  checkoutPayment() {
    this.router.navigate(['/cart/payment'])
  }
}
