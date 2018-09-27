import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {first} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';
import {StompService} from '@stomp/ng2-stompjs';
import {Message, StompHeaders} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  private replyQueue = '/temp-queue/reply-to';

  constructor(private stompService: StompService) {}

  public rpc(queueName: string, msgPayload: string, headers: StompHeaders = {}): Observable<Message> {

    // Copy headers (because the headers variable is reused across invocations of 'rpc')
    const headersCopy = {};
    for (let key in headers) {
      headersCopy[key] = headers[key];
    }

    console.log('Carrying out RPC request');
    // Observable for the client (will emit reply to RPC request)
    return new Observable<Message>((observer: Subscriber<Message>) => {

      // Correlation ID used for this RPC request
      const correlationId: string = UUID.UUID();
      console.log('Using correlation ID ' + correlationId);


      // Check all arriving messages and pick the one with above correlation ID
      const replyMessage: Observable<Message> = this.stompService.defaultMessagesObservable.pipe(
        first((message: Message) => {
          return message.headers['correlation-id'] === correlationId;
        })
      );

      // When the correct reply message is emitted by above observable, emit the
      // message to the client and complete the client observable.
      replyMessage.subscribe((message: Message) => {
        observer.next(message);
        observer.complete();
      });

      // Send the request
      headersCopy['reply-to'] = this.replyQueue;
      headersCopy['correlation-id'] = correlationId;
      console.log('publish message with headers: ' + JSON.stringify(headers));
      this.stompService.publish(queueName, msgPayload, headersCopy);
    });
  }
}
