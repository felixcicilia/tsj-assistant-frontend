import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  AddressType,
  addresses,
  paymentMethod,
  PaymentMethodType,
} from 'src/app/pages/account/pages/billing/data'

@Injectable({ providedIn: 'root' })
export class CrudService {
  constructor() {}

  // billAdress List
  fetchbillAddress(): Observable<AddressType[]> {
    return of(addresses)
  }

  addbillAddress(newData: AddressType): Observable<AddressType[]> {
    let newTasks = [...addresses, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newTasks)
  }

  fetchPaymentMethod(): Observable<PaymentMethodType[]> {
    return of(paymentMethod)
  }

  // add PAyment
  addPayment(newData: PaymentMethodType): Observable<PaymentMethodType[]> {
    let newPayment = [...paymentMethod, newData]
    return of(newPayment)
  }
}
