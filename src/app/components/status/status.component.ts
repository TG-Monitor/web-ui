import { Component, OnInit } from '@angular/core';
import {CommService} from '../../services/comm.service';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  isLoggedIn: boolean;
  phoneNumber: string;

  constructor(private commService: CommService, private statusService: StatusService) { }

  ngOnInit() {

    this.statusService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });

    if (this.isLoggedIn) {
      this.commService.getPhoneNumber().subscribe((num: string) => {
        this.phoneNumber = num;
      });
    }
  }

}
