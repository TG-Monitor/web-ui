import { Component, OnInit } from '@angular/core';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

}
