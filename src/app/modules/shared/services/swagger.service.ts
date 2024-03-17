import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AqiData, ExtendedStation, HistoryData, Station } from '../models/Station';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { VariablesCodes } from './../models/variables';
import { convertToUTC4 } from './utilities/date';
import { Contact, ContactWithToken } from '../models/Contact';


const BaseUrl = 'https://graphql.naqi.dal2.com/api/rest/v1/public'
interface StationsResponse {
  stations: ExtendedStation[]
}

interface HistoryResponse {
  stations: HistoryData[]
}

export function getRandomNumber(max = 1000) {
  return Math.ceil(Math.random() * max)
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

  getStations(): Observable<ExtendedStation[]> {
    const url = BaseUrl + '/stations'

    return this.http.get(url).pipe(
      map((res: StationsResponse) => res.stations.map(res => {
        const temp = res.weather.find(item => item.variable.code === VariablesCodes.TEMP);
        const wind = res.weather.find(item => item.variable.code === VariablesCodes.WIND);
        const hum = res.weather.find(item => item.variable.code === VariablesCodes.HUM);
        const PM25 = res.aqi.find(item => item.variable.code === VariablesCodes.PM25);
        const PM10 = res.aqi.find(item => item.variable.code === VariablesCodes.PM10);

        return {
          ...res,

          brief: {
            [VariablesCodes.AQI]: {
              color: res.aqi[0].color,
              sequence: res.aqi[0].sequence || 0,
              iconPath: 'assets/icons/marker/' +
                (res.aqi[0].sequence || 0)
                + '.svg'
            },
            [VariablesCodes.PM25]: {
              color: PM25?.color,
              sequence: PM25?.sequence || 0,
              iconPath: 'assets/icons/marker/' +
                (PM25?.sequence || 0) + '.svg'

            },
            [VariablesCodes.PM10]: {
              color: PM10?.color,
              sequence: PM10?.sequence || 0,
              iconPath: 'assets/icons/marker/' +
                (PM10?.sequence || 0) + '.svg'
            },

            [VariablesCodes.TEMP]: {
              label: temp?.readings[0].value ? temp?.readings[0].value + '' : 'NA',
              // color: ColorsSequence[Math.floor(Math.random() * 6)],
              color: '#fff',
              iconPath: 'assets/icons/marker/wrapper.svg',

              class: 'custom-map-label wind-label'

            },

            [VariablesCodes.WIND]: {
              label:  ' ' ,
              // isDegree: true,
              color: '#fff',

              iconPath: 'assets/icons/arrowDown.svg',
              // class: 'centered-label',
              // class: 'custom-map-label wind-label ' + WindClassesSequence[wind?.readings[0]?.value ? Math.floor(wind?.readings[0]?.value / 60) : 0]
              class: 'custom-arrow ' + 'rounded-label-' + (wind?.readings[0]?.value ? Math.floor(wind?.readings[0]?.value) : 0)
            },

            [VariablesCodes.HUM]: {
              label: hum?.readings[0]?.value ? hum?.readings[0]?.value + '' : 'NA',
              // color: ColorsSequence[Math.floor(Math.random() * 6)],
              color: '#fff',
              iconPath: 'assets/icons/marker/wrapper.svg',
              // class: 'custom-map-label',
              class: 'custom-map-label wind-label ' ,
            },
          }
        }
      }
      )), shareReplay())
  }

  getHistory(code: string): Observable<HistoryData[]> {
    const url = BaseUrl + '/stations/' + code + '/history'

    return this.http.get<any>(url).pipe(map(res => res.stations[0]))
      .pipe(map(station => {

        const dates = {}

        station.aqi.forEach(item => {
          const date = convertToUTC4( new Date(item.aggregated_at))
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          const day = date.getDate()

          const obj = year + '-' + month + '-' + day

          if (dates[obj]) {
            dates[obj].push(item)
          } else {
            dates[obj] = [item]
          }
        })


        const datesArray: { date: string, data: AqiData[] }[] = Object.entries(dates).map(([key, value]) => ({ date: key, data: value as AqiData[] }));


        station.variables.forEach(variable => {
          const v_dates = {}
          variable.readings.forEach(read => {

            const v_date = convertToUTC4( new Date(read.aggregated_at))
            const v_year = v_date.getFullYear()
            const v_month = v_date.getMonth() + 1
            const v_day = v_date.getDate()
            const v_obj = v_year + '-' + v_month + '-' + v_day

            if (v_dates[v_obj]) {
              v_dates[v_obj].push(read)
            } else {
              v_dates[v_obj] = [read]
            }


          })

          console.log(v_dates,'dates')

          variable.dates = Object.entries(v_dates).map(([key, value]) => ({ date: key, data: value as AqiData[] }));
        })



        return { ...station, dates: datesArray }
      }))

  }



  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = BaseUrl + '/breakpoints'

    return this.http.get<BreakPointsResponse>(url)
  }

  contactUs(body: ContactWithToken){
    // 1- call goolge caput
    // 2- get taken
    // generate ContactWith capture // post
    //
   return  this.http.post('https://functions.naqi.dal2.com/v2/feedback/validate', body);
  }

  requestData(body){
    return this.http.post('https://functions.naqi.dal2.com/v2/data-access/validate', body);

  }
}

