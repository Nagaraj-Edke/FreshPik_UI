import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/db.service';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent {

  Price = 0;
  addresses: any[] = [];

  dbService = inject(DbService)
  sharedService = inject(SharedService)
  selectedAddress: any;
  newAddressFrom!: FormGroup;
  addNewAddress = false;
  updateAddress = false;
  paymentPage: boolean = false;
  paymentStatus: boolean | string = false;
  userId: number = 0;

  constructor(public dialogRef: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.Price = +data.totalAmount;
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')!).userId
    this.dbService.getAddresses(this.userId).subscribe({
      next: (res: any) => {
        this.addresses = res.address;
      },
      error: (err: any) => { console.log(err) }
    });
    this.newAddressFrom = this.fb.group({
      id: [''],
      Hno: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(20)]],
      town: ['', [Validators.required, Validators.maxLength(20)]],
      pincode: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  onSelectAddress(add: any) {
    this.selectedAddress = add;
  }

  isInvalid(controlName: string): boolean {
    const control = this.newAddressFrom.get(controlName);
    return !!(control?.invalid && control?.touched);
  }

  formSubmit() {
    this.newAddressFrom.markAllAsTouched();

    if (this.newAddressFrom.valid) {
      this.newAddressFrom.disable();
      this.dbService.addNewAddress(this.newAddressFrom.value, this.userId).subscribe({
        next: (res: any) =>{
          if(res.data.code === 2000)
            this.UpdateAddressData(res.data.address);
          this.addNewAddress = false;
          this.newAddressFrom.reset();
          this.newAddressFrom.enable();
        },
        error: () =>{
          this.newAddressFrom.enable();
        }
      })
    }
  }

  next() {
    this.paymentPage = true;
  }

  edit(address: any){
    this.updateAddress = true;
    this.addNewAddress = true;
    this.newAddressFrom.patchValue({
      id: address.id || '',
      Hno: address.Hno || '',
      street: address.street || '',
      town: address.town || '',
      pincode: address.pincode || ''
    });
  }
  AddNewAddress() {
    this.addNewAddress = true;
    this.updateAddress = false;
    this.newAddressFrom.reset();
    // this.newAddressFrom.get('id')?.setValue(this.addresses.length + 1);
  }

  UpdateAddressData(address: any) {
    this.selectedAddress = address;
    let isNewAddress = true;
    for(let index in this.addresses) {
      if(this.addresses[index].id === +address.id) {
        isNewAddress = false;
        this.addresses[index] = address;
        break;
      }
    }
    if(isNewAddress) {
      this.addresses.push(address);
    }
  }

  remove(id: number) {
    this.dbService.removeAddressById(this.userId, id).subscribe();
  }

  PaymentSuccess() {
    this.paymentStatus = "Success";
    localStorage.removeItem('items');
    this.sharedService.resetSelectedItemList();
  }

  PaymentFailure() {
    this.paymentStatus = "Failed";
  }

  paymentRetry() {
    this.paymentStatus = false;
  }

  close() {
    let data = {}
    if(this.paymentStatus === "Success"){
      data = {paymentSucess: true}
    }
    this.dialogRef?.close(data);
  }
}
