import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddBillFormComponent } from '../add-bill-form/add-bill-form.component';

@Component({
  selector: 'app-bills-v2',
  templateUrl: './bills-v2.component.html',
  styleUrls: ['./bills-v2.component.scss']
})
export class BillsV2Component implements OnInit {

  users: User[] ;

  constructor(private userService: UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().then(usuarios => this.users = usuarios);
    // this.users = this.userService.getUsers();

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

}
