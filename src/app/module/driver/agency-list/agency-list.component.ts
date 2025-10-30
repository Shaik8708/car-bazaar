import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.css',
})
export class AgencyListComponent {
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true },
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Username', field: 'username', sortable: true },
    { headerName: 'Email', field: 'email', sortable: true },
    { headerName: 'Phone', field: 'phone' },
  ];

  apiUrl = 'https://jsonplaceholder.typicode.com/users';
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];
  searchTerm = '';
  Math = Math;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAgencies();
  }

  fetchAgencies(): void {
    this.loading = true;

    this.http
      .get<any[]>(
        `${this.apiUrl}?_page=${this.pageNumber}&_limit=${this.pageSize}`
      )
      .subscribe({
        next: (res) => {
          this.totalRecords = 10; // JSONPlaceholder always returns 10 total
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );

          // Simulate search filtering by phone (since API doesn't support search)
          const filtered = this.searchTerm
            ? res.filter((d) =>
                d.phone?.toLowerCase().includes(this.searchTerm.toLowerCase())
              )
            : res;

          this.rowData = filtered;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load Agency data');
        },
      });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.fetchAgencies();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = +event.target.value;
    this.pageNumber = 1;
    this.fetchAgencies();
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.fetchAgencies();
  }

  onRowClicked(event: any): void {
    console.log('Selected Row:', event.data);
    alert(`You selected: ${event.data.name}`);
  }
}
