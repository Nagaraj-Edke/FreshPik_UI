import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  itemCount: number = 0;
  private _selectedItemsCount: BehaviorSubject<number> = new  BehaviorSubject<number>(0);
  selectedItems$ = this._selectedItemsCount.asObservable();

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();
  constructor() {
    const data = localStorage.getItem('items');
    if(data){
      this.savedItems = JSON.parse(data);
      this.itemCount = this.savedItems.reduce((count,item)=>{
        count = count + (item.count || 0);
        return count;
      }, 0);
      this._selectedItemsCount.next(this.itemCount);
    }
  }

  private savedItems: any[] = [];

  getSelctedItems() {
    return this.selectedItems$;
  }

  getSelectedItemList() {
    return this.savedItems
  }

  resetSelectedItemList() {
    this.savedItems = [];
    this._selectedItemsCount.next(0)
  }

  updateSavedItem(data: any, count?: number) {
    let updated = false;
    this.itemCount += 1;
    for(let item of this.savedItems){
      if(item._id === data._id){
        item['count'] = (item.count) + 1;
        updated = true;
        break;
      }
    }
    if(!updated){
      data['count'] = 1;//count;
      this.savedItems.push(data);
    }
    this._selectedItemsCount.next(this.itemCount);
    localStorage.setItem('items', JSON.stringify(this.savedItems));
  }
/*
    updateSavedItem(id: any, count?: number) {
    let updated = false;
    this.itemCount += 1;
    for(let item of this.savedItems){
      if(item._id === id){
        item['count'] = item.count + 1;
        updated = true;
        break;
      }
    }
    if(!updated){
      const data = {
        count : 1,
        _id: id
      }
      this.savedItems.push(data);
    }
    this._selectedItemsCount.next(this.itemCount);
    localStorage.setItem('items', JSON.stringify(this.savedItems));
  }*/


  removeItem(id: string){
    for(let index in this.savedItems){
      if(this.savedItems[index]._id === id) {
        if(this.savedItems[index].count > 0){
          this.savedItems[index].count -= 1;
          // if(this.savedItems[index].count === 0) {
          //   this.savedItems.splice(+index, 1);
          // }
        }

        this.itemCount -= 1;
        this._selectedItemsCount.next(this.itemCount)
      }
    }
    localStorage.setItem('items', JSON.stringify(this.savedItems));
  }

  getUpdateList(data: any) {
    for( let i of this.savedItems){
      for(let item of data){
        if(item._id === i._id){
          item.count = i.count;
          break;
        }
      }
    }
    return data;
  }

  checkLoginStatus() {
    return this.isLoggedIn$;
  }

  changeLoginStatus(bool: boolean) {
    this._isLoggedIn.next(bool);
  }
}
