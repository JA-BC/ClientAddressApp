import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { ClientsService } from 'src/app/providers/clients.service';

import { ClientsComponent } from './clients.component';

const routes: Routes = [
    {
        path: '',
        component: ClientsComponent
    }
];

@NgModule({
    declarations: [ClientsComponent],
    imports: [
        CommonModule,
        AngularFirestoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [ClientsService],
})
export class ClientsModule { }
