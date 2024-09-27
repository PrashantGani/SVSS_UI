// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-transaction-report',
//   templateUrl: './transaction-report.component.html',
//   styleUrls: ['./transaction-report.component.scss'],
// })
// export class TransactionReportComponent implements OnInit{
//   memberId: string | null = null; // Allow null

// constructor(private http: HttpClient){
//   this.memberId = localStorage.getItem("memberId"); 
// }

// ngOnInit(): void {
//   this.transactionReoprt()
// }

//   data: any[] = [];



// // memberId=localStorage.getItem("memberId");

// transactionReoprt() {
//   const apiUrl = 'http://localhost:8080/api/v1/getTransactionByMemberId'; // Replace with actual API URL

//   // Ensure memberId is not null before proceeding
//   if (this.memberId) {
//     // Create HttpParams to pass the fields as query parameters
//     let params = new HttpParams().set('memberId', this.memberId); // Use memberId

//     // Make the POST request with query parameters
//     this.http.get(apiUrl, { params }).subscribe({
//       next: (response: any) => {
//         console.log(response); // Handle response
//         this.data = response
//         console.log("Data in trans", this.data)
        
//       },
//       error: (err) => {
//         console.error('Error occurred:', err); // Handle error
//       }
//     });
//   } else {
//     console.error('Member ID is not found in local storage.'); // Handle null case
//   }
// }
// }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
})
export class TransactionReportComponent implements OnInit {
  memberId: string | null = null;
  data: any[] = [];
  paginatedData: any[] = [];
  
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private http: HttpClient) {
    this.memberId = localStorage.getItem("memberId");
  }

  ngOnInit(): void {
    this.transactionReoprt();
  }

  transactionReoprt() {
    const apiUrl = 'http://localhost:8080/api/v1/getTransactionByMemberId';

    if (this.memberId) {
      let params = new HttpParams().set('memberId', this.memberId);

      this.http.get(apiUrl, { params }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = response;
          this.setupPagination();
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
    } else {
      console.error('Member ID is not found in local storage.');
    }
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

