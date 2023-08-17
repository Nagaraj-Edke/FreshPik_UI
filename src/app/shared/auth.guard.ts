import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService) {}

  canActivate(): boolean {

    let isLoggedIn: boolean = false;
    this.sharedService.checkLoginStatus().subscribe((res: boolean)=>{
      isLoggedIn = res;
      console.log(res)
    });

    if (isLoggedIn) {
      this.router.navigate(['/cart/payment']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
