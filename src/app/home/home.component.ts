import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: any[] = []; // Initialize an empty array to hold users
  TotalAmount = 0; // Property to hold the Invested Amount
  InvestedAmount = 0; // Property to hold the Total Loan Given
  TotalLoanGiven = 0; // Other properties remain the same
  InterestAmount = 0;

  // users: any[] = [];
  paginatedUsers: any[] = [];
  
  currentPage = 1;
  rowsPerPage = 10;  // Set to 10 rows per page
  totalPages = 0;
  totalPagesArray: number[] = [];

  // private apiUrl = 'http://localhost:8080/api/v1/getAllMembers'; // Replace with your actual API URL
  memberId: string | null = null; // Allow null
  constructor(private http: HttpClient,private authService: AuthService) {
    this.memberId = localStorage.getItem("memberId"); 
  } // Inject HttpClient

  ngOnInit(): void {
    this.fetchFinancialData(); 
    this.fetchUsers(); // Call the fetch function on component initialization
  }


  // Fetch Invested Amount and Total Loan Given
  private apiUrlTrnsaction = 'http://localhost:8080/api/v1/getTransactionByMemberId'; 
  fetchFinancialData(): void {
    if (this.memberId) {
      // Create HttpParams to pass the fields as query parameters
      console.log(this.memberId+"in Home Ts")
      let params = new HttpParams().set('memberId', this.memberId); // Use memberId
    
    this.http.get<any>(this.apiUrlTrnsaction,{params}).pipe(
      catchError(error => {
        console.error('Error fetching financial data:', error); // Handle error
        return of({ investedAmount: 1000, totalLoanGiven: 1000 }); // Return default values on error
      })
    ).subscribe((data) => {
    // Sum the "amount" field from all records
    console.log(data)
    const totalAmount = data.reduce((sum: any, record: { amount: any; }) => sum + record.amount, 0);

    // Assign the sum to TotalAmount and InvestedAmount
    this.TotalAmount = totalAmount;
    this.InvestedAmount = totalAmount; // If you need to assign the same value to both

    console.log('Total Amount:', this.TotalAmount);
    console.log('Invested Amount:', this.InvestedAmount);
  });
  }
  }



  // Method to fetch users directly from the backend
  private apiUrl = 'http://localhost:8080/api/v1/getAllMembers'; 
  fetchUsers(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching users:', error);
        return of([]);  // Return an empty array in case of an error
      })
    ).subscribe((data: any[]) => {
      this.users = data;
      this.setupPagination();
    });
  }

  // Set up pagination logic
  setupPagination() {
    this.totalPages = Math.ceil(this.users.length / this.rowsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateUsers();
  }

  // Paginate users for the current page
  paginateUsers() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  // Navigate to a specific page
  goToPage(page: number) {
    this.currentPage = page;
    this.paginateUsers();
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  // Go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }


  logout() {
    this.authService.logout(); // Call logout method from AuthService
  }
}
