import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Peer} from '../types/peer';
import {SerializerService} from './serializer.service';
import {REQUESTS} from '../types/requests';
import {map} from 'rxjs/operators';
import {RpcWrapperService} from './rpc-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  constructor(private serializer: SerializerService, private rpc: RpcWrapperService) { }

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

}
