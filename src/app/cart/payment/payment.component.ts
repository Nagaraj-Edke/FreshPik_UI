import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { PayComponent } from './pay/pay.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  selectedItemList: any;
  sharedService = inject(SharedService);
  router = inject(Router)
  totalAmount = 0;
  savedAmount = 0;
  dialogRef!: MatDialogRef<PayComponent>;
  isPaymentProgress: boolean = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedItemList = this.sharedService.getSelectedItemList();
    for(let item of this.selectedItemList){
      this.totalAmount += (item.newPrice *100);
      this.savedAmount += (item.oldPrice * 100);
    }
    this.savedAmount -= this.totalAmount;
    this.totalAmount /= 100;
    this.savedAmount /= 100;
  }

  openDialog(): void { 
    this.isPaymentProgress = true;
    this.dialogRef = this.dialog.open(PayComponent, {
      width: '450px',
      data: {
        totalAmount: this.totalAmount
      },
      hasBackdrop: false,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '100ms',
    });
    document.body.classList.add('backDrop');
    this.dialogRef.afterClosed().subscribe((res: any) => {
      this.isPaymentProgress = false;
      document.body.classList.remove('backDrop');
      if(res?.paymentSucess){
        this.router.navigate(['/'])
      }
    });
  }

  getSavedPrice(item: any) {
    let [oldPrice, newPrice] = [Math.round(+(item.oldPrice*100).toFixed(0)), Math.round(+(item.newPrice*100).toFixed(0))];
    return (item.count * ((oldPrice - newPrice)/100));
  }

  ngOnDestroy() {
    document.body.classList.remove('backDrop');
    this.dialogRef?.close();
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

}
