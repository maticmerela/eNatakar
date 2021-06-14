import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alergeni'
})
export class AlergeniPipe implements PipeTransform {

  transform(alergeni: number): string {
    let alergeniVsi = ['gluten',
      'raki/ribe/mehkužci',
      'jajca',
      'arašidi',
      'laktoza',
      'soja',
      'oreščki',
      'listnata zelena',
      'gorčično seme',
      'sezamovo seme',
      'žveplov dioksid in sulfiti',
      'volčji bob',
      'jed ne vsebuje alergenov'];
    let nekAlergen = '';
    for (let i = 0; i <= alergeniVsi.length; i++)
      if(alergeni[i] === true && i != alergeniVsi.length-1)
        nekAlergen += alergeniVsi[i]+',';
      //      alergeni[i] = alergeniVsi[i];
      else if(alergeni[i] === true && i == alergeniVsi.length-1)
        nekAlergen += alergeniVsi[i];

    return nekAlergen;
  }

}
