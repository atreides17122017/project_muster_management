
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

  }

  // ================= LOGIN =================

  login(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl + 'login',
      data
    );

  }

  getProfile(): Observable<any> {

    return this.http.get(
      this.baseUrl + 'me',
      {
        headers: this.getHeaders()
      }
    );

  }

  logout(): Observable<any> {

    return this.http.post(
      this.baseUrl + 'logout',
      {},
      {
        headers: this.getHeaders()
      }
    );

  }

  // ================= EMPLOYEES =================

  getEmployees(): Observable<any> {

    return this.http.get(
      this.baseUrl + 'employees'
    );

  }

  addEmployee(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl + 'employees',
      data
    );

  }

  updateEmployee(id: number, data: any): Observable<any> {

    return this.http.put(
      this.baseUrl + 'employees/' + id,
      data
    );

  }

  deleteEmployee(id: number): Observable<any> {

    return this.http.delete(
      this.baseUrl + 'employees/' + id
    );

  }

  // ================= BILL UNITS =================

  getBillUnits(): Observable<any> {

    return this.http.get(
      this.baseUrl + 'bill-units'
    );

  }

  addBillUnit(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl + 'bill-units',
      data
    );

  }

  updateBillUnit(id: number, data: any): Observable<any> {

    return this.http.put(
      this.baseUrl + 'bill-units/' + id,
      data
    );

  }

  deleteBillUnit(id: number): Observable<any> {

    return this.http.delete(
      this.baseUrl + 'bill-units/' + id
    );

  }

  // ================= STATIONS =================

  getStations(): Observable<any> {

    return this.http.get(
      this.baseUrl + 'stations'
    );

  }

  addStation(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl + 'stations',
      data
    );

  }

  updateStation(id: number, data: any): Observable<any> {

    return this.http.put(
      this.baseUrl + 'stations/' + id,
      data
    );

  }

  deleteStation(id: number): Observable<any> {

    return this.http.delete(
      this.baseUrl + 'stations/' + id
    );

  }

  // ================= DEPARTMENTS =================

  getDepartments(): Observable<any> {

    return this.http.get(
      this.baseUrl + 'departments'
    );

  }

  addDepartment(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl + 'departments',
      data
    );

  }

  updateDepartment(id: number, data: any): Observable<any> {

    return this.http.put(
      this.baseUrl + 'departments/' + id,
      data
    );

  }

  deleteDepartment(id: number): Observable<any> {

    return this.http.delete(
      this.baseUrl + 'departments/' + id
    );

  }
  // ================= INPUT OPTIONS =================

getInputOptions(): Observable<any> {

  return this.http.get(
    this.baseUrl + 'input-options'
  );

}

addInputOption(data: any): Observable<any> {

  return this.http.post(
    this.baseUrl + 'input-options',
    data
  );

}

updateInputOption(id: number, data: any): Observable<any> {

  return this.http.put(
    this.baseUrl + 'input-options/' + id,
    data
  );

}

deleteInputOption(id: number): Observable<any> {

  return this.http.delete(
    this.baseUrl + 'input-options/' + id
  );

}

}

