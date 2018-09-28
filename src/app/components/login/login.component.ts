import {Component, OnInit} from '@angular/core';
import {CommService} from '../../services/comm.service';
import {LoginCodeService} from '../../services/login-code.service';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginCodeRequest = false;

  constructor(private commService: CommService, public loginCodeService: LoginCodeService, private statusService: StatusService) { }

  ngOnInit() {
    this.loginCodeService.getIsRequestOngoingObservable().subscribe((value: boolean) => {
      this.isLoginCodeRequest = value;
    });
  }

  login(phoneNumber: string): void {
    this.commService.login(phoneNumber).subscribe(() => {
      this.statusService.setLoggedIn(true);
      this.loginCodeService.setIsRequestOngoing(false);
      this.loginCodeService.setLoginCode(undefined);
    });
  }

}
