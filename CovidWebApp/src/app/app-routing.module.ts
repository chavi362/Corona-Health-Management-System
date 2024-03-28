import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: 'clients', loadChildren: () => import(`./clients/clients.module`).then(
      module => module.ClientsModule)
  },
  { path: '**', redirectTo: 'clients'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }