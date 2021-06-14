import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Uporabnik } from './uporabnik';
import { Menu, Ponudnik } from './ponudnik';
import { Placilo } from './placilo';
import { Artikel } from './artikel';
import { Kosarica } from './placilo';
// import { Graf } from './graf/graf.component';
import { environment } from '../environments/environment';
import { RezultatBaze} from './rezultat-baze';
import { NarocilaComponent } from './narocila/narocila.component';


@Injectable({
  providedIn: 'root'
})
export class EnatakarPodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  /** podatki za graf: */
  // grafFukcija() {
  //   return this.http.get(this.apiUrl)
  //   .map(result => result);
  // }
  // public pridobiPodatkeGraf(): Promise<Graf[]> {
  //   const idPonudnika = '5fecf66b75f24d22eeecc2f0';
  //   const url = `${this.apiUrl}/osnovno/${idPonudnika}/menu`;
  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(odgovor => odgovor as Graf[])
  //     .catch(this.obdelajNapako);
  // }

  public izbrisiArtikelKosarice(idPlacila: string, idArtiklaKosarica: string): Promise<Kosarica> {
    const url = `${this.apiUrl}/${idPlacila}/kosaricaIzbrisi/${idArtiklaKosarica}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(odgovor => odgovor as Kosarica)
      .catch(this.obdelajNapako);
  }


  public pridobiArtikel(idPonudnika: string): Promise<Artikel[]> {
    const url = `${this.apiUrl}/osnovno/${idPonudnika}/menu`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Artikel[])
      .catch(this.obdelajNapako);
  }

  public pridobiPosameznegaPonudnika(idPonudnika: string): Promise<Ponudnik> {
    const url = `${this.apiUrl}/osnovno/${idPonudnika}/posamezen`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Ponudnik)
      .catch(this.obdelajNapako);
  }


  /*

  // TO BO ZA IME RESTAVRACIJE

  public pridobiPonudnika(idPonudnika: string): Promise<Ponudnik> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Lokacija)
      .catch(this.obdelajNapako);
  }
*/

  public pridobiKosarica(idPlacila: string): Promise<Kosarica[]> {
    const url = `${this.apiUrl}/${idPlacila}/kosarica`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Kosarica[])
      .catch(this.obdelajNapako);
  }

  public pridobiPlacilo(idPlacila: string): Promise<Kosarica[]> {
    const url = `${this.apiUrl}/narocilo/placilo/${idPlacila}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Kosarica[])
      .catch(this.obdelajNapako);
  }

  public pridobiPrvoPlacilo(): Promise<Placilo> {
    const url = `${this.apiUrl}/prvoPlacilo`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Placilo)
      .catch(this.obdelajNapako);
  }

  public pridobiPonudnika(): Promise<Ponudnik[]> {
    const url = `${this.apiUrl}/osnovno/ponudnikPrikazi`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Ponudnik[])
      .catch(this.obdelajNapako);
  }


  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }

  public izbrisiVsebinoPodatkovneBaze(): Promise<RezultatBaze> {

    const url = `${this.apiUrl}/baza`;

    return this.http
      .delete(url)
      .toPromise()
      .then(odgovor => odgovor as RezultatBaze)
      .catch(this.obdelajNapako);
  }

  public dodajVsebinoPodatkovneBaze(): Promise<RezultatBaze> {

    const url = `${this.apiUrl}/baza`;

    return this.http
      .post(url, null)
      .toPromise()
      .then(odgovor => odgovor as unknown as RezultatBaze)
      .catch(this.obdelajNapako);
  }

  public dodajArtikelPonudniku(idPonudnika: string, podatkiObrazca: any): Promise<Menu> {
    const url: string = `${this.apiUrl}/osnovno/${idPonudnika}/dodajArtikel`;
    return this.http
      .post(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as Ponudnik)
      .catch(this.obdelajNapako);
  }

  public dodajUporabnika(podatkiObrazca: any): Promise<Uporabnik> {

    const url = `${this.apiUrl}/registracijaClana`;

    return this.http
      .post(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as unknown as Uporabnik)
      .catch(this.obdelajNapako);
  }

  public dodajPonudnika(podatkiObrazca: any): Promise<Ponudnik> {

    const url = `${this.apiUrl}/registracijaPonudnika`;

    return this.http
      .post(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as unknown as Ponudnik)
      .catch(this.obdelajNapako);
  }

  public spremeniKolicinoKosarica(idPlacila: string, idArtiklaKosarica: string, podatkiObrazca: any): Promise<Placilo> {

    const url = `${this.apiUrl}/${idPlacila}/kosarica/${idArtiklaKosarica}`;

    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as unknown as Placilo)
      .catch(this.obdelajNapako);
  }

}


