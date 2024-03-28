import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { UnvaccinatedClientsComponent } from './unvaccinated-clients/unvaccinated-clients.component';

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'details/:id', component: ClientDetailsComponent },
  { path: 'unvaccinated', component: UnvaccinatedClientsComponent }, // Add this route for UnvaccinatedClientsComponent
  { path: '**', redirectTo: '' },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
