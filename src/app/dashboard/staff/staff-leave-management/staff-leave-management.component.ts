import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/Staff/leave.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-leave-management',
  templateUrl: './staff-leave-management.component.html',
  styleUrls: ['./staff-leave-management.component.scss']
})
export class StaffLeaveManagementComponent implements OnInit {

  applyLeaveForm!: FormGroup;  // Use non-null assertion to assure TypeScript that it will be initialized later
  minToDate!: string;  // Variable to store the minimum To Date
  page: number = 1;
  leaves: any[] = [];
  searchTerm: string = '';
  selectedLeave: any = null;
  leaveStatusOptions: string[] = ['Pending', 'Approved', 'Rejected'];

  
  constructor( private fb: FormBuilder,
    private leaveService: LeaveService,  // Assuming you have a service to handle leave applications
    private modalService: NgbModal, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.applyLeaveForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', [Validators.required, this.toDateValidator.bind(this)]],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
    const userId = localStorage.getItem('userId');  // Retrieve logged-in userId from local storage
    if (userId) {
      this.leaveService.getLeavesByUserId(userId).subscribe((data: any[]) => {
        this.leaves = data;  // Store leaves for the logged-in user
      }, error => {
        console.error('Error fetching leaves:', error);
      });
    }
  }

    // Function to open the apply leave modal
    openApplyLeaveModal(content: any) {
      this.modalService.open(content, { centered: true });
    }

      // Function to handle changes to From Date and set minimum To Date
      onFromDateChange() {
        const fromDate = this.applyLeaveForm.get('fromDate')?.value;
        if (fromDate) {
          const fromDateObj = new Date(fromDate);
          fromDateObj.setDate(fromDateObj.getDate() + 1);  // Increment the date by 1 day
          this.minToDate = fromDateObj.toISOString().split('T')[0];  // Set minimum to the next day
        }
      }

      // Custom validation function to ensure To Date is greater than From Date
      toDateValidator(control: any): { [key: string]: boolean } | null {
        const fromDate = this.applyLeaveForm?.get('fromDate')?.value;
        const toDate = control.value;

        if (fromDate && toDate && new Date(toDate) <= new Date(fromDate)) {
          return { invalidToDate: true }; // Error if toDate is not greater than fromDate
        }
        return null;  // Return null if validation passes
      }

  

      // Function to handle form submission
  onSubmitLeaveApplication(modal: any) {
    if (this.applyLeaveForm.valid) {
      const leaveApplication = {
        userId: localStorage.getItem('userId'),  // Assuming you're storing the user ID in localStorage
        fromDate: this.applyLeaveForm.get('fromDate')?.value,
        toDate: this.applyLeaveForm.get('toDate')?.value,
        reason: this.applyLeaveForm.get('reason')?.value,
        status: 'Pending',  // Leave status is "Pending" by default
        department: JSON.parse(localStorage.getItem('user') || '{}').department  // Assuming department is stored in user object
      };

      // Call the API to submit the leave application
      this.leaveService.applyLeave(leaveApplication).subscribe({
        next: (response) => {
          this.toastrService.success("Your leave application has been successfully submitted!", 'Success!');              
          console.log('Leave applied successfully:', response);
          modal.dismiss();  // Close the modal on success
        },
        error: (error) => {
          console.error('Error applying leave:', error);
          this.toastrService.error('There was an error submitting your leave application. Please try again later.', 'Error');  // Error toast

        }
      });
    }
  }

  // Filter leaves based on search term
  filteredLeaves() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      return this.leaves.filter(leave => 
        leave.reason.toLowerCase().includes(term) ||
        leave.status.toLowerCase().includes(term)
      );
    } else {
      return this.leaves;
    }
  }

  // Open the view modal
  openViewModal(viewModal: any, leave: any) {
    this.selectedLeave = leave;
  }
}
