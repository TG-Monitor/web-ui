import { Component, OnInit } from '@angular/core';

import { Peer } from '../../types/peer';
import {CommService} from '../../services/comm.service';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {

  peers: Peer[];

  constructor(private commService: CommService) { }

  ngOnInit() {
      this.commService.getPeers().subscribe(peers => {
        this.peers = peers;
      });
  }

  addPeer(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.commService.addPeer(name).subscribe(() => {
      this.peers.unshift({username: name});
    });
  }

  removePeer(peer: Peer) {
    this.commService.removePeer(peer).subscribe(() => {
      this.peers.splice(this.peers.indexOf(peer), 1);
    });
  }

}
