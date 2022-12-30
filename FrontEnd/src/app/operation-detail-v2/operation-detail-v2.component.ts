import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account} from '../shared/Account';
import { Operation} from '../shared/Operation';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-operation-detail-v2',
  templateUrl: './operation-detail-v2.component.html',
  styleUrls: ['./operation-detail-v2.component.scss']
})
export class OperationDetailV2Component implements OnInit {

  user:User;
  account:Account
  @Input()
  operation: Operation;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) { }


  ngOnInit() {
    const userID = +this.route.snapshot.params['userID'];
    const accountID = +this.route.snapshot.params['accountID'];
    const operationID = +this.route.snapshot.params['operationID'];

    this.user = this.userService.getUser(userID.toString());
    this.account=this.user.accounts.filter(account => account.id == accountID.toString())[0];
    this.operation= this.account.operations.filter(operation=> operation.id == operationID.toString())[0];
  }

  goBack(): void {
    this.location.back();
  }
}
