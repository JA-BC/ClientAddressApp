import { IEntity } from "../core/interfaces/service.model";

export interface IClientsModel extends IEntity<string> {
    name: string;
    active: boolean;
    address: IAddressModel[];
}

export interface IAddressModel {
    id: string | number;
    name: string;
}
