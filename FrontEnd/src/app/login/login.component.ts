import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

	onSubmit() {
 	   console.log("hola ");
    const formData = this.loginForm.value;
    this.authService.login(formData)
      .subscribe(data => {
        const accessToken = data.access_token;
        console.log("data ", data);
        console.log("token ", accessToken);
        localStorage.setItem('token', accessToken);
        this.userService.setLogged(true);
        this.router.navigate(['/view3']); //takes us to main page

      },
        error => {
          this.error= error;
          console.error(error);
        }
      )

  }

}
