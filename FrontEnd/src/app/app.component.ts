import { Component  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'FrontEnd';

  ngOnInit() {
    //we use this even to clear the localstorage on refresh or on closing the nav
    window.onbeforeunload = () => {
      console.log("Clearing local storage");
      localStorage.clear();
    }
  }
}



