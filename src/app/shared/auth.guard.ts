import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { DbService } from '../db.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  dbService = inject(DbService)
  constructor(private router: Router, private sharedService: SharedService) { }

  async canActivate(): Promise<boolean> {
    let isLoggedInUser = this.sharedService.isLoggedIn();
    if (!isLoggedInUser) {
      if (localStorage.getItem('token')) {
        try {
          const source$ = this.dbService.validateToken();
          const value: any = await lastValueFrom(source$);
          isLoggedInUser = value.valid;
        } catch (e: HttpErrorResponse | any) {
          isLoggedInUser = e?.error?.valid;
        }
      }
    }

    if (isLoggedInUser) {
      return true;
    } else {
      const redirect = this.router.url.slice(1)
      this.router.navigate(['/login'], {queryParams: {redirect}});
      return false;
    }
  }

}
