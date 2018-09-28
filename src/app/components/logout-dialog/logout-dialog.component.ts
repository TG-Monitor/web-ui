import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CommService} from '../../services/comm.service';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private commService: CommService, private statusService: StatusService) { }

  ngOnInit() {}

  private logout(): void {
    this.commService.logout().subscribe(() => {
      this.statusService.setLoggedIn(false);
    });
  }

}
