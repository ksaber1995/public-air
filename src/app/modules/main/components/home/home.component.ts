import { Component, OnInit, ViewChild } from '@angular/core';
import { SwaggerService } from '../../../shared/services/swagger.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  navigatorPosition
  public options: google.maps.MapOptions
  stations$ = this.swagger.getStations()
  breakPoints$ = this.swagger.getBreakPoints()
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;


  
  constructor(private swagger: SwaggerService) {
    // navigator.geolocation.getCurrentPosition((position) => {
      // this.navigatorPosition = position;
      // console.log('here', this.navigatorPosition.coords.latitude)

      this.options = {
        center: {
          lat: 23.8859,
          lng: 45.0792
          // lng: this.navigatorPosition.coords.longitude,
        },
        // zoomControl: true,
        mapTypeControl: false,
        zoom: 7,
        mapTypeId: 'terrain', // Use 'terrain' map type to emphasize borders

        streetViewControl: false,
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { color: '#96cccb99' }


            ]
          },
          // {
          //   "featureType": "landscape",
          //   "elementType": "geometry",
          //   "stylers": [

          //     { color: '#86b4b380' }

          //   ]
          // }
        ]
      };
    // })
  }


  infoWindowOptions: google.maps.InfoWindowOptions = {
    pixelOffset: { width: 0, height: -30 , equals(other) {
      return this.width === other.width && this.height === other.height;
    }, }, // Adjust the position of the info window relative to the marker
  };

  openInfoWindow(point: any): void {
    debugger
    point.open();
  }

  cursorChanged(e){
    console.log(e,'koko')
  }



  ngOnInit(): void {
    this.stations$.subscribe(res=>{
      console.log(res,'stations')
    })
  }
}
