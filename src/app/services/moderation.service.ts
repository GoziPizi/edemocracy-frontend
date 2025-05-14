import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  isCopyDisplayed = true;
  isFusionDisplayed = true;
  copyContent: string | null = null;

  constructor(
    private apiHandler: ApiHandlerService,
    private toaster: ToasterService
  ) { }

  get copyStatus() {
    return this.isCopyDisplayed;
  }

  get fusionStatus() {
    return this.isFusionDisplayed && this.copyContent !== null;
  }

  setCopyContent(id: string) {
    this.copyContent = id;
    this.toaster.success('Élément copié');
  }

}
