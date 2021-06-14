import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zvezdice'
})
export class ZvezdicePipe implements PipeTransform {

  transform(ocena: string): string {
    let ocena1;
    ocena1 = Number(ocena);
    let zvezdice = '';
    for (let i = 1; i <= 5; i++)
      zvezdice += '<i class="fa' + (ocena1 >= i ? 's' : 'r') + ' fa-star"></i>';
    return zvezdice;
  }

}
