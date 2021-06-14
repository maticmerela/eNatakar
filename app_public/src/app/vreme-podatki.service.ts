import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Artikel} from './artikel';
import {Graf} from './graf/graf.component';


@Injectable({
  providedIn: 'root'
})
export class VremePodatkiService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/api';
  public pridobiArtikelGraf(idPonudnika: string): Promise<Graf[]> {
    const url = `${this.apiUrl}/osnovno/${idPonudnika}/menu`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Graf[])
      .catch(this.obdelajNapako);
  }
  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
  // podatkiCena(): any {
  //   return this.http.get('http://localhost:3000/api/podatkiGraf')
  //     .pipe(map(result => result));
  // }
}
