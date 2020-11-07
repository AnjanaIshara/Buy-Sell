import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  latitude = 6.9271;
  longitude = 79.8612;
  constructor(private _sharedservice:SharedService) { 
    this.latitude=_sharedservice.getLatlng()[0];
    this.longitude=_sharedservice.getLatlng()[1];
    
  }

  ngOnInit(): void {
  }

}
