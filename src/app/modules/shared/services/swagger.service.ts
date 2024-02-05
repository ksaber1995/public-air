import { VariableIds } from './../models/variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtendedStation, Station } from '../models/Station';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { ColorsSequence } from '../models/colors';

const BaseUrl = 'https://rm.adv3.com/naqi/v1/public'

interface StationsResponse {
  stations: ExtendedStation[]
}


interface BreakPointsResponse {
  aqi_breakpoints: BreakPoint[]
  variables_breakpoints: VariableBreakPoint[]

}


@Injectable({
  providedIn: 'root'
})
export class SwaggerService {
  constructor(private http: HttpClient) { }

  getStations() {
    const url = BaseUrl + '/stations'

    return this.http.get(url).pipe(
      map((res: StationsResponse) => res.stations.map(res => {
        const temp = res.weather.find(item=> item.variable.abbreviation_en === 'AT');
        const wind = res.weather.find(item=> item.variable.abbreviation_en === 'WD');

        return {
          ...res,
          position: {
            lng: +res.coordinates.split(',')[0]?.substring(1),
            lat: +res.coordinates.split(',')[1]?.slice(0, -1)
          },
          sequences:{
            [VariableIds.AQI]: res.aqi[0]?.status[0]?.sequence || 0,
            [VariableIds.PM10]: res.variables.find(variable=> variable?.variable?.abbreviation_en === 'PM₁₀')?.readings[0]?.status[0]?.sequence || 0,
            [VariableIds.PM25]: res.variables.find(variable=> variable?.variable?.abbreviation_en === 'PM₂.₅')?.readings[0]?.status[0]?.sequence || 0
          },
          labels:{
            [VariableIds.TEMP] : {
              label:  temp?.readings[0]?.average ? temp?.readings[0]?.average  + ' °C' : 'NA',
            },
            [VariableIds.WIND] : {
              label:  wind?.readings[0]?.average ? Math.floor(wind?.readings[0]?.average)  + ''   : 'NA', // it Must be string
              isDegree: true,
              class: 'wind-label'
            }
          }
        }
      }
      )), shareReplay())
  }

  getStation(id: string) {
    const url = BaseUrl + '/stations/' + id

    return this.http.get(url)
  }


  getBreakPointsStations(){
    const stations$ = this.getStations();
    const breakPoints$ = this.getBreakPoints();

    combineLatest([stations$, breakPoints$])
      .pipe(map(([stations, breakpoints])=>{

        const mappedStations = stations.map(res=>{
            const temp = res.weather.find(item=> item.variable.abbreviation_en === 'AT');

           return {
            ...res,
            position: {
              lng: +res.coordinates.split(',')[0]?.substring(1),
              lat: +res.coordinates.split(',')[1]?.slice(0, -1)
            },
            sequences:{
              [VariableIds.AQI]: res.aqi[0]?.status[0]?.sequence || 0,
              [VariableIds.PM10]: res.variables.find(variable=> variable?.variable?.abbreviation_en === 'PM₁₀')?.readings[0]?.status[0]?.sequence || 0,
              [VariableIds.PM25]: res.variables.find(variable=> variable?.variable?.abbreviation_en === 'PM₂.₅')?.readings[0]?.status[0]?.sequence || 0
            },
            labels:{
              [VariableIds.TEMP] : {
                label:  temp?.readings[0]?.average + ' °C' ,
                // color: breakpoints.,
              }
            }
          }
        })


      }))
  }

  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = BaseUrl + '/breakpoints'

    return this.http.get<BreakPointsResponse>(url)
  }
}

