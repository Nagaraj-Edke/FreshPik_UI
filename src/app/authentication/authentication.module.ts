import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';



const route: Routes = [{path: '', component: LoginComponent}]
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    MatMenuModule
  ]
})
export class AuthenticationModule { }
