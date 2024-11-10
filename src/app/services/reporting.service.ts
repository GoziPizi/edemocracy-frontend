import { Injectable } from '@angular/core';
import { ReportType } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  reportingOpen: boolean = false;
  entityId: string|null = null;
  entityType: ReportType|null = null;


  constructor() { }

  //Opens the report window, and sets the values of the entity.

  openReport(entityId: string, entityType: ReportType) {
    this.reportingOpen = true;
    this.entityId = entityId
    this.entityType = entityType
  }

  closeReportWindow() {
    this.reportingOpen = false
  }
}
