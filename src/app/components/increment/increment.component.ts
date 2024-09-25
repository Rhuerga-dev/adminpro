import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: ``
})
export class IncrementComponent implements OnInit {
  
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') outputValue: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progress}%`;
  }

  changeValue(value: number) {
    // Si el progreso está en 100 o más y se intenta aumentar más
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      this.outputValue.emit(this.progress);
      return this.progress;
    }

    // Si el progreso está en 0 o menos y se intenta disminuir más
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      this.outputValue.emit(this.progress);
      return this.progress;
    }

    // Cambiar el progreso
    this.progress += value;

    // Emitir el progreso actualizado
    this.outputValue.emit(this.progress);
    return this.progress;
  }

  onChange(value : number) {

    if (value >= 100) this.progress = 100;
    if (value <= 0) this.progress = 0;
    
    this.progress = value;

    this.outputValue.emit( this.progress );
  }


}
