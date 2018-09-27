import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EmailDialogComponent} from '../email-dialog/email-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEmailDialog(): void {
    const dialogRef = this.dialog.open(EmailDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
