import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import { PovezavaService } from '../povezava.service';
import { RezultatBaze} from '../rezultat-baze';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  sporociloObrazca: RezultatBaze;

  constructor(private enatakarPodatkiService: EnatakarPodatkiService, private povezavaStoritev: PovezavaService) {
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public izbrisiVsebinoPodatkovneBaze(): void {
    this.enatakarPodatkiService.izbrisiVsebinoPodatkovneBaze()
      .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  }

  public dodajVsebinoPodatkovneBaze(): void {
    this.enatakarPodatkiService.dodajVsebinoPodatkovneBaze()
      .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  }

  ngOnInit(): void {
  }

}
