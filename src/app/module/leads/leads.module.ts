import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllLeadsComponent } from './all-leads/all-leads.component';
import { LeadsVerificationComponent } from './leads-verification/leads-verification.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NewLeadComponent } from './new-lead/new-lead.component';
import { NotReachableComponent } from './not-reachable/not-reachable.component';
import { CallMeLaterComponent } from './call-me-later/call-me-later.component';
import { AskingHighPriceComponent } from './asking-high-price/asking-high-price.component';
import { NotRespondingComponent } from './not-responding/not-responding.component';
import { DealCancelledComponent } from './deal-cancelled/deal-cancelled.component';
import { DealAcceptedComponent } from './deal-accepted/deal-accepted.component';
import { AssignedToDealerComponent } from './assigned-to-dealer/assigned-to-dealer.component';
import { CompletedComponent } from './completed/completed.component';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LeadsComponent } from '../zulukk/leads/leads.component';
import { PartsLeadsComponent } from '../spare-parts/parts-leads/parts-leads.component';
import { DealerQuotationLeadsComponent } from './dealer-quotation-leads/dealer-quotation-leads.component';

const routes: Routes = [
  {
    path: 'leads',
    component: AllLeadsComponent,
  },
  {
    path: 'dealer-quotations-leads',
    component: DealerQuotationLeadsComponent,
  },
  {
    path: 'leads/:id',
    component: AllLeadsComponent,
  },
  {
    path: 'edit-lead/:id',
    component: EditLeadComponent,
  },
  {
    path: 'leads-verification',
    component: LeadsVerificationComponent,
  },
  {
    path: 'new-lead',
    component: NewLeadComponent,
  },
  {
    path: 'not-reachable',
    component: NotReachableComponent,
  },
  {
    path: 'call-me-later',
    component: CallMeLaterComponent,
  },
  {
    path: 'asking-high-price',
    component: AskingHighPriceComponent,
  },
  {
    path: 'not-responding',
    component: NotRespondingComponent,
  },
  {
    path: 'deal-cancelled',
    component: DealCancelledComponent,
  },
  {
    path: 'deal-accepted',
    component: DealAcceptedComponent,
  },
  {
    path: 'assigned-to-dealer',
    component: AssignedToDealerComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'zulukk-leads',
    component: LeadsComponent,
  },
  {
    path: 'parts-leads',
    component: PartsLeadsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ClipboardModule,
    RouterModule.forChild(routes),
  ],
})
export class LeadsModule {}
