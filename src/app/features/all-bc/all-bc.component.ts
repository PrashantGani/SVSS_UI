import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-bc',
  templateUrl: './all-bc.component.html',
  styleUrls: ['./all-bc.component.scss']
})
export class AllBcComponent {

  members: any[] = []; // To store member data
  selectedMemberId: string | null = null;

  data: any[] = []; // To store transaction data
  paginatedData: any[] = [];
  
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.bcReoprt(); // Fetch all transactions initially
    this.getMembers(); 
  }
 
  // Fetch all transactions
  bcReoprt() {
    const apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/getBc';
    // const apiUrl = 'http://localhost:8080/api/v1/getBc';
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.data = response;
        this.setupPagination(); // Setup pagination for all transactions
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  // Fetch all members
  getMembers(): void {
    const apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/getAllMembers'; // Your API URL

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.members = data; // Bind API response to the members array
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  filterTransactions(): void {
    if (this.selectedMemberId !== "null") {
      console.log(this.selectedMemberId, "filter member id");
      this.getBCsByMember(this.selectedMemberId!);//this method will call only selectedMemberId is not null
      // this.getTransactionsByMember(this.selectedMemberId); // Call the API with the selected member ID
    } else {
      this.bcReoprt(); // Call to get all transactions if "All Members" is selected
    }
  }

  // API call to fetch transactions by member ID
  getBCsByMember(memberId: string): void {
    const apiUrl = `https://svssapi-production-5075.up.railway.app/api/v1/getBcByMemberId`; // Your API URL
    // const apiUrl ='http://localhost:8080/api/v1/getBcByMemberId'
    const params = new HttpParams().set('memberId', memberId); // Set the memberId as a query parameter

    this.http.get<any[]>(apiUrl, { params }).subscribe({
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

}
