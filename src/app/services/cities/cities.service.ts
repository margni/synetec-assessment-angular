import { Injectable } from "@angular/core";
import { CitiesEndpoint } from "./cities-endpoint.service";
import { ICity } from "../../models/city.model";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CitiesService {
    private _cities = new BehaviorSubject<ICity[]>(null);

    constructor(private _citiesEndpoint: CitiesEndpoint) {}

    public getObservable(fetch = true) {
        if (fetch) {
            this._citiesEndpoint.get().toPromise().then((cities) => this._cities.next(cities));
        }

        return this._cities.asObservable();
    }

    public deleteCity(city: ICity) {
        // assume delete will succeed and remove it before the request resolves.
        this._cities.next(this._cities.getValue().filter((iCity) => iCity.id !== city.id));
        // Actually dont delete as the API is broken.
    }
}
