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
  operation2: Operation;
  userId: string;

  displayedColumns: string[] = ['name', 'email'];
  constructor(private userService: UserService,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) {
    // console.log(userService.getUsers());
  }

  ngOnInit() {
    
    this.userId= this.userService.getuserId();
    this.userService.getUser(this.userId).subscribe(usario => this.user = usario);
    
    // this.userService.getUsers().subscribe(usuarios => { this.users = usuarios; console.log(this.users) });
    // this.user= this.users.filter(user => user)[0]; 
    // console.log(this.user);
    // this.userService.getUser('63a175d0fab382593f7d265c').subscribe(usario => this.user = usario);
    // this.userService.getUsers().then(usuarios => this.users = usuarios);
    // this.userService.getUser('1').then(usario => this.user = usario);
    // this.users = this.userService.getUsers();
    // this.user = this.userService.getUser('1');
  }

  openAddBillForm(accountID: string, userID: string): void {
    const dialogRef = this.dialog.open(AddBillFormComponent, {
      data: {
        accID: accountID,
        usID: userID
      },
      width: "800px",
      height: "600px"
    });

    console.log("Before user: ", this.user);
    
    dialogRef.afterClosed().subscribe(
      newUser => {
        this.user = newUser;
        console.log("NewUser: ", newUser);
      }
    )

  }

  recoverOperation(userID: string, accountID: string, operation: Operation): void {
    const operAmount = operation.amount;
    this.userService.deleteOperation(operation).subscribe(
      oper => {
        this.userService.getAccount(accountID).subscribe(
          acc => {
            console.log("the operation: ", acc.totalMoney, "-", operAmount);
            acc.totalMoney -= operAmount;
            console.log("account after removing operation= ", acc);
            this.userService.editAccount(acc).subscribe(
              account => {
                acc = account;
                this.userService.getUser(userID).subscribe(
                  user => { this.user = user }
                )
              }
            )
          }
        )
        operation = oper
      }
    )
    // this.userService.recoverOperation(userID, accountID, operation);
  }

}
