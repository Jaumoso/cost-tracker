import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { Params, ActivatedRoute, Router, } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-operation-detail-v2',
  templateUrl: './operation-detail-v2.component.html',
  styleUrls: ['./operation-detail-v2.component.scss']
})
export class OperationDetailV2Component implements OnInit {

  account: string[];
  operationsIDs: string[];
  prev: string;
  next: string;

  operationID: number;
  userID: number;
  accountID: number;

  user: User;

  @Input()
  operation: Operation;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }


  ngOnInit() {
    this.userID = this.route.snapshot.params['userID'];
    this.accountID = this.route.snapshot.params['accountID'];
    this.operationID = this.route.snapshot.params['operationID'];


    // // this.user = this.userService.getUser(userID.toString());
    // this.userService.getUser(this.userID.toString()).subscribe(usario => this.user = usario);
    // // this.userService.getUser(userID.toString()).then(usario => this.user = usario);
    // console.log(this.user);
    // this.account=this.user.accounts.filter(account => account.id == this.accountID.toString())[0];
    // console.log(this.account);
    // this.operation= this.account.operations.filter(operation=> operation.id == this.operationID.toString())[0];
    // console.log(this.operation);

    // this.userService.getOperationsIds(this.userID.toString(),this.accountID.toString()).subscribe(operationsids => this.operationsIDs = operationsids);
    // console.log("operation.id"+this.operationsIDs);
    this.userService.getOperation(
      this.userID.toString(),
      this.accountID.toString(),
      this.operationID.toString())
      .subscribe(operation => this.operation = operation);

    this.userService.getOperationsIds(this.accountID.toString()).
      subscribe(operationsids => {
        this.operationsIDs = operationsids;
      });



    this.route.params
      .pipe(
        switchMap((params: Params) => this.userService.getOperation(
          this.userID.toString(),
          this.accountID.toString(),
          params['operationID'].toString())
        )).subscribe(operation => { this.operation = operation; this.setPrevNext(operation._id); });



  }

  setPrevNext(operationId: string) {
    console.log("Operation id: " + operationId);
    console.log("Operation ids: " + this.operationsIDs);
    console.log("Index: " + this.operationsIDs.indexOf(operationId));
    const index = this.operationsIDs.indexOf(operationId);
    this.prev = this.operationsIDs[(this.operationsIDs.length + index - 1) % this.operationsIDs.length];
    this.next = this.operationsIDs[(this.operationsIDs.length + index + 1) % this.operationsIDs.length];
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
                console.log("account =", account, " acc: ", acc);
                acc = account;
                this.userService.getUser(userID).subscribe(
                  user =>{
                    console.log("final user:", user);
                    
                  }
                )
              }

            )
          }
        )
        operation = oper;
        this.router.navigate(['/view2']);
      }
    )

    // this.userService.recoverOperation(userID,accountID, operation);
  }
}

    // goBack(): void {
    //   // this.location.back();
    //   this.location.go("view2");
    //   window.location.reload(); //no entiendo porque no funciona sin refrescar la pagina
    // }