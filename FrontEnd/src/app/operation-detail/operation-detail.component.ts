import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/User';
import { Account} from '../shared/Account';
import { Operation} from '../shared/Operation';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.scss']
})
export class OperationDetailComponent implements OnInit {
  
  @Input()
  operation: Operation;
  constructor(private userService: UserService) { }


  ngOnInit() {
    
  }

 

}
