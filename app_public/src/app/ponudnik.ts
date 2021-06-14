export class Menu {
  naziv: string;
  opis: string;
  cena: number;
  alergeni: boolean[];
  slika: string;
}
export class Ponudnik {
  _id: string;
  ime: string;
  priimek: string;
  uporabniskoIme: string;
  geslo: string;
  obrat: string;
  tipKuhinje: string;
  ulica: string;
  hisnaSt: string;
  zip: number;
  menu: Menu[];
}
