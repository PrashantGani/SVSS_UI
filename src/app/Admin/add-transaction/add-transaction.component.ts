import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  transaction: any = {
    memberId: null,
    particular: '',
    amount: null, 
    date: ''
  };
  members: any[]=[];
  constructor(private http: HttpClient,private router: Router) {}
  // members = [  // Hardcoded list of members
  //   { memberId: 1, memberName: 'John Doe' },
  //   { memberId: 2, memberName: 'Jane Smith' },
  //   { memberId: 3, memberName: 'Alice Johnson' },
  //   { memberId: 4, memberName: 'Bob Brown' },
  // ];

  ngOnInit() {
    this.getMembers(); // Call the method to fetch members on component initialization
  }

  getMembers(): void {
    const apiUrl = 'https://svssapi-production.up.railway.app/api/v1/getAllMembers'; // Your API URL

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
  //   this.transaction.memberId = memberId; // Store the selected memberId
  // }

  private apiUrl = 'https://svssapi-production.up.railway.app/api/v1/addTransaction';
  addTransaction() {
    this.http.post<any>(this.apiUrl, this.transaction).subscribe(
      (response) => {
        console.log('Transaction added successfully:', response);
        this.router.navigateByUrl('/allTransactionReport');
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }
}
