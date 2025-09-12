import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appProductFilter',
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
