import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { arContent } from "../../../lang/ar";
import { enContent } from "../../../lang/en";
import { CookieService } from "ngx-cookie-service";

export enum Lang {
  ar = 'ar',
  en = 'en'
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService implements OnInit {
  lang$ = new BehaviorSubject(this.cookieService.get('lang') as Lang || Lang.ar)

  constructor(private route: ActivatedRoute, private router: Router,  private cookieService: CookieService) {
  }



  ngOnInit(): void {
    
  }

 
  getCurrentLanguage(): Observable<Lang> {
    return this.lang$.asObservable();
  }

  getCurrentContent(){
   const lang$ = this.getCurrentLanguage()

   return lang$
    .pipe(map(lang=>{
      const content = lang === Lang.ar ? arContent : enContent;

      return content;
    }))
    
  }

  setLang(lang){
    this.cookieService.set('lang', lang)
    this.lang$.next(lang)
  }


}

