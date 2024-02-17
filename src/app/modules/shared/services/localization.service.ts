import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";

export enum Lang {
  ar = 'ar',
  en = 'en'
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  constructor(private route : ActivatedRoute) { }

  getCurrentLanguage(): Observable<Lang>{
    const lang : Lang  = this.route.snapshot.queryParamMap.get('lang') as Lang
    if(!lang){
      return of(Lang.ar)
    }
    
    return of(lang)
    // return this.route.queryParamMap.
  }


  getCurrentLanguageValue(): Lang{
    const lang : Lang  = this.route.snapshot.queryParamMap.get('lang') as Lang
    return Lang.ar;
    
    if(!lang){
      return Lang.ar
    }
    
    return lang
    // return this.route.queryParamMap.
  }


}

