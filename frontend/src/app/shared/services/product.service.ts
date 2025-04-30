import { Injectable } from '@angular/core';
import {Product} from '../model/Product'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  sell(product: FormData) {
    return this.http.post('http://localhost:5000/sell', product);
  }

  updateProduct(product: FormData, id: string) {
    return this.http.patch('http://localhost:5000/update/' + id, product)
  }

  getAllActiveProducts() {
    return this.http.get<Product[]>('http://localhost:5000/getAllActiveProducts')
  }

  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:5000/getProduct/' + id)
  }

  getAllProductsByUser(username: string){
    return this.http.get<Product[]>('http://localhost:5000/getAllProductsByUser/' + username)
  }

  changeState(id: string | undefined, state: string){
    const bodyProduct = new URLSearchParams();
    bodyProduct.set('state', state)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.patch("http://localhost:5000/changeState/" + id, bodyProduct, {headers: headers})
  }

  deleteProduct(id: string | undefined){
    return this.http.delete('http://localhost:5000/deleteProduct/' + id);
  }
}
