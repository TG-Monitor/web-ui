import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GridComponent } from './components/grid/grid.component';
import { PeersComponent } from './components/peers/peers.component';
import { PatternsComponent } from './components/patterns/patterns.component';
import {StompConfig, StompRService, StompService} from '@stomp/ng2-stompjs';
import {RpcService} from './services/rpc.service';
import {CommService} from './services/comm.service';
import {RpcWrapperService} from './services/rpc-wrapper.service';
import { StatusComponent } from './components/status/status.component';
import { MenuComponent} from './components/menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material';
import {StatusService} from './services/status.service';
import { LoginComponent } from './components/login/login.component';
import {LoginCodeService} from './services/login-code.service';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';


const stompConfig: StompConfig = {
  url: 'ws://127.0.0.1:15674/ws',
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  entryComponents: [
    EmailDialogComponent,
    LogoutDialogComponent
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    GridComponent,
    PeersComponent,
    PatternsComponent,
    StatusComponent,
    MenuComponent,
    EmailDialogComponent,
    LoginComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    MatDialog,
    StompService,
    StompRService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    RpcService,
    RpcWrapperService,
    CommService,
    StatusService,
    LoginCodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
