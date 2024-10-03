import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.scss']
})
export class LoanReportComponent implements OnInit {

  memberId: string | null = null;
  currentPage = 1;
  rowsPerPage = 5;
  totalPages = 0;
  totalPagesArray: number[] = [];
  paginatedData: any[] = [];
  
  loans: any[] = []; // To store loan data
  filteredLoans: any[] = []; // This will hold the filtered loan data

  selectedMonth: string | null = null;
  selectedYear: number | null = null;

  months: string[] = [];
  years: number[] = [];

  constructor(private http: HttpClient) {
    this.memberId = localStorage.getItem("memberId");
  }

  ngOnInit(): void {
    this.loadMonths();
    this.loadYears();
    this.getLoan(); // Fetch loans when the component initializes
  }

  getLoan(): void {
    const apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/getLoanByMemberId'; // Your API URL
    if (this.memberId) {
      let params = new HttpParams().set('memberId', this.memberId);
      this.http.get(apiUrl, { params }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loans = response; // Store fetched loans
          this.filteredLoans = this.loans; // Initialize filteredLoans to all loans
          this.setupPagination(); // Setup pagination
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
    } else {
      console.error('Member ID is not found in local storage.');
    }
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



