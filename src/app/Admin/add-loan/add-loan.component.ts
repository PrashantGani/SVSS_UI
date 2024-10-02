import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent {
  loan: any = {
    memberId: null,
    particular: '',
    amount: null, 
    date: ''
  };

  members: any[]=[];
  constructor(private http: HttpClient,private router: Router) {}


  ngOnInit() {
    this.getMembers(); // Call the method to fetch members on component initialization
  }

  getMembers(): void {
    const apiUrl = 'http://localhost:8080/api/v1/getAllMembers'; // Your API URL

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.members = data; // Bind API response to the members array
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }
  // Function to handle member selection
  // onMemberSelect(memberId: number) {
  //   this.loan.memberId = memberId; // Store the selected memberId
  // }

  private apiUrl = 'http://localhost:8080/api/v1/addLoan';
  addTransaction() {
    this.http.post<any>(this.apiUrl, this.loan).subscribe(
      (response) => {
        console.log('Loan added successfully:', response);
        this.router.navigateByUrl('/allAllLoanReport');
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }
}
