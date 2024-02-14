import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HistoryData } from '../../../shared/models/Station';
import { Observable } from 'rxjs';

function formatTime(date: Date) {
  let hours = date.getHours();
  let period = hours < 12 ? 'am' : 'pm';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  return hours + period;
}

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrl: './history-chart.component.scss'
})
export class HistoryChartComponent implements OnInit {
  @Input() history$: Observable< HistoryData>;
  history: HistoryData;

  currentIndex = 0;

  constructor() {
  
   
  }

  ngOnInit(): void {
    this.history$.subscribe(res=>{
      debugger
      this.history = res;
       this.currentIndex = 0;
       this.setDataSets()
    })

  }

  setDataSets() {
    this.barChartLabels = this.history.dates[this.currentIndex].data.map(res => formatTime(new Date(res.aggregated_at)))
    this.barChartData = [
      {
        data: [...this.history.dates[this.currentIndex].data.map(res => res.sequence), 5] ,
        backgroundColor: this.history.dates[this.currentIndex].data.map(res => res.color),
        label: this.history.dates[this.currentIndex].date,
        borderRadius: 7,
        barThickness: 15,
        
        // minBarLength: 7
        
      }
    ]
  }

  barChartOptions: ChartOptions = {
  
    responsive: true,
    maintainAspectRatio: false,

   
    scales: {

      x: {

        grid: {

        },

      },
      y: {
        ticks: {
          display: false,
          maxTicksLimit: 6,
          stepSize: 1,
          count : 6,
          includeBounds: true,
          
          // step 
        },

        grid: {
          display: false,
          
          
        }
      }
    }
  };

  barChartLabels: string[] = [];

  barChartLegend: boolean = false;
  barChartData: ChartDataset[] = [];

  changeDataSet(type: 'prev' | 'next') {
    if (type === 'prev') {
      this.currentIndex--
    } else {
      this.currentIndex++
    }

    this.setDataSets()

  }

}
