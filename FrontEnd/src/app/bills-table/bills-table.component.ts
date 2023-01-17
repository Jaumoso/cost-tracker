import { Component, OnInit, Inject } from '@angular/core';
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

  users: User[];
  user: User;
  // accounts: Account[];
  // operations: Operation[];
  operation2: Operation;

  displayedColumns: string[] = ['name', 'email'];
  constructor(private userService: UserService,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) { 
    // console.log(userService.getUsers());
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(usuarios => {this.users = usuarios;  console.log(this.users)});
    // this.user= this.users.filter(user => user)[0]; 
    // console.log(this.user);
    this.userService.getUser('63a175d0fab382593f7d265c').subscribe(usario => this.user = usario);
    console.log(this.user);

    // this.userService.getUsers().then(usuarios => this.users = usuarios);
    // this.userService.getUser('1').then(usario => this.user = usario);
    // this.users = this.userService.getUsers();
    // this.user = this.userService.getUser('1');
  }

  openAddBillForm(accountID: string, userID: string): void {
    this.dialog.open(AddBillFormComponent, {
      data: {
        accID: accountID,
        usID: userID
      },
      width: "800px",
      height: "600px"
    });
  }

  recoverOperation(userID: string, accountID: string, operation: Operation): void {
    this.userService.recoverOperation(userID, accountID, operation);
  }

}
