import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtendedStation, Station } from '../models/Station';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';

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
      map((res: StationsResponse) => res.stations.map(res => ({ ...res, position: { lng: +res.coordinates.split(',')[0]?.substring(1), lat: +res.coordinates.split(',')[1]?.slice(0, -1) } }))), shareReplay())
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

