import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bc',
  templateUrl: './add-bc.component.html',
  styleUrls: ['./add-bc.component.scss']
})
export class AddBcComponent {

  bc: any = {
    memberId: null,
    date: '',
    particular: '',
    bidAmount: null,
    basicAmount: null,
    status: '',
    remarks: ''
  };

  members: any[]=[];
  constructor(private http: HttpClient,private router: Router) {}

  

  ngOnInit() {
    this.getMembers(); // Call the method to fetch members on component initialization
  }

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
  // Function to handle member selection
  // onMemberSelect(memberId: number) {
  //   this.loan.memberId = memberId; // Store the selected memberId
  // }

  private apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/addBc';
  // private apiUrl = '  http://localhost:8080/api/v1/addBc';
  addBc() {
    console.log(this.bc)
    this.http.post<any>(this.apiUrl, this.bc).subscribe(
      (response) => {
        console.log(' Bc Added successfully:', response);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }

}
