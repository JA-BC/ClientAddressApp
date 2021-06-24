import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EServiceState } from '@app/core/interfaces/service.model';
import { IClientsModel } from '@app/models/clients.model';
import { ClientsService } from '@app/providers/clients.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-clients-form',
    templateUrl: './form.component.html'
})
export class ClientsFormComponent implements OnInit, OnDestroy {

    @Input() modalRef: NgbModalRef;

    page = 1;

    constructor(
        public readonly service: ClientsService
    ) { }

    ngOnInit() {
        if (!this.service.editing) this.service.model.active = true; // Default
    }


    addAddress(input: HTMLInputElement) {
        const { value } = input;

        if (value?.trim() === '') {
            return;
        }

        // Initialize address array
        if (!this.service.model.address) {
            this.service.model.address = [];
        }

        const exists = this.service.model.address.find(x => x.name.toLowerCase() === value.toLowerCase());

        if (!exists) {
            const id = this.service.model.address.length;

            this.service.model.address.push({
                id,
                name: value
            });
        }

        input.value = ''; // Clear input
        input.focus();
    }

    deleteAddress(id: string | number) {
        // It need to press save to apply changes in firebase
        if (confirm('Eliminar esta dirección. ¿Estas seguro?')) {
            this.service.model.address = [...this.service.model.address.filter(x => x.id !== id)];
        }
    }

    save() {
        if (this.service.editing) {
            // Selected client id is set to 'service.model' when is clicked in table
            this.service.update(this.service.model.id, this.service.model as IClientsModel);   
        } else {
            this.service.add();
        }

        this.modalRef.close();
    }

    ngOnDestroy() {
        this.service.model = {};

        if (this.service.editing) {
            this.service.onStateChange(EServiceState.Browse);
        }
    }
}
