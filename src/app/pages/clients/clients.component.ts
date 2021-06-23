import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/providers/clients.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    constructor(
        public readonly service: ClientsService
    ) { }

    ngOnInit() {
        // Prepare initial data to be consumed by 'service.entities'
        this.service.load();
    }
}