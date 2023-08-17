import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/db.service';
import { SharedService } from 'src/app/shared/shared.service';
import { enviornmet } from 'src/assets/enviornmet';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  sharedService = inject(SharedService);
  router = inject(Router)
  selectedItemList: any[] = [];
  imgURL = enviornmet.imgURL;

  db =inject(DbService)
  sessionId = ''
  ngOnInit(): void {
    this.selectedItemList = this.sharedService.getSelectedItemList();
  }
  verify() {
    // this.db.validSession(this.sessionId).subscribe({
    //   next: (res: any)=>{
    //     console.log(res)
    //   },
    //   error: (e) =>{
    //     console.log(e)
    //   }
    // })
  }

  isEmptyCart() {
    if(this.selectedItemList.length === 0) {
      return true;
    }
    return !this.selectedItemList.some((item)=> item.count > 0)

  }
  getActualPrice(item: any){
    let [oldPrice, newPrice] = [Math.round(item.oldPrice*100), Math.round(item.newPrice*100)];
    return (oldPrice-newPrice)/100;

  }
  getSavedPrice(item: any) {
    let [oldPrice, newPrice] = [Math.round(+(item.oldPrice*100).toFixed(0)), Math.round(+(item.newPrice*100).toFixed(0))];
    return (item.count * ((oldPrice - newPrice)/100));
  }

  addOne(item: any) {
    this.sharedService.updateSavedItem(item)//, item.count +1);
  }

  removeOne(item: any) {
    this.sharedService.removeItem(item._id);
  }

  navigateToPayment() {
    this.router.navigate(['/cart/payment'])
  }
}
