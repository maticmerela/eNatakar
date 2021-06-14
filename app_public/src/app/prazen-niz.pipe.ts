import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prazenNiz'
})
export class PrazenNizPipe implements PipeTransform {

  transform(niz: unknown, ...args: unknown[]): unknown {
    let prazenNiz = niz;
    if (prazenNiz === '') {
      prazenNiz = '/';
    }
    return prazenNiz;
  }

}
