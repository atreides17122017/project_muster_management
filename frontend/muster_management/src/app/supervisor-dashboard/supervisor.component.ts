import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-supervisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  // Global Workspace Configuration Properties
  isSidebarOpen: boolean = true;
  activeTab: string = 'employee-list';
  searchText: string = '';
  supervisorName = '';
supervisorId = '';
loggedSupervisorRole = '';
  showInstructionsModal: boolean = false;
  showDeleteConfirmationModal: boolean = false; // Inline delete prompt state tracking

  // Multi-Level Workflow State Navigation Trackers
  rentRollViewMode: 'list' | 'add' | 'edit' | 'view' = 'list';
  scaleCheckViewMode: 'list' | 'edit' = 'list';
  musterKitViewMode: 'list' | 'upload' | 'available-musters' | 'detailed-musters' = 'list';
  ndaViewMode: 'list' | 'add-hours' | 'view-hours' = 'list';
  helpDeskSubTab: 'submit' | 'view' = 'submit';

  // Selected Row Memory Mappings
editingEmployeeId: number | null = null;
selectedNdaPf: string | null = null;
selectedNdaName: string = '';
activeKitRow: any = null;
rowPendingDeletionId: number | null = null;

viewNdaRecords: any[] = [];
masterEmployees: any[] = [];
  constructor(
  private http: HttpClient
) {}

  // Operational Form Datasets
  rentRollForm = { sNo: 0, pf: '', name: '', desig: '', qNo: '', qType: '', area: '', occupiedFrom: '', occupiedTo: '', remarks: '' };
  editEmployeeForm = { sNo: 0, pf: '', name: '', desig: '', mobile: '', dept: '', station: '', unit: '', manualSerial: '', depo: '' };
  scaleForm = { sNo: 0, stn: 'BZA', dept: 'MECHANICAL', unit: '0907415', desig: 'OS/MECH', sanc: 4, act: 5, vac: 0, exc: 1, remarks: '-' };
  uploadKitForm = { monthYear: 'May Jun 2026', station: 'BZA', department: 'MECHANICAL', billUnit: '', remarks: '' };
  helpDeskForm = { pfNumber: '', category: 'Muster Correction', priority: 'Medium', description: '' };
  securityForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
  newNdaEntry = { fromDate: '11-05-2026', toDate: '10-06-2026', hours: '', remarks: '' };

  // --- COMPREHENSIVE LOCAL RECORD MATRIX MASTER DATASETS ---

  ndaHistoricalHours = [
    { fromDate: '01-12-2025', toDate: '31-12-2025', hours: 80, remarks: '*' },
    { fromDate: '01-01-2026', toDate: '31-01-2026', hours: 80, remarks: '*' }
  ];

  scaleCheckData = [
    { sNo: 1, stn: 'BZA', dept: 'MECHANICAL', unit: '0907415', desig: 'OS/MECH', sanc: 4, act: 5, vac: 0, exc: 1, remarks: '-' },
    { sNo: 2, stn: 'BZA', dept: 'MECHANICAL', unit: '0907415', desig: 'ANCILLARY', sanc: 8, act: 3, vac: 5, exc: 0, remarks: '-' }
  ];

  availableMustersList = [
    { sNo: 1, from: '11-05-2026', to: '10-06-2026', status: 'AVBL' },
    { sNo: 2, from: '11-04-2026', to: '10-05-2026', status: 'AVBL' }
  ];

  detailedMusterDays = [
    { day: 1, date: '11-05-2026', status: 'P' },
    { day: 2, date: '12-05-2026', status: 'P' },
    { day: 3, date: '13-05-2026', status: 'OL' }
  ];

  registeredTickets = [
    { id: 'TKT-9912', date: '15-06-2026', cat: 'Muster Correction', desc: 'Muster logging track confirmation setup.', status: 'Pending' }
  ];

  ngOnInit(): void {

    // Get logged supervisor from localStorage
    const supervisor = JSON.parse(
      localStorage.getItem('loggedSupervisor')!
    );
    this.supervisorName =
supervisor.username.toUpperCase();

this.supervisorId =
supervisor.id;

this.loggedSupervisorRole =
supervisor.role;

    console.log(supervisor);

    // Fetch employees having same bill unit
    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/employees/bill-unit/' +
      supervisor.bill_unit_code
    )
      .subscribe({


        next: (response) => {

          console.log(response);

          this.masterEmployees = response.map(
            (employee, index) => ({

              sNo: index + 1,

              pf: employee.pf_number,

              name: employee.employee_name,

              mobile: employee.mobile_number,

              station: employee.employee_station,

              dept: employee.employee_department,

              depo: employee.depo,

              desig: employee.employee_designation,

              unit: employee.employee_bill_unit,

              manualSerial:
                employee.employee_manual_serial_number,

              status: employee.status,

              rentRollStatus: '+'
            })
          );

        },

        error: (err) => {

          console.log(err);

        }


      });

    const modalSessionToken =
      sessionStorage.getItem(
        'mms_supervisor_session_active'
      );

    if (!modalSessionToken) {

      this.showInstructionsModal = true;

      sessionStorage.setItem(
        'mms_supervisor_session_active',
        'true'
      );


    }

  }



  dismissInstructionsModal(): void {
    this.showInstructionsModal = false;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
    this.searchText = '';
    this.selectedNdaPf = null;
    this.editingEmployeeId = null;
    this.rentRollViewMode = 'list';
    this.scaleCheckViewMode = 'list';
    this.musterKitViewMode = 'list';
    this.ndaViewMode = 'list';
    this.showDeleteConfirmationModal = false;
  }

  triggerPrintJob(): void {
    window.print();
  }

  getFilteredData(dataset: any[]): any[] {
    if (!this.searchText.trim()) return dataset;
    const term = this.searchText.toLowerCase();
    return dataset.filter(item =>
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.pf && item.pf.includes(term)) ||
      (item.desig && item.desig.toLowerCase().includes(term)) ||
      (item.station && item.station.toLowerCase().includes(term))
    );
  }

  // --- RENT ROLL STATEMENT View Handling ---
  routeRentRollAdd(emp: any): void {
    this.rentRollForm = {
      sNo: emp.sNo, pf: emp.pf, name: emp.name, desig: emp.desig,
      qNo: '', qType: '', area: '', occupiedFrom: '', occupiedTo: '', remarks: '*'
    };
    this.rentRollViewMode = 'add';
  }

  routeRentRollEdit(row: any): void {
    this.rentRollForm = {
      sNo: row.sNo, pf: row.pf, name: row.name, desig: row.desig,
      qNo: '831/K', qType: 'II', area: 'GREEN PARK COLONY', occupiedFrom: '2022-09-11', occupiedTo: '', remarks: 'Plinth Area : 47.22 Sq.Mtrs'
    };
    this.rentRollViewMode = 'edit';
  }

  routeRentRollView(row: any): void {
    this.rentRollForm = {
      sNo: row.sNo, pf: row.pf, name: row.name, desig: row.desig,
      qNo: '831/K', qType: 'II', area: 'GREEN PARK COLONY', occupiedFrom: '2022-09-11', occupiedTo: '2022-09-11', remarks: 'Plinth Area : 47.22 Sq.Mtrs'
    };
    this.rentRollViewMode = 'view';
  }

  commitRentRollFormAction(empId: number): void {
    const idx = this.masterEmployees.findIndex(e => e.sNo === empId);
    if (idx !== -1) {
      this.masterEmployees[idx].rentRollStatus = 'AVBL';
    }
    alert('Rent Roll Statement record saved successfully.');
    this.rentRollViewMode = 'list';
  }

  triggerDeleteVerificationPrompt(empId: number): void {
    this.rowPendingDeletionId = empId;
    this.showDeleteConfirmationModal = true;
  }

  confirmDeleteRecordAction(): void {
    if (this.rowPendingDeletionId !== null) {
      const idx = this.masterEmployees.findIndex(e => e.sNo === this.rowPendingDeletionId);
      if (idx !== -1) {
        this.masterEmployees[idx].rentRollStatus = '+';
      }
    }
    this.showDeleteConfirmationModal = false;
    this.rowPendingDeletionId = null;
  }

  closeDeleteModal(): void {
    this.showDeleteConfirmationModal = false;
    this.rowPendingDeletionId = null;
  }

  // --- MASTER PERSONNEL OPERATIONS ---
  initiateEmployeeEdit(employee: any): void {
    this.editingEmployeeId = employee.sNo;
    this.editEmployeeForm = { ...employee };
  }

  saveEmployeeModifications(): void {
    const idx = this.masterEmployees.findIndex(e => e.sNo === this.editingEmployeeId);
    if (idx !== -1) {
      this.masterEmployees[idx] = { ...this.masterEmployees[idx], ...this.editEmployeeForm };
      alert('Personnel record successfully updated.');
      this.editingEmployeeId = null;
    }
  }

  // --- SCALE CHECK & NDA MANAGEMENT ---
  initScaleCheckEdit(row: any): void {
    this.scaleForm = { ...row };
    this.scaleCheckViewMode = 'edit';
  }

  saveScaleCheckForm(): void {
    const idx = this.scaleCheckData.findIndex(s => s.sNo === this.scaleForm.sNo);
    if (idx !== -1) {
      this.scaleCheckData[idx] = { ...this.scaleForm };
    }
    alert('Scale Check matrix configured.');
    this.scaleCheckViewMode = 'list';
  }

  initiateNdaHoursAdd(row: any): void {

  this.selectedNdaPf = row.pf;

  this.selectedNdaName = row.name;

  this.activeKitRow = row;

  this.ndaViewMode = 'add-hours';

}

  
  initiateNdaHoursView(row: any): void {

  this.selectedNdaPf = row.pf;
  this.selectedNdaName = row.name;

  this.http.get<any[]>(
    'http://127.0.0.1:8000/api/employee-nda-details/employee/' +
    row.pf
  )
  .subscribe({

    next: (response) => {

      console.log(response);

      this.viewNdaRecords = response;

      this.ndaViewMode = 'view-hours';

    },

    error: (err) => {

      console.log(err);

    }

  });

}

  saveNewNdaHoursLog(): void {

  const body = {

    pf_number: this.activeKitRow.pf,

    employee_name: this.activeKitRow.name,

    designation: this.activeKitRow.desig,

    depot: this.activeKitRow.depo,

    from_date: this.newNdaEntry.fromDate,

    to_date: this.newNdaEntry.toDate,

    working_hours: this.newNdaEntry.hours,

    remarks: this.newNdaEntry.remarks

  };

  this.http.post<any>(

    'http://127.0.0.1:8000/api/employee-nda-details',

    body

  )
  .subscribe({

    next: (response) => {

      console.log(response);

      alert('NDA Hours Added Successfully');

      this.ndaViewMode = 'list';

    },

    error: (err) => {

      console.log(err);

      alert('Failed to Add NDA Hours');

    }

  });

}

  deleteNdaRowRecord(pf: string): void {
    if (confirm(`Drop NDA log row parameters for entry [PF: ${pf}]?`)) {
      this.masterEmployees = this.masterEmployees.filter(e => e.pf !== pf);
    }
  }

  executeFormSubmission(ctx: string): void {
    alert(`${ctx} has been successfully validated.`);
  }
  deleteNdaRecord(id: number) {

  if (!confirm('Delete this NDA record?')) {
    return;
  }

  this.http.delete(
    'http://127.0.0.1:8000/api/employee-nda-details/' + id
  )
  .subscribe({

    next: () => {

      alert('NDA Record Deleted Successfully');

      // refresh eye list
      this.viewNdaRecords =
      this.viewNdaRecords.filter(
        record => record.id !== id
      );

    },

    error: (err) => {

      console.log(err);

      alert('Failed to Delete NDA Record');

    }

  });

}
  logout(): void {
    sessionStorage.removeItem('mms_supervisor_session_active');
    alert('Session invalidated.');
  }
  finalSubmitNda()
{
  this.http.put<any>(
    'http://127.0.0.1:8000/api/employee-nda-final-submit',
    {}
  )
  .subscribe({

    next: (response) => {

      alert(response.message);

    },

    error: (err) => {

      console.log(err);

      alert('Final Submission Failed');

    }

  });
}
}

