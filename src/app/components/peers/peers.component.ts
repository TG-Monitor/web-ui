import { Component, OnInit } from '@angular/core';

import { Peer } from '../../types/peer';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {

  peers: Peer[];

  constructor(private peerService: PeerService) { }

  ngOnInit() {
    this.peers = this.peerService.getPeers();
  }

  addPeer(username: string) {
    username = username.trim();
    if (!username) { return; }
    const newPeer: Peer = this.peerService.addPeer(username);
    this.peers.unshift(newPeer);
  }

  deletePeer(peer: Peer) {
    this.peerService.deletePeer(peer);
    this.peers.splice(this.peers.indexOf(peer), 1);
  }

}
