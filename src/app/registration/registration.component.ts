import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Biology' }
  ];

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,  private toastrService: ToastrService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      profileImage: [null],
    });
  }

  onContactNumberInput(event: any): void {
    // Replace non-digit characters with an empty string
    const input = event.target;
    input.value = input.value.replace(/\D/g, '');
  }

  
  onRegister() {
    if (this.registrationForm.valid) {
      // Extract registration data
      const registrationData = {
        name: this.registrationForm.get('name')?.value || '',
        username: this.registrationForm.get('username')?.value || '',
        email: this.registrationForm.get('email')?.value || '',
        contactNumber: this.registrationForm.get('contactNumber')?.value || '',
        department: this.registrationForm.get('department')?.value || '',
        password: this.registrationForm.get('password')?.value || '',
        role: 'staff' 
      };
  
      // Call registration API
      this.registrationService.register(registrationData)
        .subscribe({
          next: (response) => {
            this.toastrService.success("Registration successful", 'Success!');
            // console.log('Registration successful', response);
            this.router.navigate(['dashboard']);
            // Handle successful registration, e.g., redirect or clear form
          },
          error: (error) => {
            // console.log("error: ",error);
            this.toastrService.error(error, "Failure!");
            console.error('Registration failed', error);
            // Handle registration error
          }
        });
    } else {
      this.toastrService.error("Form is not valid", "Error!");
      // console.log('Form is not valid:', this.registrationForm.errors);
    }
  }
  
}
