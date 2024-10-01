import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'users| doctors|hospitals'): string {
    return 'Hola mundo ' + img + ' ' + type;
  }

}
