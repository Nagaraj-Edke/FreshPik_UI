import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'all',
    loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'login',
    loadChildren: ()=> import('./authentication/authentication.module').then(m=> m.AuthenticationModule)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
