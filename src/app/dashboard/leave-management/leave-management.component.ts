import { Component, OnInit, TemplateRef } from '@angular/core';
import { HODService } from 'src/app/services/HOD/hod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbModal
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

  leaves: any[] = [];
  department = JSON.parse(localStorage.getItem('user')!).department;
  searchTerm: string = '';  // Add this to store the search term
  selectedLeave: any = null;  // Add this to store the selected leave
  leaveStatusOptions = ['Pending', 'Approved', 'Rejected'];  // Possible leave statuses
  page: number = 1;  // Current page number for pagination

  constructor(private hodService: HODService, private modalService: NgbModal, private toastrService: ToastrService) {}

  ngOnInit(): void {

    if (this.department) {
      this.loadLeavesByDepartment(this.department);
    }
  }

  // Fetch leaves by HOD's department
  loadLeavesByDepartment(department: string) {
    this.hodService.getLeavesByDepartment(department).subscribe(
      (data: any[]) => {
        this.leaves = data;  // Assign the filtered leaves to your component's array
      },
      error => {
        console.error('Error fetching leaves: ', error);
      }
    );
  }

  // Open view modal and set the selected leave
  openViewModal(viewModal: TemplateRef<any>, leave: any) {
    this.selectedLeave = leave;  // Set the selected leave
    this.modalService.open(viewModal);  // Open the modal using NgbModal
  }

 // Define filteredLeaves method for searching/filtering
 filteredLeaves() {
  return this.leaves.filter(leave => {
    const term = this.searchTerm.toLowerCase();
    return (
      (leave.reason && leave.reason.toLowerCase().includes(term)) || 
      (leave.status && leave.status.toLowerCase().includes(term))
    );
  });
}

  // Method to save status changes
  saveLeaveStatus() {
    if (this.selectedLeave) {
      this.hodService.updateLeaveStatus(this.selectedLeave.id, this.selectedLeave.status).subscribe(
        response => {
          // Update the status in the local array
          const index = this.leaves.findIndex(leave => leave.id === this.selectedLeave.id);
          if (index > -1) {
            this.leaves[index].status = this.selectedLeave.status;
          }
          this.modalService.dismissAll();  // Close the modal
          this.toastrService.success("Status updated", 'Success!');              
        },
        error => {
          this.toastrService.success("Status is not changed", 'Failure!');
          console.error('Error updating leave status:', error);
        }
      );
    }
  }

    // Save leave status directly from the table
    saveLeaveStatusInTable(leave: any) {
      this.hodService.updateLeaveStatus(leave.id, leave.status).subscribe(
        response => {
          // console.log('Leave status updated:', leave.status);
          this.toastrService.success("Status updated", 'Success!');              
        },
        error => {
          this.toastrService.success("Status is not changed", 'Failure!');
          console.error('Error updating leave status:', error);
        }
      );
    }
  
}
