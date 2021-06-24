import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/providers/clients.service';

import { ClientsComponent } from './clients.component';
import { ClientsFormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '',
        component: ClientsComponent
    }
];

@NgModule({
    declarations: [
        ClientsComponent,
        ClientsFormComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        AngularFirestoreModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [ClientsService],
})
export class ClientsModule { }
