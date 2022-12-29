import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../shared/Operation';

@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.scss']
})
export class OperationDetailComponent implements OnInit {

  @Input()
  operation: Operation;
  constructor() { }

  ngOnInit() {
  }

}
