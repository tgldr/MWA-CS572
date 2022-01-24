import { Component, OnInit } from '@angular/core';
import { TheatersDataService } from '../theaters-data.service';

class Address {
  #street1!: string;
  #city!: string;
  #state!: string;
  #zipcode!: string;
  get street1() {
    return this.#street1;
  }
  get city() {
    return this.#city;
  }
  get state() {
    return this.#state;
  }
  get zipcode() {
    return this.#zipcode;
  }
  set street1(street: string) {
    this.#street1 = street;
  }
  set city(city: string) {
    this.#city = city;
  }
  set state(state: string) {
    this.#state = state;
  }
  set zipcode(zipcode: string) {
    this.#zipcode = zipcode;
  }
}

class Geo {
  #type!: string;
  #coordinates!: number[];
  get type() {
    return this.#type;
  }
  get coordinates() {
    return this.#coordinates;
  }
  set type(type: string) {
    this.#type = type;
  }
  set coordinates(coordinates: number[]) {
    this.#coordinates = coordinates;
  }
}

class Location {
  #address!: Address;
  #geo!: Geo;
  get address() {
    return this.#address;
  }
  get geo() {
    return this.#geo;
  }
  set address(address: Address) {
    this.#address = address;
  }
  set geo(geo: Geo) {
    this.#geo = geo;
  }
}
export class Theater {
  #_id!: string;
  #theaterId!: number;
  #location!: Location;
  get _id() {
    return this.#_id;
  }
  get theaterId() {
    return this.#theaterId;
  }
  get location() {
    return this.#location;
  }
  get street1() {
    return this.#location.address.street1;
  }
  get city() {
    return this.#location.address.city;
  }
  get state() {
    return this.#location.address.state;
  }
  get zipcode() {
    return this.#location.address.zipcode;
  }
  get latitude() {
    return this.#location.geo.coordinates[1];
  }
  get longitude() {
    return this.#location.geo.coordinates[0];
  }
  set _id(_id: string) {
    this.#_id = _id;
  }
  set theaterId(theaterId: number) {
    this.#theaterId = theaterId;
  }
  set location(location: Location) {
    this.#location = location;
  }
  set street1(street: string) {
    this.#location.address.street1 = street;
  }
  set city(city: string) {
    this.#location.address.city = city;
  }
  set state(state: string) {
    this.#location.address.state = state;
  }
  set zipcode(zipcode: string) {
    this.#location.address.zipcode = zipcode;
  }
  set latitude(latitude: number) {
    this.#location.geo.coordinates[1] = latitude;
  }
  set longitude(longitude: number) {
    this.#location.geo.coordinates[0] = longitude;
  }
  constructor(theater: any) {
    this.#_id = theater._id;
    this.#theaterId = theater.theaterId;
    this.#location = theater.location;
  }
}

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css'],
})
export class TheatersComponent implements OnInit {
  theaters!: Theater[];
  offset: number = 0;
  count: number = 5;
  counts: number[] = [5, 10, 15, 20];
  state: string = 'ALL';
  states: string[] = ['ALL'];

  constructor(private theaterService: TheatersDataService) {}

  ngOnInit(): void {
    this._getStates();
    this._getMovies();
  }

  private fillTheatersFromService(theaters: Theater[]) {
    this.theaters = theaters;
  }

  private _getMovies(): void {
    this.theaterService
      .getTheaters(this.offset, this.count, this.state)
      .then((response) => this.fillTheatersFromService(response));
  }

  private _getStates(): void {
    this.theaterService.getStates().then((response) => {
      this.states = [this.state, ...response];
    });
  }

  getPrev(): void {
    if (this.offset > 0) {
      this.offset--;
    }

    this._getMovies();
  }

  getNext(): void {
    this.offset++;

    this._getMovies();
  }

  onChange(): void {
    this._getMovies();
  }
}
