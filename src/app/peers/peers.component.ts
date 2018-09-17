import { Component, OnInit } from '@angular/core';

import { Peer } from '../types/peer';
import { PEERS } from '../types/mock-peers';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {

  peers: Peer[] = PEERS;

  constructor() { }

  ngOnInit() {
  }

  addPeer(username: string) {
    username = username.trim();
    if (!username) { return; }
    this.peers.unshift({username: username});
  }

  deletePeer(peer: Peer) {
    this.peers.splice(this.peers.indexOf(peer), 1);
  }

}
