import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [IncrementComponent, DonaComponent],
  imports: [
    CommonModule, 
    FormsModule,
    NgChartsModule
  ],
  exports: [IncrementComponent, DonaComponent]
})
export class ComponentModule { }
