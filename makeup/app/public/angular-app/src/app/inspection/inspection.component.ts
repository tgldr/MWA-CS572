import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionsDataService } from '../inspections-data.service';
import { Inspection } from '../inspections/inspections.component';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css'],
})
export class InspectionComponent implements OnInit {
  inspection: Inspection = new Inspection({
    _id: '',
    business_name: '',
    result: '',
    address: {},
  });
  constructor(
    private InsectionService: InspectionsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const inspectionId: string = this.route.snapshot.params['inspectionId'];
    this.InsectionService.getInspection(inspectionId).then((response) =>
      this.fillInspectionFromService(response)
    );
  }

  private fillInspectionFromService(inspection: Inspection) {
    this.inspection = inspection;
  }

  onDelete(inspectionId: string) {
    this.InsectionService.deleteInspection(inspectionId).then((response) =>
      this.router.navigate(['inspections'])
    );
  }
}
