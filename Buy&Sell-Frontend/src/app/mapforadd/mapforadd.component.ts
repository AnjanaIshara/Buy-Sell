import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapforadd',
  templateUrl: './mapforadd.component.html',
  styleUrls: ['./mapforadd.component.css']
})
export class MapforaddComponent implements OnInit {

  latitude = 6.9271;
  longitude = 79.8612;
  constructor() { 
    this.latitude = 6.9271;
  this.longitude = 79.8612;
  }

  ngOnInit(): void {
  }

}
