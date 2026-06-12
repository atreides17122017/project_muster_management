import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css'],
})
export class TablePageComponent implements OnInit {
  title: string = '';
  searchText: string = '';
  isDashboard: boolean = true;

  columns: any[] = [];
  data: any[] = [];

  // 🔥 MODAL STATES
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedItem: any = null;
  newItem: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const name = params['id'];

      if (!name) {
        this.isDashboard = true;
        return;
      }

      this.isDashboard = false;
      this.title = name;

      // 🔥 CONFIG MAP
      const config: any = {

        Employee: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'pf_number', label: 'PF Number' },
            { key: 'name', label: 'Name' },
            { key: 'mobile', label: 'Mobile' },
            { key: 'station', label: 'Station' },
            { key: 'department', label: 'Department' },
            { key: 'designation', label: 'Designation' },
            { key: 'bill_unit', label: 'Bill Unit' },
            { key: 'manual_serial_number', label: 'Manual Serial No' },
          ],
          data: [
            {
              id: 1,
              pf_number: 'PF001',
              name: 'Ravi',
              mobile: '9999999999',
              station: 'MAS',
              department: 'Ops',
              designation: 'Clerk',
              bill_unit: 'BU1',
              manual_serial_number: 'MS1',
            },
          ],
        },

        'Bill Unit': {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'bill_unit_code', label: 'Code' },
            { key: 'department', label: 'Department' },
            { key: 'station', label: 'Station' },
            { key: 'supervisor_id', label: 'Supervisor' },
          ],
          data: [
            {
              id: 1,
              bill_unit_code: 'BU001',
              department: 'Ops',
              station: 'MAS',
              supervisor_id: 'SUP1',
            },
          ],
        },

        Stations: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'station_code', label: 'Code' },
            { key: 'station_name', label: 'Name' },
            { key: 'station_category', label: 'Category' },
          ],
          data: [
            {
              id: 1,
              station_code: 'MAS',
              station_name: 'Chennai',
              station_category: 'A1',
            },
          ],
        },

        Department: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'department_name', label: 'Department Name' },
          ],
          data: [{ id: 1, department_name: 'Operations' }],
        },

        'Input Options': {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'option_code', label: 'Code' },
            { key: 'option_name', label: 'Name' },
          ],
          data: [{ id: 1, option_code: 'OPT1', option_name: 'Yes' }],
        },

        // 🔥 NEW SUPERVISOR MODULE
        Supervisor: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Supervisor Name' },
            { key: 'username', label: 'Supervisor User Name' },
            { key: 'password', label: 'Password', type: 'password' },
            { key: 'mobile', label: 'Mobile Number' },
            { key: 'department', label: 'Supervisor Department' },
            { key: 'depot', label: 'Supervisor Depot' },
            { key: 'station', label: 'Supervisor Station' },
            {
              key: 'role',
              label: 'Roles',
              type: 'dropdown',
              options: ['Bill Dealer', 'Muster Supervisor'],
            },
          ],
          data: [
            {
              id: 1,
              name: 'Suresh',
              username: 'suresh123',
              password: '1234',
              mobile: '9999999999',
              department: 'Ops',
              depot: 'D1',
              station: 'MAS',
              role: 'Bill Dealer',
            },
          ],
        },
      };

      // ✅ APPLY CONFIG
      this.columns = config[name]?.columns || [];
      this.data = config[name]?.data || [];
    });
  }

  // 🔥 ADD
  addItem() {
    this.newItem = {};

    this.columns.forEach((col) => {
      if (col.key !== 'id') {
        this.newItem[col.key] = '';
      }
    });

    this.showAddModal = true;
  }

  saveNewItem() {
    this.newItem.id = this.data.length
      ? Math.max(...this.data.map((d) => d.id)) + 1
      : 1;

    this.data.push({ ...this.newItem });
    this.showAddModal = false;
  }

  // 🔥 EDIT
  edit(item: any) {
    this.selectedItem = { ...item };
    this.showEditModal = true;
  }

  updateItem() {
    const index = this.data.findIndex((d) => d.id === this.selectedItem.id);

    if (index !== -1) {
      this.data[index] = { ...this.selectedItem };
    }

    this.showEditModal = false;
  }

  // 🔥 DELETE
  delete(item: any) {
    this.selectedItem = item;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.data = this.data.filter((d) => d.id !== this.selectedItem.id);
    this.showDeleteModal = false;
  }

  // 🔴 CLOSE
  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}