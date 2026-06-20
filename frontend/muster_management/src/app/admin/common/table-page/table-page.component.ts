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
  currentViewMode: 'list' | 'add' | 'edit' = 'list';

  columns: any[] = [];
  data: any[] = [];
  scrollingText: string = '';

  showDeletePromptModal: boolean = false;
  selectedItem: any = null;
  newItem: any = {};
  itemPendingDeletion: any = null;

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
      this.currentViewMode = 'list';

      const config: any = {
        Employee: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'pf_number', label: 'PF Number' },
            { key: 'employee_name', label: 'Name' },
            { key: 'mobile_number', label: 'Mobile' },
            { key: 'employee_station', label: 'Station' },
            { key: 'employee_department', label: 'Department' },
            { key: 'employee_designation', label: 'Designation' },
            { key: 'employee_bill_unit', label: 'Bill Unit' },
            { key: 'employee_manual_serial_number', label: 'Manual Serial No' }
          ],
          data: [
            { id: 1, pf_number: '24409692289', employee_name: 'G KRANTHIKUMAR', mobile_number: '9603494214', employee_station: 'BZA', employee_department: 'MECHANICAL', employee_designation: 'SR TECH/CNW', employee_bill_unit: '3703449', employee_manual_serial_number: '101' },
            { id: 2, pf_number: '24408656204', employee_name: 'B.SUBBARAO', mobile_number: '7075085018', employee_station: 'BZA', employee_department: 'MECHANICAL', employee_designation: 'SR TECH/CNW', employee_bill_unit: '3703415', employee_manual_serial_number: '102' }
          ]
        },
        'Bill Unit': {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'bill_unit_code', label: 'Code' },
            { key: 'department', label: 'Department' },
            { key: 'station', label: 'Station' },
          ],
          data: [
            { id: 1, bill_unit_code: 'BU-01', department: 'MECHANICAL', station: 'BZA' },
            { id: 2, bill_unit_code: 'BU-02', department: 'OPERATIONS', station: 'MAS' }
          ]
        },
        Stations: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'station_code', label: 'Code' },
            { key: 'station_name', label: 'Name' },
            { key: 'station_category', label: 'Category' }
          ],
          data: [
            { id: 1, station_code: 'BZA', station_name: 'VIJAYAWADA', station_category: 'NSG-1' },
            { id: 2, station_code: 'MAS', station_name: 'CHENNAI CENTRAL', station_category: 'NSG-1' }
          ]
        },
        Department: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'department_name', label: 'Department Name' }
          ],
          data: [
            { id: 1, department_name: 'MECHANICAL' },
            { id: 2, department_name: 'OPERATIONS' },
            { id: 3, department_name: 'PERSONNEL' }
          ]
        },
        'Input Options': {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'option_code', label: 'Code' },
            { key: 'option_name', label: 'Name' }
          ],
          data: [
            { id: 1, option_code: 'OPT-A', option_name: 'Muster Supervisor' },
            { id: 2, option_code: 'OPT-B', option_name: 'Bill Dealer' }
          ]
        },
        // FIXED: Re-mapped the fields to fully match your blueprint layout from image_a1f0a7.png
        Supervisor: {
          columns: [
            { key: 'admin_id', label: 'Admin ID' },
            { key: 'username', label: 'UserName' },
            { key: 'password_mask', label: 'Password' },
            { key: 'department', label: 'Department' },
            { key: 'depo', label: 'Depo' },
            { key: 'mobile', label: 'Mobile' },
            { key: 'station', label: 'Station' },
            { key: 'secret_count', label: 'Secret Count' }
          ],
          data: [
            { id: 1, admin_id: '856', username: 'adfm/bza', password_mask: 'bzamms@123', department: 'ACCOUNTS', depo: 'GAZ/BZA', mobile: '0', station: 'BZA', secret_count: '4' },
            { id: 2, admin_id: '1009', username: 'Sr.DFM/O/BZA', password_mask: '123456', department: 'ACCOUNTS', depo: 'Sr.DFM/O/BZA', mobile: '9701373101', station: 'BZA', secret_count: '0' },
            { id: 3, admin_id: '799', username: 'CBI/O/BZA', password_mask: 'bzamms@123', department: 'CBI', depo: 'CBI/O/BZA', mobile: '6303066021', station: 'BZA', secret_count: '1' }
          ]
        },
      };

      this.columns = config[name]?.columns || [];
      this.data = config[name]?.data || [];
    });
  }

  switchToAddMode() {
    this.newItem = {};
    this.columns.forEach((col) => { this.newItem[col.key] = ''; });
    this.currentViewMode = 'add';
  }

  switchToEditMode(item: any) {
    this.selectedItem = { ...item };
    this.currentViewMode = 'edit';
  }

  revertBackToGridList() {
    this.currentViewMode = 'list';
  }

  commitSaveNewItemAction() {
    this.newItem['id'] = this.data.length + 1;
    this.data.push({ ...this.newItem });
    alert('Entry record added successfully.');
    this.currentViewMode = 'list';
  }

  commitUpdateItemAction() {
    const idx = this.data.findIndex(d => d.id === this.selectedItem.id);
    if (idx !== -1) {
      this.data[idx] = { ...this.selectedItem };
      alert('Changes successfully saved.');
    }
    this.currentViewMode = 'list';
  }

  triggerDeleteVerification(item: any) {
    this.itemPendingDeletion = item;
    this.showDeletePromptModal = true;
  }

  confirmDeleteAction() {
    if (this.itemPendingDeletion) {
      this.data = this.data.filter(d => d.id !== this.itemPendingDeletion.id);
    }
    this.showDeletePromptModal = false;
    this.itemPendingDeletion = null;
  }

  saveScrolling() {
    localStorage.setItem('scrollingText', this.scrollingText);
    alert('Scrolling track successfully configured.');
  }
}