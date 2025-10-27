import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DealerListComponent } from './dealer-list/dealer-list.component';
import { AddDealersComponent } from './add-dealers/add-dealers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerAssignedLeadsComponent } from './dealer-assigned-leads/dealer-assigned-leads.component';
import { ShareLeadDealerComponent } from './share-lead-dealer/share-lead-dealer.component';
import { GalleryModule } from 'ng-gallery';
import { DealerDetailsListComponent } from './dealer-details/dealer-details-list/dealer-details-list.component';
import { UpdateDealerDetailsComponent } from './dealer-details/update-dealer-details/update-dealer-details.component';

const routes: Routes = [

  {
    path: 'dealer-list',
    component: DealerListComponent,
  },
  {
    path: 'add-dealer',
    component: AddDealersComponent,
  },
  {
    path: 'edit-dealer/:id',
    component: AddDealersComponent,
  },
  {
    path: 'product-data/:id',
    component: ShareLeadDealerComponent,
  },
  {
    path: 'single-dealer/:id',
    component: DealerAssignedLeadsComponent,
  },
  {
    path: 'dealer-details-list',
    component: DealerDetailsListComponent,
  },
  {
    path: 'update-dealer-details',
    component: UpdateDealerDetailsComponent,
  },
  {
    path: 'update-dealer-details/:id',
    component: UpdateDealerDetailsComponent,
  },

];

@NgModule({
  declarations: [

  
    ShareLeadDealerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GalleryModule,
    ReactiveFormsModule,
    GalleryModule,
    RouterModule.forChild(routes)
  ]
})

export class DealersModule { }
