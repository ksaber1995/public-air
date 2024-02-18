import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, of } from "rxjs";

export enum Lang {
  ar = 'ar',
  en = 'en'
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    
  }

  getCurrentLanguage(): Observable<Lang> {
    const lang: Lang = this.route.snapshot.queryParams?.['lang'] as Lang
    
    if (!lang) this.router.navigate([], { queryParams: { lang: 'ar' } })

    return this.route.queryParams.pipe(map(res => {
      
      const lang: Lang = res?.['lang'] as Lang

      if (!lang) {
        return Lang.ar
      }

      return lang
    }))

    // return this.route.queryParamMap.
  }



}

