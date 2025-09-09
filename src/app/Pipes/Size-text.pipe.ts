import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'SizeText',
})
export class SizeTextPipe implements PipeTransform {

  transform(size: string): string {

    switch(size.toLowerCase()){
      case 'large':
        return '(Gr)';
      case 'small':
        return '(Ch)';
      default:
        return ''
    };

  }

}
