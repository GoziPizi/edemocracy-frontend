import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../../services/api-handler.service'
import { report, reportEvent } from '../../../../models/moderation/reports';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../../services/toaster.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  id: string = this.route.snapshot.params['id'];
  report: report | null = null;
  reportEvents: reportEvent[] = [];
  entity: any = null;

  currentModeratorStatus = this.apiHandler.role;

  warningMessage: string = "";
  userIdToWarn: string = "";
  isWarningOpen: boolean = false;

  isBanOpen: boolean = false;
  banReason: string = "";
  isBanPermanent: boolean = false;
  banDuration?: number = undefined;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private router: Router,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.fetchReportDetails();
    this.fetchReportEntity();
  }

  fetchReportDetails() {
    this.apiHandler.getReportDetails(this.id).subscribe({
      next: (data:any) => {
        this.reportEvents = data.events;
        this.report = data as report;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchReportEntity() {
    this.apiHandler.getReportEntity(this.id).subscribe({
      next: (data:any) => {
        this.entity = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  navigateToReports() {
    this.router.navigate(['admin', 'moderation'])
  }

  navigateToEntityPage() {
    switch(this.report?.entityType) {
      case 'TOPIC':
        this.router.navigate(['topic', this.report.entityId])
        break;
      case 'DEBATE':
        this.router.navigate(['debate', this.report.entityId])
        break;
      case 'ARGUMENT':
        this.router.navigate(['debate', this.entity.debateId])
        break;
      case 'REFORMULATION':
        this.router.navigate(['reformulations', this.entity.debateId])
        break;
      case 'COMMENT':
        this.router.navigate(['party', this.entity.partyId])
        break;
      default:
        break;
    }
  }

  deleteEntity() { } //TODO

  ignoreReport() {
    this.apiHandler.ignoreReport(this.id).subscribe({
      next: (data) => {
        this.navigateToReports();
        this.toaster.success("Rapport ignoré")
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  warnUser() {
    this.userIdToWarn = this.report?.userId || "";
    this.isWarningOpen = true;
  }

  warnReporter() { }

  closeWarning() {
    this.isWarningOpen = false;
  }

  sendWarning() {
    this.apiHandler.warnUser(this.userIdToWarn, this.warningMessage, this.report?.id).subscribe({
      next: (data) => {
        this.isWarningOpen = false;
        this.fetchReportDetails();
      },
      error: (error) => {
        this.toaster.error("Erreur lors de l'envoi du message")
      }
    })
  }

  escalateToModeration2() {
    this.apiHandler.escalateToModeration2(this.id).subscribe({
      next: (data) => {
        this.navigateToReports();
        this.toaster.success("Rapport escaladé")
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  banUser() {
    this.isBanOpen = true;
  }

  togglePermanentBan() {
    this.isBanPermanent = !this.isBanPermanent;
  }

  closeBan() {
    this.isBanOpen = false;
  }

  sendBanSanction() {
    if(this.isBanPermanent) {
      this.banDuration = undefined;
    }
    this.apiHandler.postSanction(this.id, 'ban', this.banReason, this.banDuration).subscribe({
      next: (data) => {
        this.isBanOpen = false;
        this.navigateToReports();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getEventType(event: reportEvent) {
    if(event.type === "contest") {
      return "Contestation"
    }
    return event.type
  }

  get entityContent() {
    if(!this.entity) {
      return "Chargement..."
    }
    switch(this.report?.entityType) {
      case 'TOPIC':
        return "Titre" + this.entity.title + ". Description: " + this.entity.description
      case 'DEBATE':
        return this.entity.title + ". Description: " + this.entity.content
      case 'ARGUMENT':
        return this.entity.title + ',' + this.entity.content
      case 'REFORMULATION':
        return this.entity.title + ". Description: " + this.entity.content
      case 'COMMENT':
        return this.entity.content
      default:
        return "Contenu"
    }
  }

  get entityType() {
    switch(this.report?.entityType) {
      case 'TOPIC':
        return "Sujet"
      case 'DEBATE':
        return "Débat"
      case 'ARGUMENT':
        return "Argument"
      case 'REFORMULATION':
        return "Reformulation"
      case 'COMMENT':
        return "Commentaire"
      default:
        return "Entité"
    }
  }

  get isModerated() {
    return this.report?.isModerated || false;
  }

  get isDisabled() {
    if(!this.report) {
      return true;
    }
    if(this.report.isModerated && this.currentModeratorStatus === 'MODERATOR1') {
      return true;
    }
    if(this.report.isModerated && this.currentModeratorStatus === 'MODERATOR2' && !this.report.isModeration2Required ) {
      return true;
    }
    return false;
  }
}
