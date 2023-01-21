import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account } from '../shared/Account';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Operation } from '../shared/Operation';
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

  errMess: string;
  id: string;
  userCopy: User;
  user: User;
  accountCopy: Account;
  users: User[];
  date = new Date();
  operID = '';
  operation2: Operation = { concept: '', amount: 0, date: this.date.toLocaleDateString() };
  accounts: Account[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(usuarios => this.users = usuarios);
    this.userService.getUser(this.userID).subscribe(usuario => {
      this.userCopy = usuario;
    })


    // this.userService.getUsers().then(usuarios => this.users = usuarios);//with promises
    // this.users = this.userService.getUsers();//without promises/observables

  }

  onSubmit() {
    this.operation2.details = 'texto';
    this.operation2.location = 'texto';

    this.userService.createOperation(this.operation2)
      .subscribe(
        oper => {
          this.operation2 = oper;
          this.userService.getAccount(this.accountID).subscribe(
            acc => {
              this.accountCopy = acc;
              this.accountCopy = this.userService.addOperToAccount(this.accountCopy, this.operation2);
              this.userService.editAccount(this.accountCopy).subscribe(
                acc => this.accountCopy = acc
              )
            }
          );
        },
        err => this.errMess = err
      );
      // this.userService.getMaxIdOper(this.userID,this.accountID).subscribe(operID => this.operation2.id = operID);  //with use of Observables
      // this.userService.getMaxIdOper(this.userID,this.accountID).then(operID => this.operation2.id = operID);  //with use of promises
      // this.operation2.id = this.userService.getMaxIdOper(this.userID,this.accountID);  //without use of promises
      // this.userService.addOperation(this.userID, this.accountID, this.operation2);
  }
}
