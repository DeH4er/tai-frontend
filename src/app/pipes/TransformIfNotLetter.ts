import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'transformIfNotLetter'})
export class TransformIfNotLetter implements PipeTransform{

  transform(value: string): string {
    if (value === ' ') {
      return '␣';
    }

    return value;
  }

}
