import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../api';

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

// MODAL STATES
showAddModal = false;
showEditModal = false;
showDeleteModal = false;

selectedItem: any = null;
newItem: any = {};

constructor(
private route: ActivatedRoute,
private api: ApiService
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

        {
          key: 'employee_manual_serial_number',
          label: 'Manual Serial No'
        }

      ],

      data: []

    },

    'Bill Unit': {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'bill_unit_code', label: 'Code' },
    { key: 'department', label: 'Department' },
    { key: 'station', label: 'Station' },
    { key: 'supervisor_id', label: 'Supervisor' }
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
},

    'Input Options': {

  columns: [

    { key: 'id', label: 'ID' },

    { key: 'option_code', label: 'Code' },

    { key: 'option_name', label: 'Name' }

  ],

  data: []

},

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

  this.columns = config[name]?.columns || [];
  this.data = config[name]?.data || [];

  // LOAD EMPLOYEES FROM LARAVEL
  if (name === 'Employee') {

    this.api.getEmployees().subscribe({

      next: (response: any) => {

        console.log(response);

        this.data = response;

      },

      error: (error: any) => {

        console.log(error);

      }

    });

  }
  if (name === 'Bill Unit') {

    this.api.getBillUnits().subscribe({

      next: (response: any) => {

        console.log(response);

        this.data = response;

      },

      error: (error: any) => {

        console.log(error);

      }

    });

  }

  if (name === 'Stations') {

  this.api.getStations().subscribe({

    next: (response:any) => {
      this.data = response;
    },

    error: (error:any) => {
      console.log(error);
    }

  });

}


if (name === 'Department') {

  this.api.getDepartments().subscribe({

    next: (response:any) => {
      this.data = response;
    },

    error: (error:any) => {
      console.log(error);
    }

  });

}
if (name === 'Input Options') {

  this.api.getInputOptions().subscribe({

    next: (response:any) => {

      this.data = response;

    },

    error: (error:any) => {

      console.log(error);

    }

  });

}


});

}

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

  if (this.title === 'Employee') {

    this.api.addEmployee(this.newItem).subscribe({

      next: (response: any) => {

        this.data.push(response.employee);

        this.showAddModal = false;

        this.newItem = {};

      }

    });

  }

  else if (this.title === 'Bill Unit') {

    this.api.addBillUnit(this.newItem).subscribe({

      next: (response: any) => {

        this.data.push(response.bill_unit);

        this.showAddModal = false;

        this.newItem = {};

      },

      error: (error: any) => {

        console.log(error);

      }

    });

  }
  else if (this.title === 'Input Options') {

  this.api.addInputOption(this.newItem).subscribe({

    next: (response:any) => {

      console.log(response);

      this.data.push(response.input_option);

      this.showAddModal = false;

      this.newItem = {};

    },

    error: (error:any) => {

      console.log(error);

    }

    });
  }
  else if (this.title === 'Stations') {

    this.api.addStation(this.newItem).subscribe({

      next: (response: any) => {

        console.log(response);

        this.data.push(response.station);

        this.showAddModal = false;

        this.newItem = {};

      },

      error: (error: any) => {

        console.log(error);

      }

    });

  }
  else if (this.title === 'Department') 
  {

  this.api.addDepartment(this.newItem).subscribe({

    next: (response: any) => {

      console.log(response);

      this.data.push(response.department);

      this.showAddModal = false;

      this.newItem = {};

    },

    error: (error: any) => {

      console.log(error);

    }

  });

}

}

edit(item: any) {


this.selectedItem = { ...item };

this.showEditModal = true;


}

updateItem() {

  if (this.title === 'Employee') {

    this.api.updateEmployee(
      this.selectedItem.id,
      this.selectedItem
    ).subscribe({

      next: (response: any) => {

        const index = this.data.findIndex(
          d => d.id === this.selectedItem.id
        );

        if (index !== -1) {

          this.data[index] = response.employee;

        }

        this.showEditModal = false;

      }

    });

  }

  else if (this.title === 'Bill Unit') {

    this.api.updateBillUnit(
      this.selectedItem.id,
      this.selectedItem
    ).subscribe({

      next: (response: any) => {

        const index = this.data.findIndex(
          d => d.id === this.selectedItem.id
        );

        if (index !== -1) {

          this.data[index] = response.bill_unit;

        }

        this.showEditModal = false;

      }

    });

  }
  else if (this.title === 'Input Options') {

  this.api.updateInputOption(
    this.selectedItem.id,
    this.selectedItem
  ).subscribe({

    next: (response:any) => {

      const index = this.data.findIndex(
        d => d.id === this.selectedItem.id
      );

      if (index !== -1) {

        this.data[index] = response.input_option;

      }

      this.showEditModal = false;

    }

  });

}

  else if (this.title === 'Stations') {

    this.api.updateStation(
      this.selectedItem.id,
      this.selectedItem
    ).subscribe({

      next: (response: any) => {

        const index = this.data.findIndex(
          d => d.id === this.selectedItem.id
        );

        if (index !== -1) {

          this.data[index] = response.station;

        }

        this.showEditModal = false;

      }

    });

  }
  else if (this.title === 'Department') {

  this.api.updateDepartment(
    this.selectedItem.id,
    this.selectedItem
  ).subscribe({

    next: (response: any) => {

      const index = this.data.findIndex(
        d => d.id === this.selectedItem.id
      );

      if (index !== -1) {

        this.data[index] = response.department;

      }

      this.showEditModal = false;

    }

  });

}

}

delete(item: any) {


this.selectedItem = item;

this.showDeleteModal = true;


}

confirmDelete() {

  if (this.title === 'Employee') {

    this.api.deleteEmployee(
      this.selectedItem.id
    ).subscribe({

      next: () => {

        this.data = this.data.filter(
          d => d.id !== this.selectedItem.id
        );

        this.showDeleteModal = false;

      }

    });

  }

  else if (this.title === 'Bill Unit') {

    this.api.deleteBillUnit(
      this.selectedItem.id
    ).subscribe({

      next: () => {

        this.data = this.data.filter(
          d => d.id !== this.selectedItem.id
        );

        this.showDeleteModal = false;

      }

    });

  }
  else if (this.title === 'Input Options') {

  this.api.deleteInputOption(
    this.selectedItem.id
  ).subscribe({

    next: () => {

      this.data = this.data.filter(
        d => d.id !== this.selectedItem.id
      );

      this.showDeleteModal = false;

    }

  });

}
  else if (this.title === 'Stations') {

    this.api.deleteStation(
      this.selectedItem.id
    ).subscribe({

      next: () => {

        this.data = this.data.filter(
          d => d.id !== this.selectedItem.id
        );

        this.showDeleteModal = false;

      }

    });

  }
  else if (this.title === 'Department') {

  this.api.deleteDepartment(
    this.selectedItem.id
  ).subscribe({

    next: () => {

      this.data = this.data.filter(
        d => d.id !== this.selectedItem.id
      );

      this.showDeleteModal = false;

    }

  });

}
}

closeModal() {


this.showAddModal = false;

this.showEditModal = false;

this.showDeleteModal = false;


}

}
