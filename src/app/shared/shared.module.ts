import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CheckoutBarComponent } from './components/checkout-bar/checkout-bar.component'
import { MatMenuModule } from '@angular/material/menu';
import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';

const components = [
    CardComponent, HeaderComponent, CheckoutBarComponent, PopupComponent, SkeletonLoaderComponent
];
@NgModule({
  declarations: [
    ...components,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
