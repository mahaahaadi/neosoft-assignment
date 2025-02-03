import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HODService {

  private apiUrl = `${environment.apiUrl}/users`;  // Correctly point to the API
  private apiUrl_bare = `${environment.apiUrl}`;  

  constructor(private http: HttpClient) {}

// Accepts the HOD's department as a parameter
getStaffCount(department: string): Observable<number> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(users => {
      // Filter users where the role is 'staff' and the department matches the HOD's department
      const staffInDepartment = users.filter(user => 
        user.role === 'staff' && 
        user.department?.trim().toLowerCase() === department.trim().toLowerCase()
      );
      // console.log("Filtered Staff in Department: ", staffInDepartment);
      return staffInDepartment.length;  // Return the count of filtered staff
    })
  );
}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete a user by ID
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Add a new user
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getLeavesByDepartment(department: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl_bare}/leaves`).pipe(
      map(leaves => {
        // Filter leaves by department
        const departmentLeaves = leaves.filter(leave => 
          leave.department?.trim().toLowerCase() === department.trim().toLowerCase()
        );
        // console.log("Filtered Leaves in Department: ", departmentLeaves);
        return departmentLeaves;
      })
    );
  }

   // Update the leave status
   updateLeaveStatus(leaveId: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl_bare}/leaves/${leaveId}`, { status });
  }
  
}
