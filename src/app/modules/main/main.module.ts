import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';


@NgModule({
  declarations: [
    HomeComponent,
    SeverityBarComponent
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    GoogleMapsModule,

  ]
})
export class MainModule { }
