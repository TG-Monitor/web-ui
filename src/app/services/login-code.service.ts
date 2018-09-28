import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginCodeService {

  private loginCodeSubject: BehaviorSubject<string> = new BehaviorSubject(undefined);
  private loginCodeObservable = this.loginCodeSubject.asObservable();

  private isRequestOngoingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isRequestOngoingObservable = this.isRequestOngoingSubject.asObservable();

  constructor() {}

  getLoginCodeObservable(): Observable<string> {
    return this.loginCodeObservable;
  }

  setLoginCode(loginCode: string) {
    this.loginCodeSubject.next(loginCode);
  }

  getIsRequestOngoingObservable(): Observable<boolean> {
    return this.isRequestOngoingObservable;
  }

  setIsRequestOngoing(value: boolean) {
    this.isRequestOngoingSubject.next(value);
  }

}
