import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface ApiResponse {
  leaves: any[];  // Define the structure of the response if you know it
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = `${environment.apiUrl}/leaves`;  // Adjust the API URL if necessary

  constructor(private http: HttpClient) {}

  // Get leaves for the specific user by userId
  getLeavesByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => {
        if (response && response.length) {
          return response.filter(leave => leave.userId === userId);  // Compare userId as a string
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching leaves:', error);
        return of([]);  // Return an empty array in case of error
      })
    );
  }

   // Method to apply for a leave
   applyLeave(leaveData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, leaveData);  // Post request to submit the leave application
  }
}
