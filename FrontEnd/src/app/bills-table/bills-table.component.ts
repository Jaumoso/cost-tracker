import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Operation } from '../shared/Operation';
// import { Account } from '../shared/Account';
// import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddBillFormComponent } from '../add-bill-form/add-bill-form.component';

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.scss']
})
export class BillsTableComponent implements OnInit {

  users: User[] ;
  user: User;
  // accounts: Account[];
  // operations: Operation[];
  operation2: Operation;

  displayedColumns: string[] = ['name', 'email'];
  constructor(private userService: UserService,public dialog: MatDialog) {
    // console.log(userService.getUsers());
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.user = this.userService.getUser('1');
  }

  openAddBillForm(accountID: string, userID: string):void{
    this.dialog.open(AddBillFormComponent,{
      data: {
        accID: accountID,
        usID: userID
      },
     width:"800px",
     height: "600px"
    });
  }

  recoverOperation(userID:string, accountID: string, operation:Operation):void {
    this.userService.recoverOperation(userID,accountID, operation);
  }

}
