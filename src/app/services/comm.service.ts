import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Peer} from '../types/peer';
import {SerializerService} from './serializer.service';
import {REQUESTS} from '../types/requests';
import {map} from 'rxjs/operators';
import {RpcWrapperService} from './rpc-wrapper.service';
import {StompService} from '@stomp/ng2-stompjs';
import {UUID} from 'angular2-uuid';
import {Message, StompHeaders} from '@stomp/stompjs';
import {LoginCodeService} from './login-code.service';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  constructor(private serializer: SerializerService, private rpc: RpcWrapperService,
              private stompService: StompService, private loginCodeService: LoginCodeService) { }

  public login(phoneNumber: string): Observable<any> {

    // Listen on temporary queue for login code request from core
    const queue: string = UUID.UUID();
    console.log('Declaring login code request queue ' + queue);
    this.stompService.subscribe(queue, {durable: false, 'auto-delete': true, exclusive: false})
      .subscribe((message: Message) => {
        console.log('Received login code request');
        // We know that it must be a get_login_code request, so no need to check
        const replyTo: string = message.headers['reply-to'];
        const correlationId: string = message.headers['correlation-id'];
        // @ts-ignore
        const replyHeaders: StompHeaders = {
          durable: false, 'auto-delete': true,
          exclusive: false, 'correlation-id': correlationId
        };

        this.loginCodeService.setIsRequestOngoing(true);
        this.loginCodeService.getLoginCodeObservable().subscribe((loginCode: string) => {
          if (loginCode === undefined) return;
          console.log('Received login code ' + loginCode + ', sending back response');
          const replyPayload: string = this.serializer.serializeResponse(loginCode);
          this.stompService.publish(replyTo, replyPayload, replyHeaders);
        });
    });

    // Make login request
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.LOGIN, phoneNumber);
    return this.rpc.rpc(payload, {'login_code_request_queue': queue});
  }

  public logout(): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.LOGOUT);
    return this.rpc.rpc(payload);
  }

  public isLoggedIn(): Observable<boolean> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.IS_LOGGED_IN);
    return this.rpc.rpc(payload).pipe(
      map((response: string) => this.serializer.deserializeResponse(response))
    );
  }

  public isRunning(): Observable<boolean> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.IS_RUNNING);
    return this.rpc.rpc(payload).pipe(
      map((response: string) => this.serializer.deserializeResponse(response))
    );
  }

  public start(): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.START);
    return this.rpc.rpc(payload);
  }

  public getPhoneNumber(): Observable<string> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.GET_PHONE_NUMBER);
    return this.rpc.rpc(payload).pipe(
      map((response: string) => this.serializer.deserializeResponse(response))
    );

  }

  public getPeers(): Observable<Peer[]> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.GET_PEERS);
    return this.rpc.rpc(payload).pipe(
      map((response: string): string[] => this.serializer.deserializeResponse(response)),
      map((arr: string[]): Peer[] => {
        const peers: Peer[] = [];
        arr.forEach(item => peers.push({username: item}));
        return peers;
      })
    );
  }

  public addPeer(peer: string): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.ADD_PEER, peer);
    return this.rpc.rpc(payload);
  }

  public removePeer(peer: Peer): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.REMOVE_PEER, peer.username);
    return this.rpc.rpc(payload);
  }



  public getPatterns(): Observable<string[]> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.GET_PATTERNS);
    return this.rpc.rpc(payload).pipe(
      map((response: string): string[] => this.serializer.deserializeResponse(response))
    );
  }

  public addPattern(pattern: string): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.ADD_PATTERN, pattern);
    return this.rpc.rpc(payload);
  }

  public removePattern(pattern: string): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.REMOVE_PATTERN, pattern);
    return this.rpc.rpc(payload);
  }


  public getEmails(): Observable<string[]> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.GET_EMAILS);
    return this.rpc.rpc(payload).pipe(
      map((response: string): string[] => this.serializer.deserializeResponse(response))
    );
  }

  public addEmail(email: string): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.ADD_EMAIL, email);
    return this.rpc.rpc(payload);
  }

  public removeEmail(email: string): Observable<any> {
    // @ts-ignore
    const payload: string = this.serializer.serializeRequest(REQUESTS.REMOVE_EMAIL, email);
    return this.rpc.rpc(payload);
  }

}
