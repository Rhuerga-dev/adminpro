import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {



    //this.returnObsevable().pipe(
    //  retry(2)
    //).subscribe(
    //  value => console.log('Subs:', value),
    //  err => console.warn('Error', err),
    //  () => console.info('obs terminado')
    //);

    this.intervalSubs = this.returnInterval()
      .subscribe(console.log)
      
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }



  returnInterval(): Observable<number> {
    return interval(100).pipe(
      map(valor => valor + 1),
      //take(10),
      filter( valor => ( valor % 2 === 0) ? true : false)
    );
  }

  returnObsevable(): Observable<number> {

    let i = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        };
        if (i === 2) {
          //i = 0;
          observer.error('i llego al valor 2');
        }
      }, 1000);
    });
  }
}
