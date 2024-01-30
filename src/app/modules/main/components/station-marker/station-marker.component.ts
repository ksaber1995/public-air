import { Component, Input, NgZone } from '@angular/core';
import { ExtendedStation, Station } from '../../../shared/models/Station';

@Component({
  selector: 'app-station-marker',
  templateUrl: './station-marker.component.html',
  styleUrl: './station-marker.component.scss'
})
export class StationMarkerComponent {
  @Input() position: google.maps.LatLngLiteral | undefined;
  @Input() label: string | undefined;
  @Input() station : ExtendedStation;
  
  ngOnInit(): void {
    this.addMarker();
  }

  private addMarker(): void {
    if (this.position) {
      const marker = new google.maps.Marker({
        position: this.position,
        map: new google.maps.Map(document.createElement('div')),
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="3" fill="#ff0000"/></svg>'),
          scaledSize: new google.maps.Size(30, 30),
        },
      });

      const overlay = new google.maps.OverlayView();
      overlay.draw = () => {
        const projection = overlay.getProjection();
        if (projection) {
          const position = projection.fromLatLngToDivPixel(this.position);
          const element = this.getElement();
          if (element) {
            element.style.left = position.x - 15 + 'px'; // Adjust for marker width
            element.style.top = position.y - 30 + 'px';  // Adjust for marker height
          }
        }
      };
      overlay.setMap(marker.getMap());
    }
  }

  private getElement(): HTMLElement | null {
    return document.querySelector('.custom-marker');
  }
}
