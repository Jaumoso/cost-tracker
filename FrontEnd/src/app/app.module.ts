import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { OperationDetailComponent } from './operation-detail/operation-detail.component';

import { UserService} from './services/user.service';

import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BillsV2Component } from './bills-v2/bills-v2.component';
import { OperationDetailV2Component } from './operation-detail-v2/operation-detail-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    OperationDetailComponent,
    HeaderComponent,
    FooterComponent,
    BillsV2Component,
    OperationDetailV2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
