import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inspection } from './inspections/inspections.component';

@Injectable({
  providedIn: 'root',
})
export class InspectionsDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getInspections(offset: number, count: number): Promise<Inspection[]> {
    const url: string =
      this.apiBaseUrl + '/inspections?offset=' + offset + '&count=' + count;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  public getInspection(inspectionId: string): Promise<Inspection> {
    const url: string = this.apiBaseUrl + '/inspection/' + inspectionId;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  public deleteInspection(inspectionId: string): Promise<Inspection> {
    const url: string = this.apiBaseUrl + '/inspection/' + inspectionId;

    return this.http.delete(url).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
