import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  constructor(
  private route: ActivatedRoute,
  private http: HttpClient
) {}

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

    // ADD THIS
    { key: 'depo', label: 'Depo' },

    { key: 'employee_designation', label: 'Designation' },
    { key: 'employee_bill_unit', label: 'Bill Unit' },
    { key: 'employee_manual_serial_number', label: 'Manual Serial No' }
  ],
  data: []
},
        'Bill Unit': {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'bill_unit_code', label: 'Code' },
    { key: 'department', label: 'Department' },
    { key: 'station', label: 'Station' }
  ],
  data: []
},
        Stations: {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'station_code', label: 'Code' },
    { key: 'station_name', label: 'Name' },
    { key: 'station_category', label: 'Category' }
  ],
  data: []
},
        Department: {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'department_name', label: 'Department Name' }
  ],
  data: []
},      'Input Options': {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'option_code', label: 'Code' },
    { key: 'option_name', label: 'Name' }
  ],
  data: []
},    Supervisor: {

  columns: [

    { key: 'id', label: 'Admin ID' },

    { key: 'username', label: 'User Name' },

    {
      key: 'password',
      label: 'Password'
    },

    { key: 'department', label: 'Department' },

    { key: 'depot', label: 'Depo' },

    { key: 'mobile_number', label: 'Mobile' },

    { key: 'station', label: 'Station' },

    { key: 'bill_unit_code', label: 'Bill Unit Code' },

    {
      key: 'role',
      label: 'Role',
      type: 'dropdown',
      options: [
        'Supervisor',
        'Bill Dealer'
      ]
    },

    { key: 'secret_count', label: 'Secret Count' }

  ],

  data: []

},
        // FIXED: Re-mapped the fields to fully match your blueprint layout from image_a1f0a7.png
        
      };

      this.columns = config[name]?.columns || [];
      this.data = config[name]?.data || [];
      if (name === 'Employee') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/employees'
  )
  .subscribe(res => {

    this.data = res;

  });

}
if (name === 'Bill Unit') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/bill-units'
  )
  .subscribe(res => {

    this.data = res;

  });

}
if (name === 'Stations') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/stations'
  )
  .subscribe(res => {

    this.data = res;

  });

}
if (name === 'Department') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/departments'
  )
  .subscribe(res => {

    this.data = res;

  });

}
if (name === 'Input Options') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/input-options'
  )
  .subscribe(res => {

    this.data = res;

  });

}
if (name === 'Supervisor') {

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/supervisors'
  )
  .subscribe(res => {

    this.data = res;

  });

}
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

  if (this.title === 'Employee') {

    this.http.post<any>(
      'http://127.0.0.1:8000/api/employees',
      this.newItem
    )
    .subscribe({

  next: (res) => {

    this.data.push(res.employee);

    alert('Employee Added Successfully');

    this.currentViewMode = 'list';

  },

  error: (err) => {

    console.log(err);

    alert('Failed to add employee');

  }

});

  }
  if (this.title === 'Bill Unit') {

  this.http.post<any>(
    'http://127.0.0.1:8000/api/bill-units',
    this.newItem
  )
  .subscribe(res => {

    this.data.push(res.bill_unit);

    alert('Bill Unit Added Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Stations') {

  this.http.post<any>(
    'http://127.0.0.1:8000/api/stations',
    this.newItem
  )
  .subscribe(res => {

    this.data.push(res.station);

    alert('Station Added Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Department') {

  this.http.post<any>(
    'http://127.0.0.1:8000/api/departments',
    this.newItem
  )
  .subscribe(res => {

    this.data.push(res.department);

    alert('Department Added Successfully');

    this.currentViewMode = 'list';

  });

}

if (this.title === 'Input Options') {

  this.http.post<any>(
    'http://127.0.0.1:8000/api/input-options',
    this.newItem
  )
  .subscribe(res => {

    this.data.push(res.input_option);

    alert('Input Option Added Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Supervisor') {

  this.http.post<any>(
    'http://127.0.0.1:8000/api/supervisors',
    this.newItem
  )
  .subscribe(res => {

    this.data.push(res.supervisor);

    alert('Supervisor Added Successfully');

    this.currentViewMode = 'list';

  });

}
}

  commitUpdateItemAction() {

  if (this.title === 'Employee') {

    this.http.put<any>(
      `http://127.0.0.1:8000/api/employees/${this.selectedItem.id}`,
      this.selectedItem
    )
    .subscribe({

  next: (res) => {

    const idx = this.data.findIndex(
      d => d.id === this.selectedItem.id
    );

    if (idx !== -1) {

      this.data[idx] = res.employee;

    }

    alert('Employee Updated Successfully');

    this.currentViewMode = 'list';

  },

  error: (err) => {

    console.log(err);

    alert('Failed to update employee');

  }

});
  }
  if (this.title === 'Bill Unit') {

  this.http.put<any>(
    `http://127.0.0.1:8000/api/bill-units/${this.selectedItem.id}`,
    this.selectedItem
  )
  .subscribe(res => {

    const idx = this.data.findIndex(
      d => d.id === this.selectedItem.id
    );

    if (idx !== -1) {

      this.data[idx] = res.bill_unit;

    }

    alert('Bill Unit Updated Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Stations') {

  this.http.put<any>(
    `http://127.0.0.1:8000/api/stations/${this.selectedItem.id}`,
    this.selectedItem
  )
  .subscribe(res => {

    const idx = this.data.findIndex(
      d => d.id === this.selectedItem.id
    );

    if (idx !== -1) {

      this.data[idx] = res.station;

    }

    alert('Station Updated Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Department') {

  this.http.put<any>(
    `http://127.0.0.1:8000/api/departments/${this.selectedItem.id}`,
    this.selectedItem
  )
  .subscribe(res => {

    const idx = this.data.findIndex(
      d => d.id === this.selectedItem.id
    );

    if (idx !== -1) {

      this.data[idx] = res.department;

    }

    alert('Department Updated Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Input Options') {

  this.http.put<any>(
    `http://127.0.0.1:8000/api/input-options/${this.selectedItem.id}`,
    this.selectedItem
  )
  .subscribe(res => {

    const idx = this.data.findIndex(
      d => d.id === this.selectedItem.id
    );

    if (idx !== -1) {

      this.data[idx] = res.input_option;

    }

    alert('Input Option Updated Successfully');

    this.currentViewMode = 'list';

  });

}
if (this.title === 'Supervisor') {

  this.http.put<any>(
    `http://127.0.0.1:8000/api/supervisors/${this.selectedItem.id}`,
    this.selectedItem
  )
  .subscribe(res => {

    const idx =
      this.data.findIndex(
        d => d.id === this.selectedItem.id
      );

    if (idx !== -1) {

      this.data[idx] = res.supervisor;

    }

    alert('Supervisor Updated Successfully');

    this.currentViewMode = 'list';

  });

}

}

  triggerDeleteVerification(item: any) {
    this.itemPendingDeletion = item;
    this.showDeletePromptModal = true;
  }

  confirmDeleteAction() {

  if (
    this.title === 'Employee' &&
    this.itemPendingDeletion
  ) {

    this.http.delete(
      `http://127.0.0.1:8000/api/employees/${this.itemPendingDeletion.id}`
    )
    .subscribe(() => {

      this.data = this.data.filter(
        d => d.id !== this.itemPendingDeletion.id
      );

      alert('Employee Deleted Successfully');

      this.showDeletePromptModal = false;

      this.itemPendingDeletion = null;

    });

  }
  if (
  this.title === 'Bill Unit' &&
  this.itemPendingDeletion
) {

  this.http.delete(
    `http://127.0.0.1:8000/api/bill-units/${this.itemPendingDeletion.id}`
  )
  .subscribe(() => {

    this.data = this.data.filter(
      d => d.id !== this.itemPendingDeletion.id
    );

    alert('Bill Unit Deleted Successfully');

    this.showDeletePromptModal = false;

    this.itemPendingDeletion = null;

  });

}

if (
  this.title === 'Stations' &&
  this.itemPendingDeletion
) {

  this.http.delete(
    `http://127.0.0.1:8000/api/stations/${this.itemPendingDeletion.id}`
  )
  .subscribe(() => {

    this.data = this.data.filter(
      d => d.id !== this.itemPendingDeletion.id
    );

    alert('Station Deleted Successfully');

    this.showDeletePromptModal = false;

    this.itemPendingDeletion = null;

  });

}
if (
  this.title === 'Department' &&
  this.itemPendingDeletion
) {

  this.http.delete(
    `http://127.0.0.1:8000/api/departments/${this.itemPendingDeletion.id}`
  )
  .subscribe(() => {

    this.data = this.data.filter(
      d => d.id !== this.itemPendingDeletion.id
    );

    alert('Department Deleted Successfully');

    this.showDeletePromptModal = false;

    this.itemPendingDeletion = null;

  });

}
if (
  this.title === 'Input Options' &&
  this.itemPendingDeletion
) {

  this.http.delete(
    `http://127.0.0.1:8000/api/input-options/${this.itemPendingDeletion.id}`
  )
  .subscribe(() => {

    this.data = this.data.filter(
      d => d.id !== this.itemPendingDeletion.id
    );

    alert('Input Option Deleted Successfully');

    this.showDeletePromptModal = false;

    this.itemPendingDeletion = null;

  });

}
if (
  this.title === 'Supervisor' &&
  this.itemPendingDeletion
) {

  this.http.delete(
    `http://127.0.0.1:8000/api/supervisors/${this.itemPendingDeletion.id}`
  )
  .subscribe(() => {

    this.data =
      this.data.filter(
        d => d.id !== this.itemPendingDeletion.id
      );

    alert('Supervisor Deleted Successfully');

    this.showDeletePromptModal = false;

    this.itemPendingDeletion = null;

  });

}
}

  saveScrolling() {
    localStorage.setItem('scrollingText', this.scrollingText);
    alert('Scrolling track successfully configured.');
  }
}