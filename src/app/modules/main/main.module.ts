import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';
import { StationMarkerComponent } from './components/station-marker/station-marker.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    SeverityBarComponent,
    StationMarkerComponent
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    GoogleMapsModule,
    SharedModule

  ]
})
export class MainModule { }
