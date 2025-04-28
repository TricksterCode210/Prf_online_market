import { Injectable } from '@angular/core';
import {Product} from '../model/Product'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {User} from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  sell(product: Product){
    const bodyProduct = new URLSearchParams();
    bodyProduct.set('name', product.name)
    bodyProduct.set('price', product.price.toString())
    bodyProduct.set('description', product.description)
    bodyProduct.set('imageSrc', product.imageSrc)
    bodyProduct.set('username', product.username)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/sell', bodyProduct, {headers: headers})
  }

  updateProduct(product: Product, id: string) {
    const bodyProduct = new URLSearchParams();
    bodyProduct.set('name', product.name)
    bodyProduct.set('price', product.price.toString())
    bodyProduct.set('description', product.description)
    bodyProduct.set('imageSrc', product.imageSrc)
    bodyProduct.set('username', product.username)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.patch('http://localhost:5000/update/' + id, bodyProduct, {headers: headers})
  }

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:5000/getAllProducts')
  }

  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:5000/getProduct/' + id)
  }

  getAllProductsByUser(username: string){
    return this.http.get<Product[]>('http://localhost:5000/getAllProductsByUser/' + username)
  }

  buyingProduct(id: string){

    return this.http.delete("http://localhost:5000/buying/" + id)
  }
}
