import { Component } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
  
  public labels1: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
 
  public data1  =  {
    labels: this.labels1,
    datasets: [
      { 
        data: [10, 20, 40],
        backgroundColor: [
          '#6857E6',
          '#009FEE',
          '#F02050'
        ],
      },
    ],
  }
}
