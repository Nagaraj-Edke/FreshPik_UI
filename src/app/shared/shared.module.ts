import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CheckoutBarComponent } from  './components/checkout-bar/checkout-bar.component'
import {MatMenuModule} from '@angular/material/menu';
import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';


@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    CheckoutBarComponent,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    CheckoutBarComponent
  ]
})
export class SharedModule { }
