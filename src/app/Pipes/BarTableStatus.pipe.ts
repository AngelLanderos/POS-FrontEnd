import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'BarTableStatus'
})
export class BarTableStatusPipe implements PipeTransform {

  transform(barStatus: string): string {
    switch(barStatus){
      case 'free':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada'

      default:
        return 'Disponible'
    }
  }

}
