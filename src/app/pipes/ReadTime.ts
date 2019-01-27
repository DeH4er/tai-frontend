import {Pipe, PipeTransform} from '@angular/core';

const WORDS_PER_MINUTE = 200;
const CHARS_PER_WORD = 5;
const CHARS_PER_MINUTE = WORDS_PER_MINUTE * CHARS_PER_WORD;

@Pipe({name: 'readTime'})
export class ReadTime implements PipeTransform {
  
  transform(content: string) {
    const minutes = Math.round(content.length / CHARS_PER_MINUTE);

    if (minutes === 0) {
      return 'less than a minute read'
    }

    return `${minutes} minute read`;
  }
}
