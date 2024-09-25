import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent {


  data: number[] = [100, 100, 100];
  

  
  @Input() title: string  = 'Sin Titulo';


  @Input('labels') doughnutChartLabels: string[] = [ 'Label 1 ', 'Label 2', 'Label 3' ];
 
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: this.data,
      },
    ],
    
  };
  public doughnutChartType: ChartType = 'doughnut';

}
