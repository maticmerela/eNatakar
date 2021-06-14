export class Kosarica {
  _id: string;
  naziv: string;
  cena: number;
  slika: string;
  kolicina: number;
}
export class Placilo {
  _id: string;
  kosarica: Kosarica[];
  stMize: number;
  stanje: boolean;
}
