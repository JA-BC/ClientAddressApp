/* eslint-disable */
import { EServiceState, IEntity } from '../interfaces/service.model';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
import * as firebare from 'firebase';

/**
 * Firebase class to implements intial logic for service using firebase
 * take two arguments `collectionName` and `firestore` this last is an AngularFirestore Service
 */
export class FirebaseService<TModel extends IEntity<string>> {

    protected readonly _onState$ = new Subject<EServiceState>();
    protected readonly _onError$ = new Subject<Error | HttpErrorResponse>();

    readonly onError: Observable<Error | HttpErrorResponse> = this._onError$.asObservable();
    readonly SERVICE_STATE = EServiceState;

    state: EServiceState = EServiceState.Browse;

    get loading() {
        return this.state === this.SERVICE_STATE.Load;
    }

    get editing() {
        return this.state === this.SERVICE_STATE.Update;
    }

    onAdded = new Subject<TModel>();
    onDeleted = new Subject<TModel>();
    onLoaded = new Subject<Observable<TModel[]>>();

    model: Partial<TModel> = { };
    entities: Observable<TModel[]>;
    collection: AngularFirestoreCollection;

    constructor(
        protected readonly collectionName: string,
        protected readonly firestore: AngularFirestore
    ) {
        this.collection = this.firestore.collection<TModel>(this.collectionName);
    }

    async add(model?: TModel): Promise<TModel> {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({ id: this.firestore.createId() }, this.model, model);
            this.collection.add(item);
            this.onAdded.next(item);
            return item;
        } catch(e) {
            this._onError$.next(e);
            console.error('[SERVICE_ADD_ERROR]', e);
            return Promise.reject(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    requery(id: string) {
        return this.firestore.collection<TModel>(this.collectionName).doc(id).get();
    }

    load(queryFn?: QueryFn<firebase.default.firestore.DocumentData>) {
        return this.entities = this.firestore.collection<TModel>(this.collectionName, queryFn).snapshotChanges()
            .pipe(
                tap(() => this.onStateChange(EServiceState.Load)),
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as TModel;
                    // data.id = a.payload.doc.id; // Enable to get firebase doc id
                    return data;
                })),
                tap(() => this.onLoaded.next(this.entities)),
                tap(() => this.onStateChange(EServiceState.Browse)),
                catchError((e) => {
                    this._onError$.next(e);
                    console.error('[SERVICE_LOAD_ERROR]', e);
                    return throwError(e);
                }),
                finalize(() => this.onStateChange(EServiceState.Browse))
            );
    }

    async update(id: string, model?: TModel): Promise<TModel> {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            await this.collection.doc(id).set(model);
            return item;
        } catch(e) {
            this._onError$.next(e);
            console.error('[SERVICE_UPDATE_ERROR]', e);
            return Promise.reject(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }


    async delete(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item = Object.assign({}, this.model, model);
            const doc = this.firestore.doc(`${this.collectionName}/${item.id}`);
            await doc.delete();
            this.onDeleted.next(model);
            return model;
        } catch(e) {
            this._onError$.next(e);
            console.error('[SERVICE_DELETE_ERROR]', e);
            return Promise.reject(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    onStateChange(state: EServiceState): EServiceState {
        if (state === this.state) {
            return;
        }

        console.log('[BASE_SERVICE_CHANGE_STATE]',
            '\nBEFORE: '+EServiceState[this.state],
            '\nAFTER: '+EServiceState[state],
            '\nSERVICE: '+Object.getPrototypeOf(this).constructor.name);
        this._onState$.next(state);
        this.state = state;
        return state;
    }

}
