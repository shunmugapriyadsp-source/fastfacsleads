import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry
} from 'ag-grid-community';

import { LeadService } from './leadservice';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  rowData: any[] = [];

  columnDefs: ColDef[] = [
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
    { field: 'productName' }
  ];

  constructor(
    private leadService: LeadService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.leadService.getLeads(0,100).subscribe({

      next: (response: any) => {

        console.log('API Response:', response);

        this.rowData = [...response.data.content];

        console.log('Grid Data:', this.rowData);
        console.log('Grid Data Count:', this.rowData.length);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('API Error:', error);

      }

    });

  }

}