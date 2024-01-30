import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  navigatorPosition
  public options: google.maps.MapOptions

  
  constructor() {
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
}
