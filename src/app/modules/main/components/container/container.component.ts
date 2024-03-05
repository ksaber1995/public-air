import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { LocalizationService } from '../../../shared/services/localization.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit {
  isLoading: boolean = true;
  constructor(
    private localization: LocalizationService,

    
  ) { }

  ngOnInit(): void {

    this.localization.getCurrentLanguage().pipe(delay(1000))
      .subscribe(res => {
        // ar en 
        this.loadGoogleMapsScript(res)
      })
    this.setLangs()
  }


  loadGoogleMapsScript(language: string) { // ar en
    this.isLoading = true
    
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDQ3S08D_41Ll3a2GjTE28KGQR-G6XvmM&libraries=places&language=${language}`;
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Google Maps API loaded successfully
      // You can initialize your map here if needed
      this.isLoading = false;
    };

    script.onerror = () => {
      console.error('Error loading Google Maps API script.');
    };

    document.body.appendChild( script);

  }

  setLangs() {
    this.localization.getCurrentLanguage().subscribe(lang => {
      const title = document.getElementById('app-title');
      const body = document.getElementById('app-body');


      const html = document.getElementById('main-html');

      if (lang === 'ar') {
        title.innerText = 'نقي'
        body.className = 'rtl-body'
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'ar')

      } else {
        title.innerText = 'NAQI'
        body.className = 'ltr-body'
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')

      }
    })
  }
}
