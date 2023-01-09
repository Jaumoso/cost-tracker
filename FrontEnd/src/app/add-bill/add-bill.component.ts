import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account} from '../shared/Account';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Operation} from '../shared/Operation';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {


  @Input()
  userID: string;

  @Input()
  accountID: string;

  users: User[] ; 
  date= new Date();
  operID= '';
  operation2: Operation = {id:this.operID.toString(), concept:'', amount: 0, date: this.date.toLocaleDateString()};

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.users = this.userService.getUsers();

  }

  onSubmit(){
      this.operation2.id = this.userService.getMaxIdOper(this.userID,this.accountID); 
      this.userService.addOperation(this.userID, this.accountID, this.operation2);
      this.operation2 = {id:'', concept:'', amount: 0, date: this.date.toLocaleDateString()};
      // form.resetForm();
    }


}
