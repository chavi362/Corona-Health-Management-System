import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client } from '../client';

@Component({
  selector: 'app-unvaccinated-clients',
  templateUrl: './unvaccinated-clients.component.html',
  styleUrls: ['./unvaccinated-clients.component.scss']
})
export class UnvaccinatedClientsComponent implements OnInit {
  unvaccinatedClients: Client[] = [];

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientsService.getUnvaccinatedClients().subscribe(clients => {
      this.unvaccinatedClients = clients;
    });
  }
}
