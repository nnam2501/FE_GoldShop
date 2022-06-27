import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employeeURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAllEmployee() {
    return this.httpClient.get(employeeURL);
  }
}
