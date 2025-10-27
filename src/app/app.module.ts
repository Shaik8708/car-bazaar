import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GalleryModule } from 'ng-gallery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './core/pagination/pagination.component';
import { AsideNavComponent } from './core/aside-nav/aside-nav.component';
import { FooterComponent } from './core/footer/footer.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AllLeadsComponent } from './module/leads/all-leads/all-leads.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DealerListComponent } from './module/dealers/dealer-list/dealer-list.component';
import { authInterceptor } from './services/auth.interceptor';
import { HeaderComponent } from './core/header/header.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LockScreenComponent } from './auth/lock-screen/lock-screen.component';
import { MaintenanceComponent } from './auth/maintenance/maintenance.component';
import { NotExistComponent } from './auth/not-exist/not-exist.component';
import { ErrorComponent } from './auth/error/error.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';

import { NewLeadComponent } from './module/leads/new-lead/new-lead.component';
import { NotReachableComponent } from './module/leads/not-reachable/not-reachable.component';
import { CallMeLaterComponent } from './module/leads/call-me-later/call-me-later.component';
import { AskingHighPriceComponent } from './module/leads/asking-high-price/asking-high-price.component';
import { NotRespondingComponent } from './module/leads/not-responding/not-responding.component';
import { DealCancelledComponent } from './module/leads/deal-cancelled/deal-cancelled.component';
import { DealAcceptedComponent } from './module/leads/deal-accepted/deal-accepted.component';
import { AssignedToDealerComponent } from './module/leads/assigned-to-dealer/assigned-to-dealer.component';
import { CompletedComponent } from './module/leads/completed/completed.component';
import { LeadsVerificationComponent } from './module/leads/leads-verification/leads-verification.component';
import { AddDealersComponent } from './module/dealers/add-dealers/add-dealers.component';
import { DealerAssignedLeadsComponent } from './module/dealers/dealer-assigned-leads/dealer-assigned-leads.component';
import { EditLeadComponent } from './module/leads/edit-lead/edit-lead.component';
import { AddCityComponent } from './module/address/add-city/add-city.component';
import { DatePipe } from '@angular/common';
import { CopyClipboardDirective } from './shared/copy-clipboard.directive';

// angular models

import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllUsersComponent } from './module/users/all-users/all-users.component';
import { DealerDetailsListComponent } from './module/dealers/dealer-details/dealer-details-list/dealer-details-list.component';
import { UpdateDealerDetailsComponent } from './module/dealers/dealer-details/update-dealer-details/update-dealer-details.component';
import { LeadsComponent } from './module/zulukk/leads/leads.component';
import { PartsLeadsComponent } from './module/spare-parts/parts-leads/parts-leads.component';
import { DealerQuotationLeadsComponent } from './module/leads/dealer-quotation-leads/dealer-quotation-leads.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    AsideNavComponent,
    FooterComponent,
    AllLeadsComponent,
    DealerQuotationLeadsComponent,
    DealerListComponent,
    DealerDetailsListComponent,
    UpdateDealerDetailsComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SignupComponent,
    LockScreenComponent,
    MaintenanceComponent,
    NotExistComponent,
    ErrorComponent,
    AddDealersComponent,
    DealerAssignedLeadsComponent,
    LeadsVerificationComponent,
    NewLeadComponent,
    NotReachableComponent,
    CallMeLaterComponent,
    AskingHighPriceComponent,
    NotRespondingComponent,
    DealCancelledComponent,
    DealAcceptedComponent,
    AssignedToDealerComponent,
    CompletedComponent,
    EditLeadComponent,
    AddCityComponent,
    CopyClipboardDirective,
    AllUsersComponent,
    LeadsComponent,
    PartsLeadsComponent,
  ],
  exports: [CopyClipboardDirective],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgApexchartsModule,
    FormsModule,
    GalleryModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    AgGridModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
