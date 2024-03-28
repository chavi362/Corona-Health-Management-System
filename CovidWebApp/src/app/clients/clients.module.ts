import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnvaccinatedClientsComponent } from './unvaccinated-clients/unvaccinated-clients.component';


@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientListComponent,
    UnvaccinatedClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientsModule { }
