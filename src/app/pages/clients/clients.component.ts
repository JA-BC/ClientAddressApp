import { Component, OnInit, TemplateRef } from '@angular/core';
import { EServiceState } from '@app/core/interfaces/service.model';
import { IClientsModel } from '@app/models/clients.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/providers/clients.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    page = 1;

    constructor(
        public readonly service: ClientsService,
        private readonly modal: NgbModal
    ) { }

    ngOnInit() {
        // Prepare initial data to be consumed by 'service.entities'
        this.service.load();
    }

    async openFormAsync(content: TemplateRef<unknown>) {
        try {
            await this.modal.open(content, {
                size: 'xl',
                backdrop: 'static',
                keyboard: false
            }).result;
        } catch {
            // Do somenthing when modal dismiss
        }
    }

    editClient(content: TemplateRef<unknown>, model: IClientsModel) {
        this.service.model = Object.assign({}, model);
        this.service.onStateChange(EServiceState.Update);
        this.openFormAsync(content);
    }

    deleteClient(model: IClientsModel) {
        if (confirm('Eliminar registro. ¿Estas seguro?')) {
            this.service.delete(model);
        }
    }

}