import { Component, OnInit, inject } from '@angular/core';
import { enviornmet } from 'src/assets/enviornmet';
import { SharedService } from './shared/shared.service';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FreshPik';
  imgURL = enviornmet.imgURL;
  sharedService = inject(SharedService)
  dbService = inject(DbService)

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token){
      this.dbService.validateToken(token).subscribe((res: any)=>{
        if(res.valid){
          localStorage.setItem('user',JSON.stringify(res.user))
          this.sharedService.changeLoginStatus(true)
        }
      })
    }
  }

}
