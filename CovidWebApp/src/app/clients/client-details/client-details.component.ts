import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../client';
import { ClientsService } from '../clients.service';
import { Creator } from '../creator';


const phonePattern = /\(?([0-9]{2,3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const digitsPattern = /^\d+$/;

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  isNew: boolean = false;
  client: Client = <Client>{};
  creators: Creator[];
  patientsForm: FormGroup;
  vaccinationForm: FormGroup;
  private subscriber = new Subscription();

  constructor(private fb: FormBuilder,
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || -1;
    this.isNew = id === -1;
    if (this.isNew) {
      this.buildForm();
    } else {
      this.subscriber.add(this.clientsService.getClient(id).
        subscribe({
          next: client => {
            this.client = client;
            this.buildForm();
          },
          error: err => alert('An error occurred, please try again later...')
        }));
    }
    this.subscriber.add(this.clientsService.getCreators().
      subscribe({
        next: creator => this.creators = creator,
        error: err => alert('An error occurred, please try again later...')
      }));
  }

  private buildForm() {
    this.patientsForm = this.fb.group({
      firstName: [this.client?.firstName, Validators.required],
      lastName: [this.client?.lastName, Validators.required],
      identity: [this.client?.identity, [Validators.required, this.identityValidate()]],
      city: [this.client?.city, Validators.required],
      street: [this.client?.street, Validators.required],
      buildingNumber: [this.client?.buildingNumber, [Validators.required, Validators.pattern(digitsPattern)]],
      phoneNumber: [this.client?.phoneNumber, Validators.pattern(phonePattern)],
      mobileNumber: [this.client?.mobileNumber, [Validators.required, Validators.pattern(phonePattern)]],
      recoveryDate: this.client?.recoveryDate,
      positiveResultDate: this.client?.positiveResultDate,
    });

    this.vaccinationForm = this.fb.group({
      creatorId: ['', Validators.required],
      vaccinationDate: ['', Validators.required]
    });
  }

  addVaccination() {
    if (!this.client.vaccinationsClients)
      this.client.vaccinationsClients = [];
    if (this.vaccinationForm.valid) {
      this.client.vaccinationsClients.push(this.vaccinationForm.value);
      this.client.vaccinationsClients[this.client.vaccinationsClients.length - 1].creator =
        <Creator>{ creatorName: this.creators.find(v => v.creatorID.toString() === this.vaccinationForm.value.creatorId)?.creatorName || '' };
      this.vaccinationForm.reset();
      console.log(this.client)
    }
  }

  private isValidIsraeliID = (id: string) => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
  }) % 10 === 0;

  private identityValidate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = !control.value || this.isValidIsraeliID(control.value);
      return isValid ? null : { identity: true };
    };
  }

  save() {
    if (this.patientsForm.valid) {
      const client = this.patientsForm.value;
      // Check if vaccinationsClients is defined before mapping over it
      if (this.client.vaccinationsClients) {
        client.vaccinationsClients = this.client.vaccinationsClients
          .map(v => ({
            creatorId: v.creatorId,
            vaccinationDate: v.vaccinationDate,
            clientId: this.client.clientId || 0
          }));
      } else {
        // If vaccinationsClients is undefined, set it to an empty array
        client.vaccinationsClients = [];
      }
      client.clientId = this.client?.clientId;

      this.subscriber.add(
        (this.isNew ? this.clientsService.addClient(this.patientsForm.value) :
          this.clientsService.updateClient(this.patientsForm.value)).
          subscribe({
            next: () => {
              alert('The patient saved successfuly');
              this.back();
            },
            error: err => alert('An error occurred, please try again later...')
          }));
    }
  }


  back() {
    this.router.navigate(['clients']);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
