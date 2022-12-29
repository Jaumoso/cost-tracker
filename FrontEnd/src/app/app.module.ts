import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { OperationDetailComponent } from './operation-detail/operation-detail.component';

import { UserService} from './services/user.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    OperationDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
