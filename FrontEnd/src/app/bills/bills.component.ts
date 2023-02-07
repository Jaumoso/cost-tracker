import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  users: User[];
  user: User;
  userId: string;
  accounts: Account[];
  acc: Account;
  accOP: Account;
  operations: Operation[];
  oper: Operation;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId= this.userService.getuserId();
    this.userService.getUser(this.userId).subscribe(usario => this.user = usario);

    // this.userService.getUsers().subscribe(usuarios => this.users = usuarios);
    // this.userService.getUsers().then(usuarios => this.users=usuarios);
    // this.users = this.userService.getUsers();

  }

  onSelect(operation: Operation): void {
    this.oper = operation;
  }

  onSelectLess(): void {
    this.oper = null;
  }

  selectAccount(account: Account): void {
    this.acc = account;
  }
  
  selectUsers(users: User[]): void {
    this.users = users;
  }

  unselectAccount(): void {
    this.acc = null;
  }
  selectAccountOperation(account: Account): void {
    this.accOP = account;
  }

  unselectAccountOperation(): void {
    this.accOP = null;
  }

  recoverOperation(userID: string, accountID: string, operation: Operation): void {
    const operAmount = operation.amount;
    this.userService.deleteOperation(operation).subscribe(
      oper => {
        this.userService.getAccount(accountID).subscribe(
          acc => {
            acc.totalMoney -= operAmount;
            this.userService.editAccount(acc).subscribe(
              account => {
                acc = account;
                this.userService.getUsers().subscribe(
                  users => {
                    this.users= users;
                    // console.log("recover :", this.users)
                  }
                )
              }
            )
          }
        )
        operation = oper
      }
    )
    // this.userService.recoverOperation(userID,accountID, operation);
  }
}
