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
        console.log(acc)
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

  validateToken(token: string) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get(`${this.baseAPI}verify-token`,{headers})
  }

  getAddresses(token: string, userId?: number) {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get(`${this.baseAPI}secured/getAddresses?userId=${userId}`,{headers})
  }

  addNewAddress(address: any, userId: number) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    const addressId = address?.id
    return this.http.post(`${this.baseAPI}secured/addNew${addressId ? '/'+addressId: ''}?userId=${userId}`, address, {headers});
  }

  removeAddressById(userId: number, addressId: number) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.delete(`${this.baseAPI}secured/removeAddressById/${addressId}?userId=${userId}`,{headers});

  }

}
