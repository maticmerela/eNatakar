import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(besedilo: string): string {
    return besedilo.replace(' ', '_');
  }

}
