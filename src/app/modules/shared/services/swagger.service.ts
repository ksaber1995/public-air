import {  VariablesCodes } from './../models/variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtendedStation, Station } from '../models/Station';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { WindClassesSequence, ColorsSequence } from '../models/colors';

const BaseUrl = 'https://rm.adv3.com/naqi/v1/public'
interface StationsResponse {
  stations: ExtendedStation[]
}


export interface BreakPointsResponse {
  aqi_breakpoints: BreakPoint[]
  variables: VariableBreakPoint[]

}


@Injectable({
  providedIn: 'root'
})
export class SwaggerService {
  constructor(private http: HttpClient) { }

  getStations()  : Observable<ExtendedStation[]> {
    const url = BaseUrl + '/stations'

    return this.http.get(url).pipe(
      map((res: StationsResponse) => res.stations.map(res => {
        const temp = res.weather.find(item=> item.variable.code === VariablesCodes.TEMP);
        const wind = res.weather.find(item=> item.variable.code === VariablesCodes.WIND);
        const hum = res.weather.find(item=> item.variable.code === VariablesCodes.HUM);

        debugger
        return {
          ...res,

          brief:{
            [VariablesCodes.AQI]: {color: res.aqi[0].color, sequence : res.aqi[0].sequence || 0}, 
            [VariablesCodes.PM25]: {color: res.aqi.find(item=> item?.variable?.code === VariablesCodes.PM25)?.color, sequence : res.aqi.find(item=> item?.variable?.code === 'PM25')?.sequence || 0},
            [VariablesCodes.PM10]: {color:  res.aqi.find(item=> item?.variable?.code === VariablesCodes.PM10)?.color, sequence : res.aqi.find(item=> item?.variable?.code === 'PM10')?.sequence || 0},


            [VariablesCodes.TEMP] : {
              label:  temp?.readings[0].value ? temp?.readings[0].value  + temp?.unit.abbreviation_en : 'NA',
              color:   ColorsSequence [ Math.floor(Math.random() * 6) ],
              class: 'custom-map-label'
            },

            [VariablesCodes.WIND] : {
              label:  wind?.readings[0]?.value ? Math.floor(wind?.readings[0]?.value)  + ''   : 'NA', // it Must be string
              isDegree: true,
              color: '#fff', 
              class: 'custom-map-label wind-label ' + WindClassesSequence[wind?.readings[0]?.value ? Math.floor(wind?.readings[0]?.value / 60) : 0]
            },

            [VariablesCodes.HUM] : {
              label:   hum?.readings[0]?.value ? hum?.readings[0]?.value  + hum?.unit.abbreviation_en : 'NA',
              color:  ColorsSequence [ Math.floor(Math.random() * 6) ],
              class: 'custom-map-label'
            },
          },

         
        } 
      }
      )), shareReplay())
  }

  getStation(id: string) {
    const url = BaseUrl + '/stations/' + id

    return this.http.get(url)
  }



  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = BaseUrl + '/breakpoints'

    return this.http.get<BreakPointsResponse>(url)
  }
}

