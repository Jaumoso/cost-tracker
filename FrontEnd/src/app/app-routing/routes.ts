import { Routes } from '@angular/router';
import { BillsTableComponent } from '../bills-table/bills-table.component';
import { BillsV2Component } from '../bills-v2/bills-v2.component';

import { BillsComponent } from '../bills/bills.component';
import { OperationDetailV2Component } from '../operation-detail-v2/operation-detail-v2.component';
import { OperationDetailComponent } from '../operation-detail/operation-detail.component';

export const routes: Routes = [
    {path: "view1" , component: BillsComponent},
    {path: "view2" , component: BillsV2Component},
    {path: "view3" , component: BillsTableComponent},
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: 'operationDetail/:userID/:accountID/:operationID', component: OperationDetailV2Component}
];
