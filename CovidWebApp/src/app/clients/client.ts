import { Creator } from "./creator";

export interface Client {
    clientId: number;
    firstName: string;
    lastName: string;
    identity: string;
    city: string;
    street: string;
    buildingNumber: number;
    phoneNumber: string;
    mobileNumber: string;
    recoveryDate:Date;
    positiveResultDate:Date;
    imagePath:string;
    vaccinationsClients:VaccinationsClients[];
}
interface VaccinationsClients {
    id: number;
    clientId: number;
    creatorId: number;
    vaccinationDate:Date;
    vaccinationCounter:number;
    creator:Creator;
}
