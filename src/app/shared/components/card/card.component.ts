import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { enviornmet } from 'src/assets/enviornmet';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() veg: any;
  imgURL = enviornmet.imgURL;
  first: boolean = false;
  // quantity: number = 1;
  count = 0;

  constructor(private sharedSerive: SharedService) { }

  ngOnInit() {
    this.count = this.veg.count || 0;
    if(this.count === 0) {
      this.first = true
    }
  } 

  ngOnChanges(c: any) {
    // console.log(c)
  }
  addToCart() {
    if((this.count+1) > 5) return;

    this.first = false;
    this.count+= 1;

    this.sharedSerive.updateSavedItem(this.veg)
  }

  deleteOne() {
    if(this.veg.count === 0) {
      console.log(this.veg)
    }
    this.sharedSerive.removeItem(this.veg._id);
  }

}
