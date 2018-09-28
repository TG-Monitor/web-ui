import { Component, OnInit } from '@angular/core';
import {CommService} from '../../services/comm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private commService: CommService) { }

  ngOnInit() {
  }

  login(phoneNumber: string): void {

  }

}
