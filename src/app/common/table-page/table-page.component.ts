import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  title: string = '';
  searchText: string = '';
  isDashboard: boolean = true;

  columns: any[] = [];
  data: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];

      // ✅ DASHBOARD
      if (!name) {
        this.isDashboard = true;
        this.title = 'Dashboard';
        this.columns = [];
        this.data = [];
        return;
      }

      this.isDashboard = false;
      this.title = name;

      // ✅ EMPLOYEE
      if (name === 'Employee') {
        this.columns = [
          { key: 'id', label: 'ID' },
          { key: 'pf_number', label: 'PF Number' },
          { key: 'name', label: 'Name' },
          { key: 'mobile', label: 'Mobile' },
          { key: 'station', label: 'Station' },
          { key: 'department', label: 'Department' },
          { key: 'designation', label: 'Designation' },
          { key: 'bill_unit', label: 'Bill Unit' },
          { key: 'manual_serial_number', label: 'Manual Serial No' }
        ];

        this.data = [
          { id: 1, pf_number: 'PF001', name: 'Ravi', mobile: '9999999999', station: 'MAS', department: 'Ops', designation: 'Clerk', bill_unit: 'BU1', manual_serial_number: 'MS1' },
          { id: 2, pf_number: 'PF002', name: 'Arun', mobile: '8888888888', station: 'SBC', department: 'HR', designation: 'Manager', bill_unit: 'BU2', manual_serial_number: 'MS2' },
          { id: 3, pf_number: 'PF003', name: 'Kiran', mobile: '7777777777', station: 'HYB', department: 'Tech', designation: 'Engineer', bill_unit: 'BU3', manual_serial_number: 'MS3' }
        ];
      }

      // ✅ BILL UNIT
      else if (name === 'Bill Unit') {
        this.columns = [
          { key: 'id', label: 'ID' },
          { key: 'bill_unit_code', label: 'Bill Unit Code' },
          { key: 'department', label: 'Department' },
          { key: 'station', label: 'Station' },
          { key: 'supervisor_id', label: 'Supervisor ID' }
        ];

        this.data = [
          { id: 1, bill_unit_code: 'BU001', department: 'Ops', station: 'MAS', supervisor_id: 'SUP1' },
          { id: 2, bill_unit_code: 'BU002', department: 'HR', station: 'SBC', supervisor_id: 'SUP2' },
          { id: 3, bill_unit_code: 'BU003', department: 'Tech', station: 'HYB', supervisor_id: 'SUP3' }
        ];
      }

      // ✅ STATIONS
      else if (name === 'Stations') {
        this.columns = [
          { key: 'id', label: 'ID' },
          { key: 'station_code', label: 'Station Code' },
          { key: 'station_name', label: 'Station Name' },
          { key: 'station_category', label: 'Category' }
        ];

        this.data = [
          { id: 1, station_code: 'MAS', station_name: 'Chennai Central', station_category: 'A1' },
          { id: 2, station_code: 'SBC', station_name: 'Bangalore City', station_category: 'A1' },
          { id: 3, station_code: 'HYB', station_name: 'Hyderabad', station_category: 'A' }
        ];
      }

      // ✅ DEPARTMENTS
      else if (name === 'Department') {
        this.columns = [
          { key: 'id', label: 'ID' },
          { key: 'department_name', label: 'Department Name' }
        ];

        this.data = [
          { id: 1, department_name: 'Operations' },
          { id: 2, department_name: 'Human Resources' },
          { id: 3, department_name: 'Technical' }
        ];
      }

      // ✅ INPUT OPTIONS
      else if (name === 'Input Options') {
        this.columns = [
          { key: 'id', label: 'ID' },
          { key: 'option_code', label: 'Option Code' },
          { key: 'option_name', label: 'Option Name' }
        ];

        this.data = [
          { id: 1, option_code: 'OPT1', option_name: 'Yes' },
          { id: 2, option_code: 'OPT2', option_name: 'No' },
          { id: 3, option_code: 'OPT3', option_name: 'N/A' }
        ];
      }

    });
  }

  addItem() {
    alert('Add clicked');
  }

  edit(item: any) {
    alert('Edit: ' + JSON.stringify(item));
  }

  delete(item: any) {
    alert('Delete: ' + JSON.stringify(item));
  }
}