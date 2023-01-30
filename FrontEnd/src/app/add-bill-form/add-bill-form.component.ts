import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operation } from '../shared/Operation';
import { UserService } from '../services/user.service';
import { Account } from '../shared/Account';
import { User } from '../shared/User';

@Component({
  selector: 'app-add-bill-form',
  templateUrl: './add-bill-form.component.html',
  styleUrls: ['./add-bill-form.component.scss']
})
export class AddBillFormComponent implements OnInit {

  @ViewChild('fform') addbillFormDirective;

  addbillform: FormGroup;
  bill: Operation;
  errMess: string;
  accountCopy: Account;
  user: User;


  constructor(
    public dialogRef: MatDialogRef<AddBillFormComponent>,
    private userService: UserService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data, //i pass the parameters from the other view to the dialog
  ) {
    this.createForm();
  }

  ngOnInit() {
    // console.log(this.data.usID );
    // console.log(this.data.accID );

  }

  createForm() {
    this.addbillform = this.formbuilder.group({
      date: ['', Validators.required],
      concept: ['', Validators.required],
      amount: [null, Validators.required]
    });
  }

  onSubmit() {
    this.bill = this.addbillform.value;
    // this.userService.getMaxIdOper(this.data.usID,this.data.accID).subscribe(billID => this.bill.id =billID); 
    // this.userService.getMaxIdOper(this.data.usID,this.data.accID).then(billID => this.bill.id =billID); 
    // this.bill.id = this.userService.getMaxIdOper(this.data.usID,this.data.accID); 
    // this.userService.addOperation(this.data.usID, this.data.accID, this.bill);
    // console.log("bill is: " +this.bill);

    this.userService.createOperation(this.bill)
      .subscribe(
        oper => {
          this.bill = oper;
          this.userService.getAccount(this.data.accID).subscribe(
            acc => {
              this.accountCopy = acc;
              this.accountCopy = this.userService.addOperToAccount(this.accountCopy, this.bill);
              this.userService.editAccount(this.accountCopy).subscribe(
                acc => {
                  this.accountCopy = acc;
                  this.userService.getUser(this.data.usID).subscribe(
                    user => {
                      this.user = user;
                      this.userService.editUser(user).subscribe(
                        usuario => {
                          this.user = usuario;
                          this.addbillform.reset({
                            date: '',
                            concept: '',
                            amount: null
                          });
                          this.addbillFormDirective.reset();
                          this.dialogRef.close(user);
                        }
                      )
                    }
                  );
                }
              )
            }
          );
        },
        err => this.errMess = err
      );


  }

}
