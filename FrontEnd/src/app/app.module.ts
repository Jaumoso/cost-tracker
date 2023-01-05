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
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { UserService} from './services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { OperationDetailComponent } from './operation-detail/operation-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BillsV2Component } from './bills-v2/bills-v2.component';
import { OperationDetailV2Component } from './operation-detail-v2/operation-detail-v2.component';
import { BillsTableComponent } from './bills-table/bills-table.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { AddBillFormComponent } from './add-bill-form/add-bill-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    OperationDetailComponent,
    HeaderComponent,
    FooterComponent,
    BillsV2Component,
    OperationDetailV2Component,
    BillsTableComponent,
    AddBillComponent,
    AddBillFormComponent,

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
    MatTableModule,
    AppRoutingModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  entryComponents:[ AddBillFormComponent ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
