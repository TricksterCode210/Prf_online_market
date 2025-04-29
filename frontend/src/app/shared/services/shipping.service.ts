import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Shipping} from '../model/Shipping'

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }

  makeShipping(shipping: Shipping) {
    const bodyShipping = new URLSearchParams();
    bodyShipping.set("from", shipping.from)
    bodyShipping.set("to", shipping.to)
    bodyShipping.set("buyer", shipping.buyer)
    bodyShipping.set("seller", shipping.seller)
    bodyShipping.set("arrivalFirst", new Date(shipping.arrivalFirst).toISOString().substring(0, 10))
    bodyShipping.set("arrivalLast", new Date(shipping.arrivalLast).toISOString().substring(0, 10))
    bodyShipping.set("productName", shipping.productName)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/shipping', bodyShipping, {headers: headers})
  }

  getAllShippingDetails() {
    return this.http.get<Shipping[]>('http://localhost:5000/getAllShipping')
  }
}
