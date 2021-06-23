/* eslint-disable */
export interface IEntity<TIdentity> {
  id?: TIdentity;
}

export enum EServiceState {
  Browse,
  Update,
  Load,
  Cancel
}
