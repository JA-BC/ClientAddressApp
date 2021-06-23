import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
            }
        ]
    }
];

@NgModule({
    declarations: [PagesComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class PagesModule { }
