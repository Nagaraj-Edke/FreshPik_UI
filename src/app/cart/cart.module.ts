import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PayComponent } from './payment/pay/pay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'payment', component: PaymentComponent, 
  // canActivate: [AuthGuard]
}
]

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent,
    PayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CartModule { }
