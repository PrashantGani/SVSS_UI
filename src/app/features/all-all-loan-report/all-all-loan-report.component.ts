import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-all-loan-report',
  templateUrl: './all-all-loan-report.component.html',
  styleUrls: ['./all-all-loan-report.component.scss']
})
export class AllAllLoanReportComponent {

 
  memberId: string | null = null;
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 0;
  totalPagesArray: number[] = [];
  paginatedData: any[] = [];
  
  loans: any[] = []; // To store loan data
  filteredLoans: any[] = []; // This will hold the filtered loan data

  selectedMonth: string | null = null;
  selectedYear: number | null = null;

  months: string[] = [];
  years: number[] = [];
  members: any[]=[];
  selectedMemberId: string | null = null;

  constructor(private http: HttpClient) {
    this.memberId = localStorage.getItem("memberId");
  }

  ngOnInit(): void {
    this.loadMonths();
    this.loadYears();
    this.getAllLoan(); // Fetch loans when the component initializes
    this.getMembers();
  }

  getAllLoan(): void {
    const apiUrl = 'http://localhost:8080/api/v1/getLoan'; // Your API URL

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log(data)
        this.loans = data; // Bind API response to the members array
        this.filteredLoans = this.loans; // Initialize filteredLoans to all loans
        this.setupPagination();
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
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

  // Method that gets triggered when a member is selected
  onMemberSelect(memberId: string | null): void {
    console.log("IN ALL LOAN COMPONENT: ",memberId)
    if (memberId) {
      this.getLoansByMember(memberId);
    } else {
      // Handle case for "All Members" if needed
      console.log("All Members selected");
      this.loans = [];
    }
  }

  // Function to make API call to fetch loans by memberId
  getLoansByMember(memberId: string): void {
    const apiUrl = 'http://localhost:8080/api/v1/getLoanByMemberId'; // Your API URL

    let params = new HttpParams().set('memberId', memberId);

    this.http.get(apiUrl, { params }).subscribe({
      next: (response: any) => {
        console.log('Loans for member:', response);
        this.loans = response; // Store the loans for the selected member
        this.filteredLoans = this.loans; // Update filtered loans if needed
      },
      error: (err) => {
        console.error('Error fetching loans for member:', err);
      }
    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.filteredLoans.length / this.rowsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateData();
  }

  paginateData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = this.filteredLoans.slice(start, end); // Paginate based on filtered loans
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateData();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  loadMonths(): void {
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  loadYears(): void {
    const startYear = 2023;
    const endYear = 2033;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan => {
      const loanDate = new Date(loan.date); // Parse loan date
  
      // Get the index of the selected month (1-based)
      const selectedMonthIndex = this.months.indexOf(this.selectedMonth || '') + 1;
  
      // Check if the month and year conditions match
      const isMonthMatch = (this.selectedMonth === null) || (loanDate.getMonth() + 1 === selectedMonthIndex);
      const isYearMatch = (this.selectedYear === null) || (loanDate.getFullYear() === Number(this.selectedYear));
  
      // Log for debugging
      console.log("isMonthMatch:", isMonthMatch, "| isYearMatch:", isYearMatch);
      
      // Return true if either is true, this will handle "All Months" and "All Years" cases
      return isMonthMatch && isYearMatch;
    });
  
    this.setupPagination(); // Setup pagination after filtering
  }
  
}
