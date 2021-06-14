import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-narocila',
  templateUrl: './narocila.component.html',
  styleUrls: ['./narocila.component.css']
})
export class NarocilaComponent implements OnInit {

  constructor() {
  }

  title = 'narocila';
  style = 'style_narocilo.css';
  naslov = 'Naročila';
  glavaTabele = {
    stolpec1: 'Oznaka mize',
    stolpec2: 'Vsebina naročila',
    stolpec3: 'Opombe',
    stolpec4: 'Ime naročnika',
    stolpec5: 'Stanje naročila'
  };
  public narocila: Narocilo[];

  ngOnInit(): void {
  }

}

export class Narocilo {
  _id: string;
  // kosarica: [Kosarica];
  stMize: number;
  opomne: string;
  stanje: boolean;
}
