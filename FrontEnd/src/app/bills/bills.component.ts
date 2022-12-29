import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account} from '../shared/Account';
import { Operation} from '../shared/Operation';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  users: User[] ; 
  accounts: Account[];
  operations: Operation[];
  oper: Operation;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    // this.accounts = this.users.accounts;

  }

  onSelect(operation: Operation):void {
    this.oper= operation;
  }

  onSelectLess():void {
    this.oper= null;
  }
}
