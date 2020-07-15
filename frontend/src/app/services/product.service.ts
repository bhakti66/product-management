import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from '../models/products';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"product/all").pipe();
  }

  markProduct(email,key,productId){
    var body = {
      "email": email,
      "key": key,
      "productId": productId
    }
    return this.http.put(environment.apiUrl+"user/markFavCart",body).pipe();
  }

  getMarkedProducts(email,key){
    var body = {
      "email": email,
      "key": key
    }
    return this.http.post<Product[]>(environment.apiUrl+"user/markedProducts",body).pipe();
  }

  deleteProduct(itemId){
    return this.http.put(environment.apiUrl+"product/delete",{_id:itemId}).pipe();
  }

  addUpdateProduct(item){
    return this.http.post(environment.apiUrl+"product/addEdit",item).pipe();
  }
}
