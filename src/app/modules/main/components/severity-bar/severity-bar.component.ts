import { Component, Input } from '@angular/core';
import { BreakPoint } from '../../../shared/models/breakPoint';

@Component({
  selector: 'app-severity-bar',
  templateUrl: './severity-bar.component.html',
  styleUrl: './severity-bar.component.scss'
})
export class SeverityBarComponent {  
  @Input() type : 'horizontal' | 'vertical' = 'horizontal' // horizontal or vertical 
  @Input() unit: string

  @Input() breakPoints : BreakPoint[] = [];
}
