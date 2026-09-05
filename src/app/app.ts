import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

import { LeadService } from './leadservice';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  rowData: any[] = [];

  currentPage = 0;
  pageSize = 100;
  totalRecords = 0;

  columnDefs: ColDef[] = [
    {field:'id'},
    { field: 'branchCode' },
    { field: 'chanelType' },
    { field: 'cityCode' },
    { field: 'conversationId' },
    { field: 'createdAt' },
    { field: 'customeId' },
    { field: 'email' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'mobileNumber' },
    { field: 'pincode' },
    { field: 'productCode' },
    { field: 'productName' },
  ];

  constructor(
    private leadService: LeadService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.leadService.getLeads(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        this.rowData = [...response.data.content];

        this.totalRecords = response.data.totalElements;

        console.log('Current Page:', this.currentPage);
        console.log('Total Records:', this.totalRecords);
        console.log('Grid Data Count:', this.rowData.length);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log('API Error:', error);
      },
    });
  }
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.loadLeads();
  }
}
