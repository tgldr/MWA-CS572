import { Component, OnInit } from '@angular/core';
import { TheatersDataService } from '../theaters-data.service';
import { Theater } from '../theaters/theaters.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  latitude!: number;
  longitude!: number;
  distance!: number;
  theaters!: Theater[];
  constructor(private theaterService: TheatersDataService) {}

  ngOnInit(): void {}

  private getMovies(): void {
    this.theaterService.getTheatersByLocation(
      this.longitude,
      this.latitude,
      this.distance
    );
  }

  onClick(): void {
    this.getMovies();
  }
}
