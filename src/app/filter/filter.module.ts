import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoComponent } from './compo/compo.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CompoComponent
  }
]
@NgModule({
  declarations: [
    CompoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatExpansionModule
  ]
})
export class FilterModule { }
