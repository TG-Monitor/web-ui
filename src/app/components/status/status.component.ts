import { Component, OnInit } from '@angular/core';
import {CommService} from '../../services/comm.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public isLoggedIn: boolean;
  public phoneNumber: string;

  constructor(private commService: CommService) { }

  ngOnInit() {
    this.commService.isLoggedIn().subscribe((bool: boolean) => {
      this.isLoggedIn = bool;
      if (this.isLoggedIn) {
        this.commService.getPhoneNumber().subscribe((num: string) => {
          this.phoneNumber = num;
        });
      }
    });
  }

}
