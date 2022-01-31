import { Component, OnInit } from '@angular/core';
import { InspectionsDataService } from '../inspections-data.service';

export class Inspection {
  #_id!: string;
  #business_name!: string;
  #date!: Date;
  #result!: string;
  #address!: { city: string; zip: number };

  get _id() {
    return this.#_id;
  }

  get business_name() {
    return this.#business_name;
  }

  get date() {
    return this.#date;
  }
  get result() {
    return this.#result;
  }
  get address() {
    return this.#address;
  }

  constructor(inspection: any) {
    this.#_id = inspection.id;
    this.#business_name = inspection.business_name;
    this.#result = inspection.result;
    this.#address = inspection.address;
  }
}

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css'],
})
export class InspectionsComponent implements OnInit {
  inspections!: Inspection[];
  offset: number = 0;
  #count: number = 5;

  set count(count: string) {
    this.#count = parseInt(count, 10);
  }

  get count(): string {
    return this.#count + '';
  }
  isOffsetZero: boolean = true;

  constructor(private inspectionsService: InspectionsDataService) {}

  ngOnInit(): void {
    this.inspectionsService
      .getInspections(this.offset, this.#count)
      .then((response) => this.fillInspectionsFromService(response));
  }

  private fillInspectionsFromService(inspections: Inspection[]) {
    this.inspections = inspections;
  }

  prev(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.#count;
    }

    if (this.offset <= 0) {
      this.offset = 0;
      this.isOffsetZero = true;
    }

    this.ngOnInit();
  }

  next(): void {
    this.offset = this.offset + this.#count;
    this.isOffsetZero = false;
    this.ngOnInit();
  }
}
