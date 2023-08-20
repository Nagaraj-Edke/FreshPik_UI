import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  baseAPI: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }
  sharedService = inject(SharedService)

  getData(type: string, limit?: number) {
    let API = this.baseAPI + type;
    if(limit){
      API = API + `?limit=${limit}`
    }
    return this.http.get(API)
  }

  getDataByIds() {
    let ids = [];
    const items = localStorage.getItem('items')
    if(items) {
      ids = JSON.parse(items).reduce((acc: string[],item: any)=> {
        acc.push(item._id)
        return acc;
      }, [])
    }
    return this.http.post(`${this.baseAPI}getDataByIds`,{ids});
  }

  signUp(body: any) {
    return this.http.post(`${this.baseAPI}signup`,body);
  }

  login(body: any) {
    return this.http.post(`${this.baseAPI}login`, body)
  }

  validateToken() {
    return this.http.get(`${this.baseAPI}verify-token`)
  }

  getAddresses(userId?: number) {
    return this.http.get(`${this.baseAPI}secured/getAddresses?userId=${userId}`)
  }

  addNewAddress(address: any, userId: number) {
    const addressId = address?.id
    return this.http.post(`${this.baseAPI}secured/addNew${addressId ? '/'+addressId: ''}?userId=${userId}`, address);
  }

  removeAddressById(userId: number, addressId: number) {
    return this.http.delete(`${this.baseAPI}secured/removeAddressById/${addressId}?userId=${userId}`);

  }

  getUserProfileData(userId: number = 4) {
    return this.http.get(`${this.baseAPI}secured/userDetails?userId=${userId}`)

  }

}
