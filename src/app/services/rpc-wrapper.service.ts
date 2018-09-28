import { Injectable } from '@angular/core';
import {RpcService} from './rpc.service';
import {Message, StompHeaders} from '@stomp/stompjs';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RpcWrapperService {

  private QUEUE = 'requests_to_core';
  // @ts-ignore
  private HEADERS: StompHeaders = {durable: false, 'auto-delete': true, exclusive: false};

  constructor(private rpcService: RpcService) {
  }

  public rpc(payload: string, headers: StompHeaders = {}): Observable<string> {
    const finalHeaders: StompHeaders = Object.assign(headers, this.HEADERS);
    return this.rpcService.rpc(this.QUEUE, payload, finalHeaders).pipe(
      map((message: Message) => message.body)
    );
  }

}
