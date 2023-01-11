import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operation } from '../shared/Operation';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-bill-form',
  templateUrl: './add-bill-form.component.html',
  styleUrls: ['./add-bill-form.component.scss']
})
export class AddBillFormComponent implements OnInit {

  @ViewChild('fform') addbillFormDirective;

  addbillform: FormGroup;
  bill: Operation;

  constructor(private userService: UserService,
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
      id: '',
      date: ['',Validators.required],
      concept: ['',Validators.required],
      amount:[0, Validators.required]
    });
  }

  onSubmit(){
    this.bill=this.addbillform.value;
    this.userService.getMaxIdOper(this.data.usID,this.data.accID).subscribe(billID => this.bill.id =billID); 
    // this.userService.getMaxIdOper(this.data.usID,this.data.accID).then(billID => this.bill.id =billID); 
    // this.bill.id = this.userService.getMaxIdOper(this.data.usID,this.data.accID); 
    this.userService.addOperation(this.data.usID, this.data.accID, this.bill);
    console.log("bill is: " +this.bill);
    this.addbillform.reset({
      id: '',
      date: '',
      concept: '',
      amount:0
    });
    this.addbillFormDirective.reset();
  }

}
