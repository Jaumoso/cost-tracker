import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
// import { Account } from '../shared/Account';
// import { Operation } from '../shared/Operation';
import { User } from '../shared/User';

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

  displayedColumns: string[] = ['name', 'email'];
  constructor(private userService: UserService) {
    // console.log(userService.getUsers());
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.user = this.userService.getUser('1');
  }

}
