import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { ExtendedStation } from '../../../shared/models/Station';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-station-marker',
  template: '',
  // templateUrl: './station-marker.component.html',
  styleUrl: './station-marker.component.scss'
})
export class StationMarkerComponent {
  @Input() stations : ExtendedStation[]
  
  markerOptions: google.maps.MarkerOptions = {
    clickable: true,
    // animation: google.maps.Animation.BOUNCE
    zIndex: 5000
  };

  constructor() {}

  ngOnInit(): void {
  
    console.log('here')
  }

   
  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker, false );
  }

  public closeInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    // infoWindow.close();

    // marker.cl 
  }

}
