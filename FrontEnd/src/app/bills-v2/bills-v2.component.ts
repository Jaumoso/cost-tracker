import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../shared/User';

@Component({
  selector: 'app-bills-v2',
  templateUrl: './bills-v2.component.html',
  styleUrls: ['./bills-v2.component.scss']
})
export class BillsV2Component implements OnInit {

  users: User[] ;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();

  }

}
