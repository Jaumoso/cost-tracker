import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mattoolbar: MatToolbar;
  constructor() { }

  ngOnInit() {
  }

}
