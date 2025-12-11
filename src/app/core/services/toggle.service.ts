import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private isTrueSubject = new BehaviorSubject(false)
  isTrue$ = this.isTrueSubject.asObservable()

  constructor() {}

  setTrue(): void {
    this.isTrueSubject.next(true)
  }

  setFalse(): void {
    this.isTrueSubject.next(false)
  }

  toggle(): void {
    this.isTrueSubject.next(!this.isTrueSubject.value)
  }
}
