import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';





import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GridComponent } from './grid/grid.component';
import { PeersComponent } from './peers/peers.component';
import { PatternsComponent } from './patterns/patterns.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GridComponent,
    PeersComponent,
    PatternsComponent
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
