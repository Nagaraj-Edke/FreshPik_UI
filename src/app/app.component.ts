import { Component, OnInit, inject } from '@angular/core';
import { enviornmet } from 'src/assets/enviornmet';
import { SharedService } from './shared/shared.service';
import { DbService } from './db.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from './shared/components/popup/popup.component';
import { Router } from '@angular/router';
import { popup } from './core/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FreshPik';
  imgURL = enviornmet.imgURL;
  sharedService = inject(SharedService);
  dbService = inject(DbService);
  dialog = inject(MatDialog);
  router = inject(Router)
  dialogRef!:MatDialogRef<PopupComponent>;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.dbService.validateToken().subscribe({
        next: (res: any) => {
          if (res.valid) {
            localStorage.setItem('user', JSON.stringify(res.user))
            this.sharedService.changeLoginStatus(true)
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            const data: popup = {
              title: "Login Session Expired",
              description: "Your login session has expired.",
              ok: "Login agian",
              cancel: "Close"
            }
            this.dialogRef = this.dialog.open(PopupComponent, {
              width: '350px',
              data: data
            });
            this.dialogRef.afterClosed().subscribe((res) => {
              if (res.message === data.ok) {
                const queryParams = {
                  redirect: this.router.url.slice(1)
                }
                this.router.navigate(['/login'], { queryParams })
              }
            });
          }
        }
      });
    }
  }

}
