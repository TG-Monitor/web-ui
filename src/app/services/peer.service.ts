import { Injectable } from '@angular/core';

import { Peer } from '../types/peer';
import { PEERS } from '../types/mock-peers';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peers: Peer[] = PEERS;

  constructor() { }

  getPeers(): Peer[] {
    return this.peers.slice();
  }

  addPeer(username: string): Peer {
    const peer: Peer = new Peer(username);
    this.peers.unshift(peer);
    return peer;
  }

  deletePeer(peer: Peer): void {
    this.peers.splice(this.peers.indexOf(peer), 1);
  }
}
