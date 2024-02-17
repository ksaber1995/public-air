import { LocalizationService } from './modules/shared/services/localization.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private localization: LocalizationService){}
  
  ngOnInit(): void {
    const lang  = this.localization.getCurrentLanguageValue();
    const title  = document.getElementById('app-title');
    
    const body  = document.getElementById('app-body');
    
    
    const html  = document.getElementById('main-html');
    
    if(lang === 'ar'){
      title.innerText = 'نقي' 
      body.className = 'rtl-body'
      html.setAttribute('dir', 'rtl')
      html.setAttribute('lang', 'ar')
        
    }else{
      title.innerText = 'NAQI' 
      body.className = 'ltr-body'
      html.setAttribute('dir', 'ltr')
      html.setAttribute('lang', 'en')
     
    }

  }

}
