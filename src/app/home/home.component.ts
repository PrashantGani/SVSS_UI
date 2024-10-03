import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChartConfiguration, ChartOptions } from 'chart.js';

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
  data: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;  // Set to 10 rows per page
  totalPages = 0;
  totalPagesArray: number[] = [];
  memberId: string | null = null; 

  public chartData: ChartConfiguration<'bar'>['data'] | undefined;
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, // Set to false so that you can define a custom min
        min: 0, // Start y-axis at 2500
        max: 10000, 
        ticks: {
          stepSize: 1000    // Increments in steps of 2500
        }
      }
    }
  };
  // private apiUrl = 'http://localhost:8080/api/v1/getAllMembers'; // Replace with your actual API URL
// Allow null
  constructor(private http: HttpClient,private authService: AuthService) {
    this.memberId = localStorage.getItem("memberId"); 
  } // Inject HttpClient

  ngOnInit(): void {
    this.fetchFinancialData(); 
    this.fetchUsers(); // Call the fetch function on component initialization
    // this.monthlySumAmount();
  }


  // Fetch Invested Amount and Total Loan Given
  private apiUrlTrnsaction = 'https://svssapi-production.up.railway.app/api/v1/getTransactionByMemberId'; 
  fetchFinancialData(): void {
    if (this.memberId) {
      // Create HttpParams to pass the fields as query parameters
      // console.log(this.memberId+"in Home Ts")
      let params = new HttpParams().set('memberId', this.memberId); // Use memberId
    
    this.http.get<any>(this.apiUrlTrnsaction,{params}).pipe(
      catchError(error => {
        console.error('Error fetching financial data:', error); // Handle error
        return of({ investedAmount: 1000, totalLoanGiven: 1000 }); // Return default values on error
      })
    ).subscribe((data) => {
    // Sum the "amount" field from all records
    // console.log(data)
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
  private apiUrl = 'https://svssapi-production.up.railway.app/api/v1/getAllMembers'; 
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


   // Function to calculate total amount collected per month
   calculateMonthlyTotal(transactions: any[]): { [monthYear: string]: number } {
    // console.log(transactions,"-calculateMonthlyTotal")
    return transactions.reduce((acc, transaction) => {
        // Extract the year and month from the date
        const date = new Date(transaction.date);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  
        // Initialize the month-year if not already present in the accumulator
        if (!acc[monthYear]) {
            acc[monthYear] = 0;
        }
  
        // Sum the amount for the corresponding month-year
        acc[monthYear] += transaction.amount;
  
        return acc;
    }, {});
  }
    // Fetch all transactions
    monthlySumAmount() {
      const apiUrl = 'https://svssapi-production.up.railway.app/api/v1/getTransaction';
  
      this.http.get(apiUrl).subscribe({
        next: (response: any) => {
          this.data = response;
          // console.log( "ALL TRASACTION DATA TO CHECK AMOUNT BASED ON MONTHS in home component",this.data)
          const monthlyTotals = this.calculateMonthlyTotal(this.data);
          // console.log("monthlyTotals==HOME COMPONENET==",monthlyTotals); // Output the result
          this.setupChartData(monthlyTotals);
          this.setupPagination(); // Setup pagination for all transactions
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
    }

    setupChartData(monthlyTotals: { [monthYear: string]: number }) {
      // console.log("monthlyTotals==HOME COMPONENET=setupChartData=",monthlyTotals);
      const labels = Object.keys(monthlyTotals);
      const data = Object.values(monthlyTotals);
  
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Collected Amount',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
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
