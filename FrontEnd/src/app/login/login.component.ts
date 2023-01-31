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
export class LoginComponent implements OnInit {

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
    const formData = this.loginForm.value;
    this.authService.login(formData)
      .subscribe(data => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']); //takes us to main page
      },
        error => {
          this.error= error;
          console.error(error);
        }
      )

  }
}
