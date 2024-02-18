import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';
import { StationMarkerComponent } from './components/station-marker/station-marker.component';
import { SharedModule } from '../shared/shared.module';
import { TabComponent } from './components/tab/tab.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeComponent,
    SeverityBarComponent,
    StationMarkerComponent,
    TabComponent,
    StationDetailsComponent,
    HistoryChartComponent,
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    GoogleMapsModule,
    SharedModule,
    NgChartsModule

  ]
})
export class MainModule { }
