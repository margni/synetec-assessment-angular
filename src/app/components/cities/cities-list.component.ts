import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ICity } from "../../models/city.model";
import {CitiesService} from '../../services/cities/cities.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'cities-list',
    templateUrl: './cities-list.component.html',
    styleUrls: ['./cities-list.component.css']
})

export class CitiesListComponent implements OnInit, OnDestroy{

    @ViewChild('modal') public modal: TemplateRef<any>;

    modalRef?: NgbModalRef;
    subscription;
    cities: ICity[];

    constructor(private _citiesService: CitiesService, private _modalService: NgbModal) {}

    ngOnInit(): void {
        this.subscription = this._citiesService.getObservable().subscribe((cities) => this.cities = cities);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    delete(city: ICity) {
        this.modalRef = this._modalService.open(this.modal);
        this.modalRef.result.then(() => {
            this._citiesService.deleteCity(city);
        }, () => {});
    }
}
