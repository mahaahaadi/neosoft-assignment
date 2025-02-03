import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private toastrService: ToastrService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('staff', [Validators.required]),
    password: new FormControl('123456fd7890', [Validators.required, Validators.minLength(8)])
  });


  onSubmit() {
    if (this.loginForm.valid) {
      // Explicitly cast to string or provide a fallback value
      const username: string = this.loginForm.get('username')?.value || '';
      const password: string = this.loginForm.get('password')?.value || '';
  
      // Now username and password are guaranteed to be strings
      this.loginService.login({ username, password })
        .subscribe({
          next: (response) => {
            if(response){
              this.toastrService.success("Login successful", 'Success!');              

              const role = localStorage.getItem('role'); //staff or HOD
              if (role === 'HOD') {
                this.router.navigate(['/dashboard']);  // Redirect HOD to dashboard
              } else if (role === 'staff') {
                this.router.navigate(['/staff-dashboard']);  // Redirect staff to staff dashboard
              }

            } else this.toastrService.error("Login Failed","Failure!");

            // console.log('Login successful', response);
            // Handle successful login
          },
          // error: (error) => {
            // this.toastrService.error("Login Failed","Failure!");
            // console.error('Login failed', error);
            // Handle login error
          // }
        });
    } else {
      // console.log('Form is not valid');
    }
  }
  
  

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
}
