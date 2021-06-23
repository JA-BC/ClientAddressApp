import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: []
    }
];

@NgModule({
    declarations: [PagesComponent],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class PagesModule { }
