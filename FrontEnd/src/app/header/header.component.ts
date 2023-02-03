import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mattoolbar: MatToolbar;
  logged = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.logged$.subscribe(logged => {
      this.logged = logged;
      console.log("this.logged:", this.logged);
    });
  }

  logOut(){
    this.userService.setLogged(false);
    localStorage.clear();
  }

}
