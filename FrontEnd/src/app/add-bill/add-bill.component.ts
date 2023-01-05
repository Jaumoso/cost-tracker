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
  accounts: Account[];
  operations: Operation[];
  date= new Date();
  operID= '';
  operation2: Operation = {id:this.operID.toString(), concept:'', amount: 0, date: this.date.toLocaleDateString()};

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.users = this.userService.getUsers();
    //i convert them to num for the addition and then i convert them back to string for the assignation
    // console.log(this.userService.getMaxIdOper(this.userID,this.accountID));
    // console.log(this.operation);
    // console.log(this.userID);
    // console.log(this.accountID);
    // console.log("operID: ",this.operID);

  }

  onSubmit(form: NgForm){
      // this.operID=this.userService.getMaxIdOper(this.userID,this.accountID); 
      this.operation2.id = this.userService.getMaxIdOper(this.userID,this.accountID); 
      this.userService.addOperation(this.userID, this.accountID, this.operation2);
      // form.resetForm();
    }


}
