import { Component, OnInit, TemplateRef } from '@angular/core';
import { HODService } from 'src/app/services/HOD/hod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import for Bootstrap modals
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import FormBuilder, FormGroup, Validators
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit {

  users: any[] = [];
  searchTerm: string = '';  // Search term for filtering users
  selectedUser: any = null;  // To hold the selected user for view or delete
  department = JSON.parse(localStorage.getItem('user')!).department;
  page: number = 1;  // Current page number for pagination


  createStaffForm!: FormGroup;  // Form group for creating staff
  isSubmitted = false;  // Track if the form has been submitted

  constructor(private hodService: HODService, private modalService: NgbModal, private formBuilder: FormBuilder, private toastrService: ToastrService ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.initializeForm();
    this.createStaffForm.get('department')?.disable();

  }

  

  // Initialize the form
 initializeForm() {
  this.createStaffForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', Validators.required],
    role:"staff",
    department: this.department
  });
}

  // Getter for easy access to form controls
  get formControls() {
    return this.createStaffForm.controls;
  }

// Open Create Staff Modal
openCreateStaffModal(createStaffModal: TemplateRef<any>) {
  this.isSubmitted = false;  // Reset form submission state
  this.modalService.open(createStaffModal);
}



// Handle form submission for creating staff
onSubmitCreateStaff() {
  this.isSubmitted = true;

  if (this.createStaffForm.invalid) {
    this.toastrService.error("Data is invalid!", 'Error!');              
    return;
  }
  this.toastrService.success("A new staff is added!", 'Success!');              

  const newUser = this.createStaffForm.value;

  // Add new user to the list (and ideally save it to the backend or mock API)
  this.hodService.addUser(newUser).subscribe(() => {
    this.users.push(newUser);
    this.modalService.dismissAll();  // Close the modal
  }, error => {
    console.error('Error adding user', error);
  });
}

  loadUsers() {
    
    // Retrieve the department from local storage
    const storedUser = localStorage.getItem('user');  // Assuming you stored the user object under the key 'user'
    if (storedUser !== null) {
      const user = JSON.parse(storedUser);  // Parse the JSON string to an object
      // console.log("users:   ", this.users);
      this.department = user.department;    // Extract the department from the parsed object
    } else {
      console.error('No user data found in local storage');
    }
    
    if (this.department) {
      // Fetch all users (this assumes your hodService fetches all users)
      this.hodService.getUsers().subscribe((data: any[]) => {
        // Filter users by the department retrieved from local storage
        this.users = data.filter(user => user.department === this.department && user.role === 'staff');
      }, error => {
        console.error('Error fetching users', error);
      });
    } else {
      console.error('No department found in local storage');
    }
  }

    // Open View Modal with the passed template reference
    openViewModal(viewModal: TemplateRef<any>, user: any) {
      this.selectedUser = user;
      this.modalService.open(viewModal);
    }
  
    // Open Delete Modal with the passed template reference
    openDeleteModal(deleteModal: TemplateRef<any>, user: any) {
      this.selectedUser = user;
      this.modalService.open(deleteModal);
    }
  
  // Method to delete the selected user
  deleteUser() {
    if (this.selectedUser) {
      this.hodService.deleteUser(this.selectedUser.id).subscribe(() => {
        // Remove the user from the UI after deletion
        this.users = this.users.filter(user => user.id !== this.selectedUser.id);
        this.modalService.dismissAll();  // Close the modal
      }, error => {
        console.error('Error deleting user', error);
      });
    }
  }

  filteredUsers() {
    if (!this.searchTerm) {
      return this.users;
    }

    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.contactNumber.includes(this.searchTerm)
    );
  }
}
