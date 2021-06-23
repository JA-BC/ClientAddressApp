import { IEntity } from "../core/interfaces/service.model";

export interface IClientsModel extends IEntity<string> {
    name: string;
    status: any;
}
