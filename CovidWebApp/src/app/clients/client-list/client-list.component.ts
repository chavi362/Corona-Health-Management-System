import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../client';
import { ClientsService } from '../clients.service';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  error = null;
  private subscriber = new Subscription();


  constructor(private clientsService: ClientsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients() {
    this.subscriber.add(
      this.clientsService.getClients().subscribe({
        next: clients => this.clients = clients,
        error: error => this.error = error
      }));
  }

  addOrUpdate(id = -1) {
    this.router.navigate(['clients', 'details', id]);
  }

  delete(id: number) {
    var ans = confirm('Are you sure wanting delete this patient?');
    if (ans)
      this.subscriber.add(
        this.clientsService.deleteClient(id).subscribe({
          next: () => {
            alert('The client deleted succesfully');
            this.getClients()
          },
          error: () => alert('An error occurred, please try again later...')
        }));
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
