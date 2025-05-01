import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Order} from '../model/Order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  makeOrder(order: Order){
    const bodyOrder = new URLSearchParams();
    bodyOrder.set('buyerName', order.buyerName)
    bodyOrder.set('sellerName', order.sellerName)
    bodyOrder.set('price', order.price.toString())
    bodyOrder.set('productName', order.productName)
    bodyOrder.set('imageSrc', order.imageSrc)
    bodyOrder.set('shippingAddress', order.shippingAddress)
    bodyOrder.set('productId', order.productId)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/makeOrder', bodyOrder, {headers: headers, withCredentials: true})
  }

  getAllOrders() {
    return this.http.get<Order[]>('http://localhost:5000/getAllOrders', {withCredentials: true});
  }

  deleteOrder(id: string) {
    return this.http.delete("http://localhost:5000/deleteOrder/" + id, {withCredentials: true})
  }
}
