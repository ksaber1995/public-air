import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { arContent } from "../../../lang/ar";
import { enContent } from "../../../lang/en";

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

  toggleLang(){
    
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


  getCurrentContent(){
   const lang$ = this.getCurrentLanguage()

   return lang$
    .pipe(map(lang=>{
      const content = lang === Lang.ar ? arContent : enContent;

      return content;
    }))
    
  }

}

