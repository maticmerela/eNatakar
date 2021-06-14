import { Component, OnInit } from '@angular/core';
import {EnatakarPodatkiService} from '../enatakar-podatki.service';
import { Ponudnik, Menu } from '../ponudnik';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Kosarica} from "../placilo";

@Component({
  selector: 'app-vnos-hrane',
  templateUrl: './vnos-hrane.component.html',
  styleUrls: ['./vnos-hrane.component.css']
})
export class VnosHraneComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService, private router: Router,
              private pot: ActivatedRoute) { }

  naslov = 'Vnos novega artikla na meni';
  navodila = {
    vrsta: '*Izberite vrsto jedi!',
    ime: '*Ime jedi oz. pijače',
    cena: '*Cena jedi oz. pijače:',
    slika: 'Dodajte sliko jedi oz. pijače',
    opis: 'Opis jedi:',
    alergeni: '*Označite alergene, ki jih vsebuje jed oz. pijača',
    obvezno: 'Polja označena z * je potrebno obvezno izpolniti!',
    alergeniSeznam: {
      gluten: 'gluten',
      raki: 'raki/ribe/mehkužci',
      jajca: 'jajca',
      arasidi: 'arašidi',
      laktoza: 'laktoza',
      soja: 'soja',
      orescki: 'oreščki',
      zelena: 'listnata zelena',
      gorcica: 'gorčično seme',
      sezam: 'sezamovo seme',
      dioksid: 'žveplov dioksid in sulfiti',
      bob: 'volčji bob',
      brez: 'jed ne vsebuje alergenov'
    }
  };

  ponudnik: Ponudnik;
 // menu: Menu[];

  public novArtikel = {
    naziv: '',
    opis: '',
    cena: 4,
    alergeni: [false, false, false, false, false, false, false, false, false, false, false, false],
    slika: 'http://www.pngmart.com/files/5/Hamburger-PNG-Transparent-Image.png'
  };

  public obrazecNapaka: string;
  private soPodatkiUstrezni(): boolean {
    if (this.novArtikel.naziv && this.novArtikel.cena && this.novArtikel.opis && this.novArtikel.alergeni) {
      return true;
    } else {
      return false;
    }
  }

  public dodajNovArtikel(): void {
    this.obrazecNapaka = "";
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idPonudnika = params.get('idPonudnika');
          return this.enatakarPodatkiStoritev.pridobiPosameznegaPonudnika(idPonudnika);
        })
      )
      .subscribe((ponudnik: Ponudnik) => {
        this.ponudnik = ponudnik;
      });
    if (this.soPodatkiUstrezni()) {
      console.log(this.novArtikel);
      this.enatakarPodatkiStoritev
        .dodajArtikelPonudniku(this.ponudnik._id, this.novArtikel)
        .then((menu: Menu)  => {
          console.log("Artikel shranjen", menu);
          this.router.navigate(['/osnovno/' + this.ponudnik._id + '/menuPonudnik']);
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }


  ngOnInit(): void {

  }

}
