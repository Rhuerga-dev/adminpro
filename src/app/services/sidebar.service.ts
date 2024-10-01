import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dasboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        
          {title: 'Main', url: '/'},
          {title: 'ProgressBar', url: 'progress'},
          {title: 'Graficas', url: 'grafica1'},
          {title: 'Promesas', url: 'promesas'},
          {title: 'Rxjs', url: 'rxjs'}
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        
          {title: 'Usuarios', url: 'users'},
          {title: 'Hospitales', url: 'hospitals'},
          {title: 'Medicos', url: 'doctors'},
      ]
    }
  ]

  constructor() { }
}
