import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ``
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promise = new Promise( (resolve, reject) => {
    //   if (false){
    //   resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal')
    //   }
    // });

    // promise.then( (mensaje) => {
    //   console.log(mensaje);
    // }).catch( error => console.log('Error en mi promesa', error));
    // 

    // console.log('Fin del Init');
    //}
    this.getUsuarios().then( users => {
      console.log(users)
    });
  }


  getUsuarios() {

    return new Promise(resolve => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));

    });
  }



}
