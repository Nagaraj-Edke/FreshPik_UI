import { Component, HostListener, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-compo',
  templateUrl: './compo.component.html',
  styleUrls: ['./compo.component.scss']
})
export class CompoComponent implements OnInit {
  showFiller = true;

  constructor(private dbService: DbService, private activeRoute: ActivatedRoute, private router: Router, private sharedService: SharedService) { }

  panelOpenState = true;
  vegCheckbox = false;
  fruitsCheckbox = false;
  data: any[] = [];
  vegData: any[] = [];
  fruitsData: any[] = [];
  width = window.screen.width;
  mode: MatDrawerMode = 'side';
  filterSidebar: boolean = true;
  arr: any[] = new Array(21);
  cardsLoaded: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    this.sidebarMode(newWidth)
  }
  ngOnInit(): void {
    this.sidebarMode(this.width);
    this.getData();
  }

  getData() {
    const vegAPI = this.dbService.getData('vegitables');
    const fruitsAPI = this.dbService.getData('fruits');
    const queryParams = this.activeRoute.queryParams;
    combineLatest([vegAPI, fruitsAPI, queryParams]).subscribe((res: any) => {
      this.vegData = res[0];
      this.fruitsData = res[1];
      const type = res[2]?.type;
      const search = res[2]?.search;
      this.cardsLoaded = true;
      this.data = this.sharedService.getUpdateList([...this.vegData, ...this.fruitsData])
      if (type === 'vegitables') {
        this.vegCheckbox = true;
        this.data = this.sharedService.getUpdateList([...this.vegData])
      }
      if (type === 'fruits') {
        this.fruitsCheckbox = true;
        this.data = this.sharedService.getUpdateList([...this.fruitsData])
      }
      if(search){
        this.filterBySearch(search);
      }
    });

    this.sharedService.getSelctedItems().subscribe(()=>{
      this.data = this.sharedService.getUpdateList(this.data)
    })
  }

  sidebarMode(width: number) {  
    this.mode = width > 768 ? 'side' : 'over';
    if(width<769){
      this.filterSidebar = false;
      const num = width > 425 ? 12 : 8;
      this.arr = new Array(num);
    } else {
      this.filterSidebar = true;
      this.arr = new Array(21);
    }
  }

  change() {
    if((this.vegCheckbox && this.fruitsCheckbox)|| (!this.vegCheckbox && !this.fruitsCheckbox)){
      this.data = this.sharedService.getUpdateList([...this.vegData, ...this.fruitsData])
    }
    else if(this.vegCheckbox){
      this.data = this.sharedService.getUpdateList(this.vegData);
    }
    else {
      this.data = this.sharedService.getUpdateList(this.fruitsData);
    }
  }

  extractAlphabets(input: string) {
    let alphabetsOnly = '';
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        alphabetsOnly += char;
      }
    }
  
    return (alphabetsOnly.toLocaleLowerCase());
  }

  filterBySearch(search: string){
    if(!search) return;
    search = this.extractAlphabets(search);
    this.data = this.data.filter((item)=> this.extractAlphabets(item.name).includes(search));
  }

}
