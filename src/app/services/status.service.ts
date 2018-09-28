import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  private isLoggedInObservable = this.isLoggedInSubject.asObservable();

  constructor() { }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInObservable;
  }

  setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
}
