import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CommService} from '../../services/comm.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {

  emails: string[];

  constructor(private commService: CommService) { }

  ngOnInit() {
    this.commService.getEmails().subscribe(emails => {
      this.emails = emails;
    });
  }

  addEmail(email: string) {
    email = email.trim();
    if (!email) { return; }
    this.commService.addEmail(email).subscribe(() => {
      this.emails.unshift(email);
    });
  }

  removeEmail(email: string) {
    this.commService.removeEmail(email).subscribe(() => {
      this.emails.splice(this.emails.indexOf(email), 1);
    });
  }

}
