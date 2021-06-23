import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../core/class/base.service';
import { IClientsModel } from '../models/clients.model';

@Injectable({
    providedIn: 'root'
})
export class ClientsService extends FirebaseService<IClientsModel> {

    constructor(public readonly firestore: AngularFirestore) {
        super('clients', firestore);
    }
    
}
