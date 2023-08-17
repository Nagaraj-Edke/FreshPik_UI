import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DbService } from 'src/app/db.service';
import { SharedService } from 'src/app/shared/shared.service';
import { carousel } from 'src/app/types/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private dbService: DbService, private router: Router, private sharedService: SharedService) { }
  vegData: any = [];
  fruits: any = [];
  carousel: carousel[] = [
    {
      name: 'Fruits Banner',
      type: 'fruits',
      url: 'carosel2.jpg'
    },
    {
      name: 'Fruits Banner',
      type: 'fruits',
      url: 'carosel3.jpg'
    },
    {
      name: 'Vegitable Banner',
      type: 'vegitables',
      url: 'carosel5.png'
    },
    {
      name: 'Fruits Banner',
      type: 'fruits',
      url: 'carosel6.png'
    }
  ];
  
  ngOnInit() {
    const api1 = this.dbService.getData('vegitables', 4);
    const api2 = this.dbService.getData('fruits', 4);
    forkJoin([api1, api2]).subscribe((res: any) => {
      this.vegData = this.sharedService.getUpdateList(res[0])
      this.fruits = this.sharedService.getUpdateList(res[1])
    });
    this.sharedService.getSelctedItems().subscribe(()=>{
      this.vegData = this.sharedService.getUpdateList(this.vegData)
      this.fruits = this.sharedService.getUpdateList(this.fruits)
    })
  }

  navigateToAll(type: string){
    this.router.navigate(['/all'], {queryParams: {type}})
  }
}


