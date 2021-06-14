import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import {Kosarica, Placilo} from '../placilo';


@Component({
  selector: 'app-kosarica',
  templateUrl: './kosarica.component.html',
  styleUrls: ['./kosarica.component.css']
})
export class KosaricaComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService,
              private pot: ActivatedRoute) { }

  public izdelki: Kosarica[];
  public placilo: Placilo;


  public izbrisiArtikelKosarice(idPlacila, idArtikla): void {
    this.enatakarPodatkiStoritev.izbrisiArtikelKosarice(idPlacila, idArtikla);
  }

  /*
  public spremeniKolicino(): void {
    this.enatakarPodatkiStoritev
      .spremeniKolicinoKosarica(this.izdelki._id, this.artikel._id, this.izdelki[0].kosarica.kolicina)
      .then(kolicina => {
          console.log("Kolicina shranjena", kolicina);
      })
      .catch();
    }
  }
   */

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idPlacila = params.get('idPlacila');
          return this.enatakarPodatkiStoritev.pridobiKosarica(idPlacila);
        })
      )
      .subscribe((izdelki: Kosarica[]) => {
        this.izdelki = izdelki;
      });

    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.enatakarPodatkiStoritev.pridobiPrvoPlacilo();
        })
      )
      .subscribe((placilo: Placilo) => {
        this.placilo = placilo;
      });
  }

}

