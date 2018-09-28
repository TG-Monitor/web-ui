import { Component, OnInit } from '@angular/core';
import {CommService} from './services/comm.service';
import {StatusService} from './services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private commService: CommService, private statusService: StatusService) {}

  ngOnInit(): void {

    // Use login status from StatusService (default is false)
    this.statusService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });


    this.commService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.statusService.setLoggedIn(true);
        this.commService.isRunning().subscribe((isRunning: boolean) => {
          if (!isRunning) {
            console.log('Monitor is not running');
            this.commService.start().subscribe(() => {
              console.log('Started monitor');
            });
          }
        });
      }
      else {
        this.statusService.setLoggedIn(false);
      }
    });
  }

}
