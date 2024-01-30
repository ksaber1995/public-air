import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { ExtendedStation, Station } from '../../../shared/models/Station';
import { GoogleMap } from '@angular/google-maps';

const content = '<div class="marker-koko" style="background-color: yellow; padding: 52px;">Custom HTML</div>' ;
@Component({
  selector: 'app-station-marker',
  template: '',
  // templateUrl: './station-marker.component.html',
  styleUrl: './station-marker.component.scss'
})
export class StationMarkerComponent {
  content: string | undefined = content;
  top: number = 100; // Adjust as needed
  left: number = 100; // Adjust as needed

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const overlay = new google.maps.OverlayView();
      overlay.draw = this.drawOverlay.bind(this);
      overlay.setMap((window as any).map);
    });
  }

  drawOverlay(): void {
    const projection = this.getProjection();
    if (projection) {
      const position = projection.fromContainerPixelToLatLng(new google.maps.Point(this.left, this.top));
      const element = this.el.nativeElement.firstChild as HTMLElement;
      const point = projection.fromLatLngToDivPixel(position);
      
      element.style.top = point.y + 'px';
      element.style.left = point.x + 'px';
    }
  }

  private getProjection(): google.maps.MapCanvasProjection | null {
    const overlay = this.getOverlay();
    return overlay ? overlay.getProjection() : null;
  }

  private getOverlay(): google.maps.OverlayView | null {
    return new google.maps.OverlayView();
  }
}
