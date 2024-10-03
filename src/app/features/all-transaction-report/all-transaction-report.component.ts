import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-transaction-report',
  templateUrl: './all-transaction-report.component.html',
  styleUrls: ['./all-transaction-report.component.scss']
})
export class AllTransactionReportComponent {
  members: any[] = []; // To store member data
  selectedMemberId: string | null = null;

  data: any[] = []; // To store transaction data
  paginatedData: any[] = [];
  
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private http: HttpClient) {}


  private apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1';
  // private apiUrl = 'http://localhost:8080/api/v1';

  ngOnInit(): void {
    this.transactionReoprt(); // Fetch all transactions initially
    this.getMembers(); // Fetch all members
    // const monthlyTotals = calculateMonthlyTotal(this.data);
    // console.log("monthlyTotals====",monthlyTotals); // Output the result
  }
   // Function to calculate total amount collected per month
//  calculateMonthlyTotal(transactions: any[]): { [monthYear: string]: number } {
//   console.log(transactions,"-calculateMonthlyTotal")
//   return transactions.reduce((acc, transaction) => {
//       // Extract the year and month from the date
//       const date = new Date(transaction.date);
//       const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

//       // Initialize the month-year if not already present in the accumulator
//       if (!acc[monthYear]) {
//           acc[monthYear] = 0;
//       }

//       // Sum the amount for the corresponding month-year
//       acc[monthYear] += transaction.amount;

//       return acc;
//   }, {});
// }
  // Fetch all transactions
  transactionReoprt() {
    // const apiUrl = 'https://svssapi-production.up.railway.app/api/v1/getTransaction';

    this.http.get(this.apiUrl+"/getTransaction").subscribe({
      next: (response: any) => {
        this.data = response;
        console.log( "ALL TRASACTION DATA TO CHECK AMOUNT BASED ON MONTHS",this.data)
        // const monthlyTotals = this.calculateMonthlyTotal(this.data);
        // console.log("monthlyTotals====",monthlyTotals); // Output the result
        this.setupPagination(); // Setup pagination for all transactions
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  // Fetch all members
  getMembers(): void {
    // const apiUrl = 'https://svssapi-production.up.railway.app/api/v1/getAllMembers'; // Your API URL

    this.http.get<any[]>(this.apiUrl+"/getAllMembers").subscribe({
      next: (data) => {
        this.members = data; // Bind API response to the members array
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  // Handle member selection change
  // onMemberSelect(memberId: string): void {
  //   console.log('Selected memberId:', memberId); // Debugging: log selected memberId
  //   if (memberId !== "null" ) {
  //     console.log(memberId, "filter member id");
  //     this.getTransactionsByMember(memberId); // Call the API with the selected member ID
  //   } else {
  //     this.transactionReoprt(); // Call to get all transactions if "All Members" is selected
  //   }
  // }
  filterTransactions(): void {
    if (this.selectedMemberId !== "null") {
      console.log(this.selectedMemberId, "filter member id");
      this.getTransactionsByMember(this.selectedMemberId!);//this method will call only selectedMemberId is not null
      // this.getTransactionsByMember(this.selectedMemberId); // Call the API with the selected member ID
    } else {
      this.transactionReoprt(); // Call to get all transactions if "All Members" is selected
    }
  }

  // API call to fetch transactions by member ID
  getTransactionsByMember(memberId: string): void {
    // const apiUrl = `https://svssapi-production.up.railway.app/api/v1/getTransactionByMemberId`; // Your API URL

    const params = new HttpParams().set('memberId', memberId); // Set the memberId as a query parameter

    this.http.get<any[]>(this.apiUrl+"/getTransactionByMemberId", { params }).subscribe({
      next: (response) => {
        this.data = response; // Update data with the response
        this.setupPagination(); // Set up pagination for the new data
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  // Set up pagination logic
  setupPagination() {
    this.totalPages = Math.ceil(this.data.length / this.rowsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateData();
  }

  // Paginate data for the current page
  paginateData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  // Navigate to a specific page
  goToPage(page: number) {
    this.currentPage = page;
    this.paginateData();
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  // Go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

 
// Example usage
// const monthlyTotals = calculateMonthlyTotal(this.data);
// console.log(monthlyTotals);

}
