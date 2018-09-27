import { Component, OnInit } from '@angular/core';
import {CommService} from './services/comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Telegram Watcher';

  constructor(private commService: CommService) {}

  ngOnInit(): void {
    this.commService.isRunning().subscribe((isRunning: boolean) => {
      if (!isRunning) {
        console.log('Monitor is not running');
        this.commService.start().subscribe(() => {
          console.log('Started monitor');
        });
      }
    });
  }

}
